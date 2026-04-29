-- Waduha — Supabase schema
-- Run this in your Supabase project's SQL Editor (Dashboard → SQL → New Query → paste → Run)
-- Idempotent — safe to re-run.

-- ─── Orders table ──────────────────────────────────────────────────────────
create table if not exists orders (
    id            bigserial primary key,
    customer_name text        not null,
    phone         text        not null,
    address       text        not null,
    notes         text,
    items         jsonb       not null,
    subtotal      numeric(10,2) not null,
    discount      numeric(10,2) default 0,
    total         numeric(10,2) not null,
    delivery_slot text,
    points_used   int         default 0,
    points_earned int         default 0,
    status        text        default 'pending',  -- pending | confirmed | delivered | cancelled
    created_at    timestamptz default now()
);

create index if not exists idx_orders_phone   on orders (phone);
create index if not exists idx_orders_status  on orders (status);
create index if not exists idx_orders_created on orders (created_at desc);

-- Allow anonymous inserts (the website uses the anon key, not service key).
-- This is safe because we only let anon write — never read other people's orders.
alter table orders enable row level security;

drop policy if exists "anyone can insert orders" on orders;
create policy "anyone can insert orders"
    on orders for insert
    with check (true);

-- Reads restricted to authenticated admin (you, via Supabase dashboard or admin app)
-- For now, you read orders directly in the Supabase dashboard.

-- ─── Notify-me signups (Coming Soon departments + future newsletters) ─────
create table if not exists notify_signups (
    id          bigserial primary key,
    email       text        not null,
    department  text,
    created_at  timestamptz default now(),
    unique (email, department)  -- prevent duplicate signups per dept
);

create index if not exists idx_notify_dept on notify_signups (department);

alter table notify_signups enable row level security;

drop policy if exists "anyone can subscribe" on notify_signups;
create policy "anyone can subscribe"
    on notify_signups for insert
    with check (true);

-- ─── Done. ────────────────────────────────────────────────────────────────
-- After running this, view your tables at:
--   Dashboard → Database → Tables
-- View orders as they come in:
--   Dashboard → Table Editor → orders
