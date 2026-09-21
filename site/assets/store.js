/* Zustav PRO — слой хранения данных.
   ──────────────────────────────────────────────────────────────
   Сейчас работает LocalStore: корзина и заказы лежат в браузере
   клиента (localStorage). Этого хватает, чтобы клиент собрал корзину
   и отправил заказ, но НЕ хватает, чтобы менеджер увидел этот заказ
   на своём компьютере — данные не выходят за пределы устройства.

   Когда подключим базу (Supabase / Vercel Postgres), достаточно
   написать второй объект с теми же семью методами и поменять
   одну строку в конце файла. Ни одна страница не изменится.
   ────────────────────────────────────────────────────────────── */

(function () {
  var K_CART = "zp_cart", K_ORDERS = "zp_orders", K_ME = "zp_me";

  function read(key, dflt) {
    try { return JSON.parse(localStorage.getItem(key)) || dflt; }
    catch (e) { return dflt; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { return false; }
  }

  function orderNumber() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, "0"); };
    var seq = read(K_ORDERS, []).length + 1;
    return "ZP-" + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) +
           "-" + String(seq).padStart(3, "0");
  }

  var LocalStore = {
    name: "local",

    getCart: function () { return read(K_CART, []); },
    setCart: function (items) { write(K_CART, items); document.dispatchEvent(new Event("zp:cart")); },

    createOrder: function (order) {
      var all = read(K_ORDERS, []);
      order.id = orderNumber();
      order.created = new Date().toISOString();
      order.status = "new";
      order.history = [{ status: "new", at: order.created }];
      all.unshift(order);
      write(K_ORDERS, all);
      return order;
    },

    listOrders: function (filter) {
      var all = read(K_ORDERS, []);
      if (!filter || !filter.status || filter.status === "all") return all;
      return all.filter(function (o) { return o.status === filter.status; });
    },

    getOrder: function (id) {
      return read(K_ORDERS, []).filter(function (o) { return o.id === id; })[0];
    },

    setStatus: function (id, status) {
      var all = read(K_ORDERS, []);
      all.forEach(function (o) {
        if (o.id === id) {
          o.status = status;
          (o.history = o.history || []).push({ status: status, at: new Date().toISOString() });
        }
      });
      write(K_ORDERS, all);
    },

    me: function (data) {
      if (data) { write(K_ME, data); return data; }
      return read(K_ME, { name: "", phone: "", contact: "" });
    }
  };

  window.ZP_STORE = LocalStore;

  /* Статусы заказа — общие для клиента и менеджера */
  window.ZP_STATUS = {
    "new":       { title: "Новый",            tone: "orange", next: "confirmed" },
    "confirmed": { title: "Подтверждён",      tone: "brand",  next: "ready" },
    "ready":     { title: "Готов к выдаче",   tone: "green",  next: "done" },
    "done":      { title: "Выдан",            tone: "muted",  next: null },
    "cancelled": { title: "Отменён",          tone: "muted",  next: null }
  };
})();
