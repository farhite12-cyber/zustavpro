/* Zustav PRO — корзина: кнопки, счётчик в шапке, всплывающее уведомление. */
(function () {
  var S = window.ZP_STORE;
  if (!S) return;

  function money(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  function num(v) { return parseInt(String(v).replace(/\s|₽/g, ""), 10) || 0; }
  window.ZP_MONEY = money; window.ZP_NUM = num;

  function count() { return S.getCart().reduce(function (s, i) { return s + i.qty; }, 0); }
  function total() { return S.getCart().reduce(function (s, i) { return s + i.qty * num(i.price); }, 0); }
  window.ZP_CART_TOTAL = total;

  /* ---- добавление ---- */
  window.ZP_ADD = function (item) {
    var cart = S.getCart(), found = false;
    cart.forEach(function (i) { if (i.art === item.art) { i.qty += 1; found = true; } });
    if (!found) cart.push({ art: item.art, title: item.title, price: item.price, qty: 1 });
    S.setCart(cart);
    toast(item.title);
  };

  /* ---- уведомление ---- */
  var tEl;
  function toast(title) {
    if (!tEl) {
      tEl = document.createElement("div");
      tEl.className = "toast";
      document.body.appendChild(tEl);
    }
    tEl.innerHTML = '<b>Добавлено в корзину</b><span>' + title + "</span>" +
                    '<a class="btn btn-green btn-sm" href="korzina.html">Перейти</a>';
    tEl.classList.add("on");
    clearTimeout(tEl._t);
    tEl._t = setTimeout(function () { tEl.classList.remove("on"); }, 4000);
  }

  /* ---- кнопка корзины в шапке и в нижней панели ---- */
  function mountCartButtons() {
    var cta = document.querySelector(".hd-cta");
    if (cta && !cta.querySelector(".cart-btn")) {
      var a = document.createElement("a");
      a.className = "cart-btn";
      a.href = "korzina.html";
      a.setAttribute("aria-label", "Корзина");
      a.innerHTML = (window.ZP_ICON ? window.ZP_ICON("cart") : "") + '<span class="cart-num" hidden>0</span>';
      cta.appendChild(a);
    }
    var dock = document.querySelector(".dock");
    if (dock && !dock.querySelector(".dock-cart")) {
      var d = document.createElement("a");
      d.className = "dock-cart";
      d.href = "korzina.html";
      d.innerHTML = (window.ZP_ICON ? window.ZP_ICON("cart") : "") +
                    'Корзина<span class="cart-num" hidden>0</span>';
      dock.insertBefore(d, dock.children[1] || null);
      dock.style.gridTemplateColumns = "repeat(4,1fr)";
    }
  }

  function paint() {
    var n = count();
    document.querySelectorAll(".cart-num").forEach(function (el) {
      el.textContent = n;
      el.hidden = n === 0;
    });
  }

  document.addEventListener("zp:cart", paint);

  /* ---- клики «В корзину» ---- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (!b) return;
    e.preventDefault();
    window.ZP_ADD({
      art: b.getAttribute("data-add"),
      title: b.getAttribute("data-title"),
      price: b.getAttribute("data-price")
    });
  });

  mountCartButtons();
  paint();
  window.ZP_CART_PAINT = paint;
})();
