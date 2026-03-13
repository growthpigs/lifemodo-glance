# LifeModo Glance

A Next.js 15 PWA — five NFC-triggered health context screens for the LifeModo household AI OS.

## 🔗 Live URL

> **Deployment URL:** *(set after first `vercel --prod`)*

## 📱 Routes

| URL | Screen |
|-----|--------|
| `/c/fob-a` | Health snapshot — readiness arc, HRV, sleep, quick actions |
| `/c/fob-b` | Household dashboard — presence + vitals + tonight |
| `/c/wine` | Wine circle — glass count + sleep correlation |
| `/c/weights` | Workout tracker — pre/post session |
| `/c/story` | Story circle — audio playback + recording |

---

## 🚀 Quick Start

```bash
git clone https://github.com/growthpigs/lifemodo-glance
cd lifemodo-glance
cp .env.local.example .env.local
# Fill in your Supabase credentials (see below)
npm install
npm run dev
```

---

## 🗄️ Supabase Setup

### 1. Create the table

In your Supabase SQL editor, run:

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

create policy "demo_access" on health_context
  for all using (true) with check (true);

-- Insert demo row
insert into health_context (user_id, hrv_ms, sleep_hours, resting_hr, step_count, readiness_pct)
values ('roderic', 58, 7.2, 62, 4821, 89);
```

### 2. Get your credentials

- Go to **Supabase → Project Settings → API**
- Copy **Project URL** and **anon/public key**

### 3. Add to .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Add to Vercel

In **Vercel → Project → Settings → Environment Variables**, add the same two variables.

---

## 📲 NFC Shortcuts Setup

For each NFC tag, use the **iPhone Shortcuts app**:

1. **Create a Shortcut** → Add action: "Open URL"
2. URL: `https://YOUR-VERCEL-URL/c/fob-a` (or whichever circle)
3. **Automate** → Personal Automation → NFC → Tap tag → Run shortcut
4. Stick NFC tag to the fob/object

Recommended NFC tags: **NTAG213** or **NTAG215** (cheap, iPhone-compatible)

---

## 🏗️ Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** — dark theme, gold accents
- **Supabase** — `health_context` table
- **Vercel** — free tier hosting

---

## 📱 PWA Install (iPhone)

1. Open any `/c/*` URL in Safari
2. Tap **Share → Add to Home Screen**
3. Name it "LifeModo" → Add

---

## 🏃 Deployment

```bash
# First time
npx vercel --prod

# Subsequent deploys (auto via GitHub push if connected)
git push
```

---

## 📡 iOS Shortcuts → Supabase (write health data)

Use this Shortcut action to write to Supabase from Apple Health / Oura / etc.:

```
URL: https://YOUR-PROJECT.supabase.co/rest/v1/health_context
Method: POST
Headers:
  apikey: YOUR-ANON-KEY
  Authorization: Bearer YOUR-ANON-KEY
  Content-Type: application/json
  Prefer: resolution=merge-duplicates
Body (JSON):
{
  "user_id": "roderic",
  "hrv_ms": [HRV from Health],
  "sleep_hours": [Sleep Hours],
  "readiness_pct": [Calculated readiness],
  "last_updated": [Current Date as ISO8601]
}
```
