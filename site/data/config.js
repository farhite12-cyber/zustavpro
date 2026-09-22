/* ============================================================
   Ключи подключения к базе. Заполняются один раз.

   Взять в Supabase: Project Settings → API
     SUPABASE_URL      — Project URL,  вида https://xxxx.supabase.co
     SUPABASE_ANON_KEY — ключ anon / publishable

   Ключ anon не секретный: он по замыслу лежит в коде страницы,
   а доступ ограничен правилами в базе (см. supabase/schema.sql).
   Ключ service_role сюда вставлять НЕЛЬЗЯ — он даёт полный доступ.

   Пока поля пустые, сайт работает в местном режиме:
   заказы хранятся в браузере и менеджеру не видны.
   ============================================================ */

window.ZP_CONFIG = {
  SUPABASE_URL: "https://jbfvmdcsnokqomapixkf.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_5PZUN-4hooc6H8Bbo6S5Gg_vVgb0x7o"
};
