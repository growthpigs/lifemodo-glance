# LifeModo Glance

A Next.js 16 PWA — five NFC-triggered health context screens for the LifeModo household AI OS.

## 🔗 Live URL

**https://lifemodo-glance.vercel.app**

## NFC Routes (program these into your NFC tags)

| Tag | URL | Circle |
|-----|-----|--------|
| Fob Side A | `https://lifemodo-glance.vercel.app/c/fob-a` | Health snapshot + Call Coach |
| Fob Side B | `https://lifemodo-glance.vercel.app/c/fob-b` | Household dashboard |
| Wine Circle | `https://lifemodo-glance.vercel.app/c/wine` | Booze Nag |
| Weights | `https://lifemodo-glance.vercel.app/c/weights` | Workout tracker |
| Story Circle | `https://lifemodo-glance.vercel.app/c/story` | Voice memories |

## Supabase Setup (for live health data)

1. Create a Supabase project at supabase.com
2. Run this migration:

```sql
create table health_context (
  id uuid primary key default gen_random_uuid(),
  user_id text not null default 'roderic',
  hrv_ms numeric,
  sleep_hours numeric,
  resting_hr numeric,
  step_count integer,
  readiness_pct integer,
  wine_glasses_today integer default 0,
  wine_glasses_week integer default 0,
  last_updated timestamptz default now()
);
alter table health_context enable row level security;
create policy "demo_access" on health_context for all using (true) with check (true);

-- Insert initial row
insert into health_context (user_id) values ('roderic');
```

3. Add env vars to Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL` = your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key

4. Use iOS Shortcut DEMO-SHORTCUTS-01 to write health data on NFC tap

> **Without Supabase configured**, the app shows beautiful fallback data (HRV 58ms, 7.2h sleep, 89% Ready) — still looks great for the demo.

## Tech Stack

- Next.js 16 (App Router, static generation)
- Tailwind CSS (dark luxury theme)
- Supabase (health data backend)
- Vercel (deployment)
- PWA manifest (installable, NFC-friendly)
