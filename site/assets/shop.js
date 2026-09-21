/* Zustav PRO — отрисовка данных из data/shop.js. Без зависимостей. */
(function () {
  var S = window.SHOP || {}, O = S.org || {};

  /* ---------- заглушки ⟨...⟩ ---------- */
  function isPh(v){ return typeof v === "string" && /^⟨.*⟩$/.test(v.trim()); }
  function r(v){
    if (v === undefined || v === null || v === "") return "";
    return isPh(v) ? '<span class="ph">' + String(v).replace(/^⟨|⟩$/g,"") + "</span>" : String(v);
  }
  function plain(v){ return isPh(v) ? String(v).replace(/^⟨|⟩$/g,"") : String(v == null ? "" : v); }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  /* ---------- иконки ---------- */
  var I = {
    phone:'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10.5 18.5h3"/>',
    laptop:'<rect x="3" y="4" width="18" height="12" rx="1.6"/><path d="M2 20h20"/>',
    watch:'<circle cx="12" cy="12" r="6"/><path d="M9 6.2 9.5 2h5l.5 4.2M9 17.8l.5 4.2h5l.5-4.2M12 9v3.2l2 1.3"/>',
    buds:'<path d="M8 3C5.8 3 4 4.9 4 7.2V13a3 3 0 0 0 6 0V9M16 3c2.2 0 4 1.9 4 4.2V13a3 3 0 0 1-6 0V9"/>',
    audio:'<rect x="5" y="2" width="14" height="20" rx="2.5"/><circle cx="12" cy="14.5" r="3.6"/><circle cx="12" cy="6.5" r="1.2"/>',
    cable:'<path d="M7 3v5a3 3 0 0 0 3 3h4a3 3 0 0 1 3 3v3"/><rect x="4.5" y="1.5" width="5" height="3" rx="1"/><rect x="14.5" y="19.5" width="5" height="3" rx="1"/>',
    shield:'<path d="M12 2.5 4.5 5.5V12c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V5.5Z"/><path d="m9 12 2 2 4-4.2"/>',
    "case":'<rect x="6" y="2" width="12" height="20" rx="3"/><circle cx="9.5" cy="6.5" r="1.3"/>',
    battery:'<rect x="2" y="7" width="17" height="10" rx="2.2"/><path d="M22 10.5v3"/><path d="M5.5 10.5v3M9 10.5v3"/>',
    home:'<path d="M4 10.5 12 3l8 7.5"/><path d="M6 9.8V20h12V9.8"/><path d="M10 20v-5h4v5"/>',
    parts:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    key:'<circle cx="7.5" cy="12" r="4"/><path d="M11.5 12H22l-2 2.5M17 12v3"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    pin:'<path d="M12 22s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z"/><circle cx="12" cy="10" r="2.6"/>',
    chat:'<path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.4-5.1A8.5 8.5 0 1 1 21 12Z"/>',
    call:'<path d="M5 3h3.5l1.8 4.4-2.2 1.6a12 12 0 0 0 5.9 5.9l1.6-2.2L20 14.5V18a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 5.2 2 2 0 0 1 5 3Z"/>',
    wrench:'<path d="M20 5.5a5.5 5.5 0 0 1-7.3 5.2L6 17.4a2.3 2.3 0 0 1-3.3-3.3l6.7-6.7A5.5 5.5 0 0 1 16 3.3l-3 3 1.6 3.1 3.1 1.6 3-3c.2.5.3 1 .3 1.5Z"/>'
  };
  function ico(name, cls){
    var p = I[name] || I.parts;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
           'stroke-linecap="round" stroke-linejoin="round"' + (cls ? ' class="'+cls+'"' : '') + '>' + p + "</svg>";
  }
  window.ZP_ICON = ico;

  /* ---------- подстановка значений ---------- */
  document.querySelectorAll("[data-org]").forEach(function (el) {
    var k = el.getAttribute("data-org");
    if (k === "phone1") return el.innerHTML = r((O.phones||[])[0]);
    if (k === "phone2") return el.innerHTML = r((O.phones||[])[1]);
    if (O[k] !== undefined) el.innerHTML = r(O[k]);
  });

  var tel1 = "tel:+" + plain((O.phones||[])[0]).replace(/\D/g, "").replace(/^8/, "7");
  var tgHref = plain(O.telegram) || "#";
  var waHref = O.whatsapp ? "https://wa.me/" + plain(O.whatsapp) : tgHref;
  document.querySelectorAll("[data-href='phone']").forEach(function(a){ a.href = tel1; });
  document.querySelectorAll("[data-href='telegram']").forEach(function(a){ a.href = tgHref; });
  document.querySelectorAll("[data-href='whatsapp']").forEach(function(a){ a.href = waHref; });

  if (S.DRAFT) {
    var d = document.createElement("div");
    d.className = "draft";
    d.textContent = "Черновик сайта. Товары и цены — примеры для вёрстки, заглушки подсвечены.";
    document.body.insertBefore(d, document.body.firstChild);
  }

  /* ---------- категории ---------- */
  var cats = S.categories || [];
  var catsHost = document.querySelector("[data-cats]");
  if (catsHost) {
    catsHost.innerHTML = cats.map(function (c) {
      return '<a class="cat" href="katalog.html#' + c.id + '">' +
        '<span class="ico">' + ico(c.icon) + "</span>" +
        "<b>" + esc(c.title) + "</b><span>" + esc(c.note || "") + "</span></a>";
    }).join("");
  }
  var catbar = document.querySelector("[data-catbar]");
  if (catbar) {
    catbar.innerHTML = cats.map(function (c) {
      return '<li><a href="katalog.html#' + c.id + '">' + esc(c.title) + "</a></li>";
    }).join("");
  }

  /* ---------- карточка товара ---------- */
  var BADGE = { "new":"Новинка", "sale":"Акция", "pick":"Советуем" };
  function card(p) {
    var img = p.img ? '<img src="' + esc(p.img) + '" alt="' + esc(plain(p.title)) + '" loading="lazy">' : "фото";
    var badge = p.badge ? '<span class="badge ' + p.badge + '">' + BADGE[p.badge] + "</span>" : "";
    var price = '<div class="good-price' + (p.old ? " sale" : "") + '"><b>' + r(p.price) +
                " ₽</b>" + (p.old ? "<s>" + esc(p.old) + " ₽</s>" : "") + "</div>";
    var stock = p.stock === "order"
      ? '<span class="stock order">Под заказ 1–3 дня</span>'
      : '<span class="stock in">В наличии</span>';
    return '<article class="good">' + badge +
      '<div class="good-img">' + img + "</div>" +
      (p.brand ? '<span class="good-brand">' + esc(p.brand) + "</span>" : "") +
      "<h3>" + esc(p.title) + "</h3>" + price + stock +
      '<span class="good-art">Арт. ' + esc(p.art) + "</span>" +
      '<a class="btn btn-green btn-sm btn-wide" href="' + tgHref +
      "?text=" + encodeURIComponent("Здравствуйте! Интересует: " + plain(p.title) + " (арт. " + p.art + ")") +
      '" target="_blank" rel="noopener">Узнать наличие</a></article>';
  }

  /* ---------- витрина с вкладками ---------- */
  var showHost = document.querySelector("[data-showcase]");
  if (showHost) {
    var tabs = document.querySelector("[data-tabs]");
    var picks = (S.products || []).filter(function (p) { return p.badge; });
    var views = [{ id:"all", title:"Лучшие предложения", list: picks.length ? picks : (S.products||[]).slice(0,10) }]
      .concat(cats.slice(0, 6).map(function (c) {
        return { id:c.id, title:c.title, list:(S.products||[]).filter(function(p){ return p.cat===c.id; }) };
      }));
    function draw(i) {
      showHost.innerHTML = views[i].list.slice(0, 10).map(card).join("");
      if (tabs) tabs.querySelectorAll(".tab").forEach(function (b, n) {
        b.setAttribute("aria-selected", n === i ? "true" : "false");
      });
    }
    if (tabs) {
      tabs.innerHTML = views.map(function (v, n) {
        return '<button class="tab" type="button" role="tab" aria-selected="' + (n===0) + '">' + esc(v.title) + "</button>";
      }).join("");
      tabs.addEventListener("click", function (e) {
        var b = e.target.closest(".tab");
        if (b) draw(Array.prototype.indexOf.call(tabs.children, b));
      });
    }
    draw(0);
  }

  /* ---------- полный каталог ---------- */
  var catalogHost = document.querySelector("[data-catalog]");
  if (catalogHost) {
    var q = document.getElementById("q");
    function drawCatalog(filterId, text) {
      var list = (S.products || []).filter(function (p) {
        var okCat = !filterId || filterId === "all" || p.cat === filterId;
        var okTxt = !text || (plain(p.title) + " " + (p.brand||"") + " " + p.art).toLowerCase().indexOf(text) > -1;
        return okCat && okTxt;
      });
      var groups = (filterId && filterId !== "all") ? [filterId] : cats.map(function(c){ return c.id; });
      var html = groups.map(function (id) {
        var cat = cats.filter(function(c){ return c.id === id; })[0];
        var items = list.filter(function(p){ return p.cat === id; });
        if (!items.length) return "";
        return '<section id="' + id + '" style="padding-block:18px"><div class="sec-head"><h2>' +
          esc(cat.title) + '</h2><span class="all">' + items.length + ' поз.</span></div>' +
          '<div class="goods">' + items.map(card).join("") + "</div></section>";
      }).join("");
      catalogHost.innerHTML = html ||
        '<p style="padding:30px 0;color:var(--muted)">Ничего не нашлось. Напишите нам — почти всё привозим за 1–3 дня.</p>';
    }
    var chips = document.querySelector("[data-catchips]");
    if (chips) {
      chips.innerHTML = '<button class="tab" type="button" aria-selected="true" data-id="all">Все</button>' +
        cats.map(function (c) { return '<button class="tab" type="button" aria-selected="false" data-id="' + c.id + '">' + esc(c.title) + "</button>"; }).join("");
      chips.addEventListener("click", function (e) {
        var b = e.target.closest(".tab"); if (!b) return;
        chips.querySelectorAll(".tab").forEach(function (x) { x.setAttribute("aria-selected", x === b ? "true" : "false"); });
        drawCatalog(b.getAttribute("data-id"), q ? q.value.trim().toLowerCase() : "");
      });
    }
    if (q) q.addEventListener("input", function () {
      var act = chips && chips.querySelector('.tab[aria-selected="true"]');
      drawCatalog(act ? act.getAttribute("data-id") : "all", q.value.trim().toLowerCase());
    });
    var hash = (location.hash || "").replace("#", "");
    if (hash && chips) {
      var target = chips.querySelector('[data-id="' + hash + '"]');
      if (target) target.click(); else drawCatalog("all", "");
    } else drawCatalog("all", "");
  }

  /* ---------- бренды ---------- */
  var brHost = document.querySelector("[data-brands]");
  if (brHost) brHost.innerHTML = (S.brands || []).map(function (b) { return "<div>" + esc(b) + "</div>"; }).join("");

  /* ---------- услуги ---------- */
  var svcHost = document.querySelector("[data-services]");
  if (svcHost) {
    svcHost.innerHTML = (S.serviceGroups || []).map(function (g) {
      return '<div class="svc-col"><h3>' + esc(g.title) + "</h3><p>" + esc(g.note) + "</p><ul>" +
        g.items.map(function (i) { return "<li><span>" + esc(i.title) + "</span><b>" + r(i.price) + "</b></li>"; }).join("") +
        "</ul></div>";
    }).join("");
  }

  /* ---------- отзывы ---------- */
  var revHost = document.querySelector("[data-reviews]");
  if (revHost) {
    revHost.innerHTML = (S.reviews || []).map(function (v) {
      return '<blockquote class="rev"><div class="stars">★★★★★</div><p>' + r(v.text) +
        "</p><cite>" + r(v.who) + " · " + r(v.date) + "</cite></blockquote>";
    }).join("");
  }

  /* ---------- поиск в шапке ---------- */
  var hs = document.querySelector("[data-headsearch]");
  if (hs) hs.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = hs.querySelector("input").value.trim();
    location.href = "katalog.html" + (v ? "?q=" + encodeURIComponent(v) : "");
  });
  var pq = new URLSearchParams(location.search).get("q");
  if (pq && document.getElementById("q")) {
    var f = document.getElementById("q");
    f.value = pq;
    f.dispatchEvent(new Event("input"));
  }

  /* ---------- иконки в разметке ---------- */
  document.querySelectorAll("[data-ico]").forEach(function (el) {
    el.innerHTML = ico(el.getAttribute("data-ico"));
  });
})();
