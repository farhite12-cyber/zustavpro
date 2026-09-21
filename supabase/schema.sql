-- ═══════════════════════════════════════════════════════════════
--  Zustav PRO — схема базы заказов для Supabase
--  Выполнить один раз: Supabase → SQL Editor → New query → вставить → Run
-- ═══════════════════════════════════════════════════════════════

-- ---------- таблица заказов ----------
create table if not exists public.orders (
  id            text primary key,                 -- ZP-260922-003
  created_at    timestamptz not null default now(),
  status        text not null default 'new'
                check (status in ('new','confirmed','ready','done','cancelled')),
  client_name   text,
  client_phone  text not null,
  delivery      text not null default 'pickup'
                check (delivery in ('pickup','delivery')),
  address       text,
  comment       text,
  items         jsonb not null,                   -- [{art,title,price,qty}]
  total         numeric not null default 0,
  history       jsonb not null default '[]'::jsonb
);

create index if not exists orders_created_idx on public.orders (created_at desc);
create index if not exists orders_status_idx  on public.orders (status);
create index if not exists orders_phone_idx   on public.orders (client_phone);

-- ---------- защита строк ----------
alter table public.orders enable row level security;

-- Клиент (не залогинен) может ТОЛЬКО создать заказ.
-- Читать таблицу напрямую ему нельзя — иначе он увидит чужие заказы и телефоны.
drop policy if exists "гость создаёт заказ" on public.orders;
create policy "гость создаёт заказ"
  on public.orders for insert
  to anon, authenticated
  with check (
    client_phone is not null
    and length(client_phone) between 3 and 40
    and jsonb_typeof(items) = 'array'
    and jsonb_array_length(items) between 1 and 100
    and total >= 0
    and status = 'new'
  );

-- Менеджер (вошёл по логину) видит и правит всё.
drop policy if exists "менеджер видит заказы" on public.orders;
create policy "менеджер видит заказы"
  on public.orders for select to authenticated using (true);

drop policy if exists "менеджер правит заказы" on public.orders;
create policy "менеджер правит заказы"
  on public.orders for update to authenticated using (true) with check (true);

-- ---------- клиент смотрит свой заказ ----------
-- Отдаёт одну строку, только если совпали номер заказа И телефон.
-- Телефон сравнивается по цифрам, чтобы «+7 900…» и «8 900…» совпадали.
create or replace function public.zp_order_status(p_id text, p_phone text)
returns table (
  id text, created_at timestamptz, status text,
  delivery text, items jsonb, total numeric
)
language sql
security definer
set search_path = public
as $$
  select o.id, o.created_at, o.status, o.delivery, o.items, o.total
  from public.orders o
  where o.id = p_id
    and right(regexp_replace(o.client_phone, '\D', '', 'g'), 10)
      = right(regexp_replace(p_phone,        '\D', '', 'g'), 10)
  limit 1;
$$;

revoke all on function public.zp_order_status(text, text) from public;
grant execute on function public.zp_order_status(text, text) to anon, authenticated;

-- ---------- следующий номер заказа ----------
create sequence if not exists public.zp_order_seq;

create or replace function public.zp_next_order_id()
returns text
language sql
security definer
set search_path = public
as $$
  select 'ZP-' || to_char(now() at time zone 'Europe/Moscow', 'YYMMDD')
         || '-' || lpad((nextval('public.zp_order_seq') % 1000)::text, 3, '0');
$$;

grant execute on function public.zp_next_order_id() to anon, authenticated;

-- ═══════════════════════════════════════════════════════════════
--  Менеджеров заводить вручную:
--  Authentication → Users → Add user → email и пароль.
--  Самостоятельной регистрации нет — посторонний в панель не войдёт.
-- ═══════════════════════════════════════════════════════════════
