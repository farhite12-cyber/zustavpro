/* Зустов Про — подстановка данных из data/content.js и мелкая логика.
   Вёрстка статичная; скрипт только заполняет значения и собирает
   текст обращения для Telegram. Ничего никуда не отправляется. */

(function () {
  var S = window.SITE || {};

  /* ⟨заглушка⟩ → подсвеченный span */
  function isPh(v) { return typeof v === "string" && /^⟨.*⟩$/.test(v.trim()); }
  function render(v) {
    if (v === undefined || v === null || v === "") return "";
    return isPh(v)
      ? '<span class="ph">' + v.replace(/^⟨|⟩$/g, "") + "</span>"
      : String(v);
  }
  function plain(v) { return isPh(v) ? v.replace(/^⟨|⟩$/g, "") : String(v || ""); }

  /* data-site="ключ" — подставить значение */
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    var val = S[key];
    if (val === undefined) return;
    el.innerHTML = render(val);
  });

  /* Ссылки: телефон, телеграм */
  var telHref = "tel:" + plain(S.phone).replace(/[^\d+]/g, "");
  var tgNick = plain(S.telegram).replace(/^@/, "");
  var tgHref = tgNick ? "https://t.me/" + tgNick : "#";
  document.querySelectorAll("[data-href='phone']").forEach(function (a) { a.href = telHref; });
  document.querySelectorAll("[data-href='telegram']").forEach(function (a) { a.href = tgHref; });

  /* Полоса «черновик» */
  if (S.DRAFT) {
    var d = document.createElement("div");
    d.className = "draft";
    d.textContent = "Черновик сайта. Цены и контакты пока условные — подсвечены жёлтым.";
    document.body.insertBefore(d, document.body.firstChild);
  }

  /* ---------- Прайс-таблица ---------- */
  document.querySelectorAll("[data-price]").forEach(function (priceHost) {
    var rows = (S.prices || {})[priceHost.getAttribute("data-price")] || [];
    priceHost.innerHTML =
      '<div class="price-wrap"><table class="price">' +
      "<thead><tr><th>Работа</th><th>Цена от</th><th>Срок</th></tr></thead><tbody>" +
      rows.map(function (r) {
        var sum = plain(r.from) === "0" && !isPh(r.from)
          ? "бесплатно"
          : render(r.from) + " ₽";
        return "<tr><td>" + render(r.work) + '</td><td class="sum">' + sum +
               '</td><td class="term">' + (render(r.term) || "—") + "</td></tr>";
      }).join("") +
      "</tbody></table></div>";
  });

  /* ---------- Услуги на главной ---------- */
  var svcHost = document.querySelector("[data-services]");
  if (svcHost && svcHost.getAttribute("data-services") === "rows") {
    svcHost.innerHTML = (S.services || []).map(function (s) {
      return '<div class="svc-row">' +
        "<h3>" + render(s.title) + "</h3>" +
        '<div class="sum">от ' + render(s.from) + " \u20bd</div>" +
        '<a class="go" href="' + s.page + '">Подробно и цены →</a>' +
        "<p>" + render(s.text) + "</p>" +
        '<div class="meta">Срок: ' + render(s.term) + "</div>" +
        '<div class="meta">Гарантия: ' + render(S.warrantyMonths) + " мес.</div>" +
        "</div>";
    }).join("");
  } else if (svcHost) {
    svcHost.innerHTML = (S.services || []).map(function (s) {
      return '<article class="svc-card">' +
        "<h3>" + render(s.title) + "</h3>" +
        '<div class="svc-price">от ' + render(s.from) + " ₽</div>" +
        "<p>" + render(s.text) + "</p>" +
        '<div class="svc-meta"><span>Срок: <b>' + render(s.term) +
        "</b></span><span>Гарантия: <b>" + render(S.warrantyMonths) + " мес.</b></span></div>" +
        '<a href="' + s.page + '">Подробно и цены →</a>' +
        "</article>";
    }).join("");
  }

  /* ---------- Каталог ---------- */
  var catHost = document.querySelector("[data-catalog]");
  if (catHost) {
    var limit = parseInt(catHost.getAttribute("data-catalog"), 10);
    var items = (S.catalog || []).slice(0, limit || undefined);
    catHost.innerHTML = items.map(function (g) {
      var st = g.status === "order"
        ? '<span class="status order">Под заказ 1–3 дня</span>'
        : '<span class="status in">В магазине</span>';
      var img = g.img
        ? '<img class="good-img" src="' + g.img + '" alt="' + plain(g.title) + '">'
        : '<div class="good-img">фото</div>';
      return '<article class="good">' + img + "<h3>" + render(g.title) + "</h3>" +
             '<div class="good-price">' + render(g.price) + " ₽</div>" + st + "</article>";
    }).join("");
  }

  /* ---------- Отзывы ---------- */
  var revHost = document.querySelector("[data-reviews]");
  if (revHost) {
    revHost.innerHTML = (S.reviews || []).map(function (r) {
      return '<blockquote class="rev"><p>' + render(r.text) +
             "</p><cite>" + render(r.who) + "</cite></blockquote>";
    }).join("");
  }

  /* ---------- Быстрый выбор проблемы ---------- */
  var chipHost = document.getElementById("chips");
  if (chipHost) {
    chipHost.innerHTML = (S.problems || []).map(function (p) {
      return '<button type="button" class="chip" aria-pressed="false">' + p + "</button>";
    }).join("");
    chipHost.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  }

  /* ---------- Кнопка «Отправить в Telegram» ---------- */
  var sendBtn = document.getElementById("send");
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      var picked = Array.prototype.slice
        .call(document.querySelectorAll('.chip[aria-pressed="true"]'))
        .map(function (b) { return b.textContent; });
      var model = (document.getElementById("model") || {}).value || "";
      var text = (document.getElementById("details") || {}).value || "";
      var msg = "Здравствуйте! ";
      if (picked.length) msg += "Проблема: " + picked.join(", ") + ". ";
      if (model) msg += "Устройство: " + model + ". ";
      if (text) msg += text;
      if (!picked.length && !model && !text) msg += "Нужна консультация по ремонту.";
      window.open(tgHref + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  /* Текущая страница в меню */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    if (a.getAttribute("href") === here) a.setAttribute("aria-current", "page");
  });
})();
