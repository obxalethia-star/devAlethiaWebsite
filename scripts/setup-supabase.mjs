import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const env = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    env[line.slice(0, index).trim()] = line.slice(index + 1).trim();
  }
  return env;
}

const env = {
  ...loadEnvFile(join(root, ".env")),
  ...loadEnvFile(join(root, ".env.local")),
  ...process.env,
};

const projectRef = env.VITE_SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];

function buildDatabaseUrls(password) {
  if (!projectRef || !password) return [];

  const encoded = encodeURIComponent(password);
  return [
    `postgresql://postgres.${projectRef}:${encoded}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`,
    env.DATABASE_URL,
    `postgresql://postgres.${projectRef}:${encoded}@aws-0-eu-west-2.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres.${projectRef}:${encoded}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres:${encoded}@db.${projectRef}.supabase.co:5432/postgres`,
    `postgresql://postgres.${projectRef}:${encoded}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
  ].filter(Boolean);
}

const migrationsDir = join(root, "supabase", "migrations");
const migrationFiles = readdirSync(migrationsDir)
  .filter((file) => file.endsWith(".sql"))
  .sort();

const databaseUrls = buildDatabaseUrls(env.SUPABASE_DB_PASSWORD);

if (databaseUrls.length === 0) {
  console.error(
    "Missing DATABASE_URL or SUPABASE_DB_PASSWORD in .env.local.\n" +
      "Get your database password from Supabase Dashboard → Project Settings → Database.",
  );
  process.exit(1);
}

let lastError;

for (const databaseUrl of databaseUrls) {
  const sql = postgres(databaseUrl, { ssl: "require", max: 1, connect_timeout: 10 });
  try {
    console.log(`Connecting to ${databaseUrl.replace(/:[^:@]+@/, ":***@")}...`);

    for (const file of migrationFiles) {
      const migrationSql = readFileSync(join(migrationsDir, file), "utf8");
      console.log(`Applying ${file}...`);
      await sql.unsafe(migrationSql);
    }

    if (env.RESEND_API_KEY) {
      await sql`
        insert into private.app_secrets (key, value, updated_at)
        values ('resend_api_key', ${env.RESEND_API_KEY}, now())
        on conflict (key) do update
          set value = excluded.value,
              updated_at = now()
      `;
      console.log("Stored RESEND_API_KEY in private.app_secrets.");
    } else {
      console.log("RESEND_API_KEY not set — CRM will work, but email notifications are disabled.");
    }

    if (env.NOTIFY_TO_EMAIL) {
      await sql`
        insert into private.app_secrets (key, value, updated_at)
        values ('notify_to_email', ${env.NOTIFY_TO_EMAIL}, now())
        on conflict (key) do update
          set value = excluded.value,
              updated_at = now()
      `;
    }

    if (env.NOTIFY_FROM_EMAIL) {
      await sql`
        insert into private.app_secrets (key, value, updated_at)
        values ('notify_from_email', ${env.NOTIFY_FROM_EMAIL}, now())
        on conflict (key) do update
          set value = excluded.value,
              updated_at = now()
      `;
    }

    const [{ clients = 0, inquiries = 0 }] = await sql`
      select
        (select count(*)::int from public.clients) as clients,
        (select count(*)::int from public.inquiries) as inquiries
    `;

    console.log(`Schema ready. clients=${clients}, inquiries=${inquiries}`);
    await sql.end();
    process.exit(0);
  } catch (error) {
    lastError = error;
    await sql.end({ timeout: 1 }).catch(() => undefined);
  }
}

console.error("Could not apply schema:", lastError?.message ?? lastError);
process.exit(1);
