/* Zustav PRO — слой хранения.
   ──────────────────────────────────────────────────────────────
   Два режима, один и тот же набор методов:

   • База (Supabase) — включается сам, как только в data/config.js
     появятся SUPABASE_URL и SUPABASE_ANON_KEY. Заказы общие:
     менеджер видит их с любого устройства, клиент видит статус.

   • Местный — запасной. Заказы лежат в браузере клиента.
     Работает без интернета и без базы, но менеджеру не виден.

   Корзина всегда местная: это черновик клиента, базе он не нужен.
   Все методы заказов возвращают Promise.
   ────────────────────────────────────────────────────────────── */

(function () {
  var C = window.ZP_CONFIG || {};
  var K_CART = "zp_cart", K_ORDERS = "zp_orders", K_MINE = "zp_mine", K_ME = "zp_me";

  function read(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }

  /* ---------- корзина: всегда локально ---------- */
  var cart = {
    getCart: function () { return read(K_CART, []); },
    setCart: function (items) { write(K_CART, items); document.dispatchEvent(new Event("zp:cart")); },
    me: function (data) { if (data) { write(K_ME, data); return data; } return read(K_ME, { name: "", phone: "" }); },
    /* номера своих заказов — чтобы потом спросить у базы их статус */
    mine: function (rec) {
      var list = read(K_MINE, []);
      if (rec) { list.unshift(rec); write(K_MINE, list.slice(0, 50)); }
      return list;
    }
  };

  function localNumber() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, "0"); };
    return "ZP-" + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) +
           "-" + String(read(K_ORDERS, []).length + 1).padStart(3, "0");
  }

  /* ═══════════════ режим 1: только браузер ═══════════════ */
  var LocalStore = {
    mode: "local",
    ready: Promise.resolve(),

    createOrder: function (o) {
      var all = read(K_ORDERS, []);
      o.id = localNumber();
      o.created = new Date().toISOString();
      o.status = "new";
      o.history = [{ status: "new", at: o.created }];
      all.unshift(o);
      write(K_ORDERS, all);
      cart.mine({ id: o.id, phone: (o.client || {}).phone || "" });
      return Promise.resolve(o);
    },
    listOrders: function (f) {
      var all = read(K_ORDERS, []);
      return Promise.resolve(!f || !f.status || f.status === "all"
        ? all : all.filter(function (o) { return o.status === f.status; }));
    },
    myOrders: function () { return Promise.resolve(read(K_ORDERS, [])); },
    getOrder: function (id) {
      return Promise.resolve(read(K_ORDERS, []).filter(function (o) { return o.id === id; })[0]);
    },
    setStatus: function (id, status) {
      var all = read(K_ORDERS, []);
      all.forEach(function (o) {
        if (o.id === id) { o.status = status; (o.history = o.history || []).push({ status: status, at: new Date().toISOString() }); }
      });
      write(K_ORDERS, all);
      return Promise.resolve();
    },
    signIn: function () { return Promise.reject(new Error("База не подключена — входить некуда.")); },
    signOut: function () { return Promise.resolve(); },
    currentUser: function () { return Promise.resolve(null); }
  };

  /* ═══════════════ режим 2: общая база ═══════════════ */
  function makeSupabase() {
    if (!window.supabase || !window.supabase.createClient) return null;
    var db = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY);

    function fromRow(r) {
      return {
        id: r.id,
        created: r.created_at,
        status: r.status,
        client: { name: r.client_name, phone: r.client_phone },
        delivery: r.delivery,
        address: r.address,
        comment: r.comment,
        items: r.items,
        total: Number(r.total),
        history: r.history || []
      };
    }

    return {
      mode: "supabase",
      ready: Promise.resolve(),

      createOrder: function (o) {
        return db.rpc("zp_next_order_id").then(function (res) {
          var id = (!res.error && res.data) ? res.data : localNumber();
          var now = new Date().toISOString();
          var row = {
            id: id, status: "new",
            client_name: (o.client || {}).name || "",
            client_phone: (o.client || {}).phone || "",
            delivery: o.delivery || "pickup",
            address: o.address || "",
            comment: o.comment || "",
            items: o.items, total: o.total,
            history: [{ status: "new", at: now }]
          };
          return db.from("orders").insert(row, { returning: "minimal" }).then(function (r) {
            if (r.error) throw r.error;
            cart.mine({ id: id, phone: row.client_phone });
            return fromRow(Object.assign({ created_at: now }, row));
          });
        });
      },

      listOrders: function (f) {
        var q = db.from("orders").select("*").order("created_at", { ascending: false }).limit(300);
        if (f && f.status && f.status !== "all") q = q.eq("status", f.status);
        return q.then(function (r) { if (r.error) throw r.error; return (r.data || []).map(fromRow); });
      },

      /* клиент: спрашиваем статус по номеру заказа и телефону */
      myOrders: function () {
        var mine = cart.mine();
        if (!mine.length) return Promise.resolve([]);
        return Promise.all(mine.map(function (m) {
          return db.rpc("zp_order_status", { p_id: m.id, p_phone: m.phone })
            .then(function (r) {
              var row = (r.data && r.data[0]) || null;
              return row ? {
                id: row.id, created: row.created_at, status: row.status,
                delivery: row.delivery, items: row.items, total: Number(row.total),
                client: { name: "", phone: m.phone }
              } : null;
            })
            .catch(function () { return null; });
        })).then(function (list) { return list.filter(Boolean); });
      },

      getOrder: function (id) {
        return db.from("orders").select("*").eq("id", id).limit(1)
          .then(function (r) { return r.data && r.data[0] ? fromRow(r.data[0]) : null; });
      },

      setStatus: function (id, status) {
        return this.getOrder(id).then(function (o) {
          var hist = (o && o.history ? o.history : []).concat([{ status: status, at: new Date().toISOString() }]);
          return db.from("orders").update({ status: status, history: hist }).eq("id", id)
            .then(function (r) { if (r.error) throw r.error; });
        });
      },

      signIn: function (email, password) {
        return db.auth.signInWithPassword({ email: email, password: password })
          .then(function (r) { if (r.error) throw r.error; return r.data.user; });
      },
      signOut: function () { return db.auth.signOut(); },
      currentUser: function () {
        return db.auth.getUser().then(function (r) { return (r.data && r.data.user) || null; })
          .catch(function () { return null; });
      }
    };
  }

  var store = (C.SUPABASE_URL && C.SUPABASE_ANON_KEY && makeSupabase()) || LocalStore;
  Object.keys(cart).forEach(function (k) { store[k] = cart[k]; });
  window.ZP_STORE = store;

  window.ZP_STATUS = {
    "new":       { title: "Новый",          tone: "orange", next: "confirmed" },
    "confirmed": { title: "Подтверждён",    tone: "brand",  next: "ready" },
    "ready":     { title: "Готов к выдаче", tone: "green",  next: "done" },
    "done":      { title: "Выдан",          tone: "muted",  next: null },
    "cancelled": { title: "Отменён",        tone: "muted",  next: null }
  };
})();
