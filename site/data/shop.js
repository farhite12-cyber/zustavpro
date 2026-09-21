/* ============================================================
   Zustav PRO — данные сайта. Правится только этот файл.
   DRAFT: true — полоса «черновик» сверху и пометка, что товары примерные.
   Зальёте настоящий каталог — поставьте false.
   ============================================================ */

window.SHOP = {

  DRAFT: true,

  org: {
    name: "Zustav PRO",
    slogan: "Тут есть Всё!",
    lead: "Продажа и сервис: телефоны, ноутбуки, часы, наушники, колонки, аксессуары. Изготовление ключей и пультов. Ремонт почти всего, что ломается.",
    address: "ул. Сущёвский Вал, 5, стр. 12",
    place: "ТЦ «Мобильный Павильон», павильоны П72–П73",
    metro: "м. Савёловская",
    city: "Москва",
    hours: "10:00 – 20:00, без выходных",
    phones: ["8 985 648-55-88", "8 916 995-84-55"],
    telegram: "https://t.me/zustavprog",
    whatsapp: "79856485588",
    avito: "",
    discount: "Подписчикам Telegram — скидка до 10%",
    trade: "Опт и розница. Новая и Б/У техника."
  },

  /* ---------- Категории ---------- */
  categories: [
    { id:"phones",  title:"Телефоны",              icon:"phone",   note:"новые и Б/У, все марки" },
    { id:"laptops", title:"Ноутбуки и ПК",         icon:"laptop",  note:"ноутбуки, компьютеры" },
    { id:"watches", title:"Часы",                  icon:"watch",   note:"кварц, механика, смарт" },
    { id:"buds",    title:"Наушники",              icon:"buds",    note:"JBL, Marshall и другие" },
    { id:"audio",   title:"Колонки и аудио",       icon:"audio",   note:"JBL, Marshall, Яндекс" },
    { id:"acc",     title:"Аксессуары",            icon:"cable",   note:"Baseus, MOMAX, Anker, WIWU" },
    { id:"glass",   title:"Стёкла и плёнки",       icon:"shield",  note:"гидрогель на любые устройства" },
    { id:"cases",   title:"Чехлы",                 icon:"case",    note:"на все популярные модели" },
    { id:"power",   title:"Батарейки и аккумуляторы", icon:"battery", note:"для часов, брелоков, техники" },
    { id:"smart",   title:"Умные гаджеты",         icon:"home",    note:"Xiaomi для дома" },
    { id:"parts",   title:"Запчасти и детали",     icon:"parts",   note:"для разных устройств" },
    { id:"keys",    title:"Ключи и пульты",        icon:"key",     note:"изготовление и прошивка" }
  ],

  brands: ["Apple","Samsung","Xiaomi","Android","JBL","Marshall","Garmin","Яндекс","Baseus","Anker","MOMAX","WIWU"],

  /* ---------- Товары ----------
     ПРИМЕРЫ для вёрстки. badge: new | sale | pick | ""
     stock: in — в наличии, order — под заказ 1–3 дня
     img — путь к фото, например "img/jbl-flip6.jpg" */
  products: [
    { cat:"phones",  brand:"Apple",    title:"iPhone 15 128 ГБ",                    price:"64 900", old:"",       stock:"in",    badge:"pick", art:"ZP-10001", img:"" },
    { cat:"phones",  brand:"Samsung",  title:"Samsung Galaxy A55 256 ГБ",           price:"32 400", old:"36 900", stock:"in",    badge:"sale", art:"ZP-10002", img:"" },
    { cat:"phones",  brand:"Xiaomi",   title:"Xiaomi Redmi Note 13 Pro 256 ГБ",     price:"23 700", old:"",       stock:"in",    badge:"",     art:"ZP-10003", img:"" },
    { cat:"phones",  brand:"Apple",    title:"iPhone 13 128 ГБ · Б/У, отличное",    price:"38 500", old:"",       stock:"in",    badge:"pick", art:"ZP-10004", img:"" },
    { cat:"phones",  brand:"Xiaomi",   title:"Xiaomi 14T 512 ГБ",                   price:"48 900", old:"",       stock:"order", badge:"new",  art:"ZP-10005", img:"" },

    { cat:"laptops", brand:"Apple",    title:"MacBook Air 13 M2 8/256",             price:"89 900", old:"",       stock:"order", badge:"",     art:"ZP-20001", img:"" },
    { cat:"laptops", brand:"Xiaomi",   title:"Xiaomi RedmiBook 15 i5 16/512",       price:"44 200", old:"49 900", stock:"in",    badge:"sale", art:"ZP-20002", img:"" },
    { cat:"laptops", brand:"Samsung",  title:"Монитор Samsung 27\" 165 Гц",         price:"21 300", old:"",       stock:"in",    badge:"",     art:"ZP-20003", img:"" },

    { cat:"watches", brand:"Garmin",   title:"Garmin Forerunner 265",               price:"42 700", old:"",       stock:"order", badge:"new",  art:"ZP-30001", img:"" },
    { cat:"watches", brand:"Garmin",   title:"Garmin Instinct 2 Solar",             price:"36 400", old:"",       stock:"order", badge:"",     art:"ZP-30002", img:"" },
    { cat:"watches", brand:"Apple",    title:"Apple Watch SE 44 мм",                price:"21 900", old:"",       stock:"in",    badge:"pick", art:"ZP-30003", img:"" },
    { cat:"watches", brand:"",         title:"Часы наручные кварцевые, классика",   price:"2 900",  old:"",       stock:"in",    badge:"",     art:"ZP-30004", img:"" },
    { cat:"watches", brand:"Xiaomi",   title:"Xiaomi Smart Band 9",                 price:"3 290",  old:"3 990",  stock:"in",    badge:"sale", art:"ZP-30005", img:"" },

    { cat:"buds",    brand:"Apple",    title:"AirPods Pro 2 USB-C",                 price:"19 400", old:"",       stock:"in",    badge:"pick", art:"ZP-40001", img:"" },
    { cat:"buds",    brand:"Marshall", title:"Marshall Motif II ANC",               price:"17 900", old:"21 500", stock:"order", badge:"sale", art:"ZP-40002", img:"" },
    { cat:"buds",    brand:"JBL",      title:"JBL Tune Buds",                       price:"4 990",  old:"",       stock:"in",    badge:"",     art:"ZP-40003", img:"" },
    { cat:"buds",    brand:"Samsung",  title:"Galaxy Buds3",                        price:"11 800", old:"",       stock:"in",    badge:"",     art:"ZP-40004", img:"" },

    { cat:"audio",   brand:"JBL",      title:"JBL Flip 6",                          price:"9 700",  old:"11 200", stock:"in",    badge:"sale", art:"ZP-50001", img:"" },
    { cat:"audio",   brand:"JBL",      title:"JBL Charge 5",                        price:"13 400", old:"",       stock:"in",    badge:"pick", art:"ZP-50002", img:"" },
    { cat:"audio",   brand:"Marshall", title:"Marshall Emberton III",               price:"16 900", old:"",       stock:"order", badge:"new",  art:"ZP-50003", img:"" },
    { cat:"audio",   brand:"Яндекс",   title:"Яндекс Станция Мини 3",               price:"7 490",  old:"",       stock:"in",    badge:"",     art:"ZP-50004", img:"" },

    { cat:"acc",     brand:"Baseus",   title:"Кабель Baseus USB-C — Lightning 1 м", price:"690",    old:"",       stock:"in",    badge:"",     art:"ZP-60001", img:"" },
    { cat:"acc",     brand:"Anker",    title:"Powerbank Anker 20000 мА·ч 22.5 Вт",  price:"3 990",  old:"4 590",  stock:"in",    badge:"sale", art:"ZP-60002", img:"" },
    { cat:"acc",     brand:"Baseus",   title:"Зарядка GaN 65 Вт, 3 порта",          price:"2 790",  old:"",       stock:"in",    badge:"pick", art:"ZP-60003", img:"" },
    { cat:"acc",     brand:"MOMAX",    title:"Беспроводная зарядка MOMAX 15 Вт",    price:"2 190",  old:"",       stock:"in",    badge:"",     art:"ZP-60004", img:"" },
    { cat:"acc",     brand:"WIWU",     title:"Держатель WIWU в авто, магнитный",    price:"1 290",  old:"",       stock:"in",    badge:"",     art:"ZP-60005", img:"" },

    { cat:"glass",   brand:"",         title:"Гидрогелевая плёнка с установкой",    price:"790",    old:"",       stock:"in",    badge:"pick", art:"ZP-65001", img:"" },
    { cat:"glass",   brand:"",         title:"Защитное стекло 2.5D с установкой",   price:"890",    old:"",       stock:"in",    badge:"",     art:"ZP-65002", img:"" },
    { cat:"glass",   brand:"",         title:"Стекло на часы, любой диаметр",       price:"590",    old:"",       stock:"in",    badge:"",     art:"ZP-65003", img:"" },

    { cat:"cases",   brand:"",         title:"Чехол силиконовый, цвета в наличии",  price:"490",    old:"",       stock:"in",    badge:"",     art:"ZP-66001", img:"" },
    { cat:"cases",   brand:"",         title:"Чехол-книжка с отделом для карт",     price:"890",    old:"",       stock:"in",    badge:"",     art:"ZP-66002", img:"" },
    { cat:"cases",   brand:"WIWU",     title:"Чехол WIWU для ноутбука 13–14\"",     price:"1 690",  old:"",       stock:"in",    badge:"",     art:"ZP-66003", img:"" },

    { cat:"power",   brand:"",         title:"Батарейка для часов, установка при вас", price:"350", old:"",       stock:"in",    badge:"pick", art:"ZP-67001", img:"" },
    { cat:"power",   brand:"",         title:"Батарейка для автобрелока",           price:"400",    old:"",       stock:"in",    badge:"",     art:"ZP-67002", img:"" },
    { cat:"power",   brand:"",         title:"Аккумулятор для телефона, с заменой", price:"⟨цена⟩", old:"",       stock:"order", badge:"",     art:"ZP-67003", img:"" },

    { cat:"smart",   brand:"Яндекс",   title:"Умная лампа Яндекс E27 RGB",          price:"1 290",  old:"",       stock:"in",    badge:"",     art:"ZP-70001", img:"" },
    { cat:"smart",   brand:"Xiaomi",   title:"Умная розетка Xiaomi Wi-Fi",          price:"1 090",  old:"",       stock:"in",    badge:"",     art:"ZP-70002", img:"" },
    { cat:"smart",   brand:"Xiaomi",   title:"Робот-пылесос Xiaomi",                price:"18 900", old:"",       stock:"order", badge:"new",  art:"ZP-70003", img:"" },

    { cat:"parts",   brand:"",         title:"Дисплейный модуль, подбор по модели", price:"⟨цена⟩", old:"",       stock:"order", badge:"",     art:"ZP-75001", img:"" },
    { cat:"parts",   brand:"",         title:"Разъём зарядки, шлейфы",              price:"⟨цена⟩", old:"",       stock:"order", badge:"",     art:"ZP-75002", img:"" },

    { cat:"keys",    brand:"",         title:"Дубликат дверного ключа",             price:"300",    old:"",       stock:"in",    badge:"",     art:"ZP-80001", img:"" },
    { cat:"keys",    brand:"",         title:"Копия домофонного брелока",           price:"400",    old:"",       stock:"in",    badge:"pick", art:"ZP-80002", img:"" },
    { cat:"keys",    brand:"",         title:"Пульт для шлагбаума и ворот",         price:"1 200",  old:"",       stock:"in",    badge:"",     art:"ZP-80003", img:"" },
    { cat:"keys",    brand:"",         title:"Пульт для ТВ и ТВ-приставок",         price:"700",    old:"",       stock:"in",    badge:"",     art:"ZP-80004", img:"" },
    { cat:"keys",    brand:"",         title:"Автомобильный ключ, изготовление",    price:"⟨цена⟩", old:"",       stock:"order", badge:"",     art:"ZP-80005", img:"" }
  ],

  /* ---------- Услуги ---------- */
  serviceGroups: [
    {
      title: "Ремонт",
      note: "Диагностика бесплатная, цену называем до начала работ",
      items: [
        { title:"Телефоны и планшеты",        price:"⟨от 0⟩" },
        { title:"Ноутбуки и компьютеры",      price:"⟨от 0⟩" },
        { title:"Наушники и колонки",         price:"⟨от 0⟩" },
        { title:"Часы всех видов",            price:"⟨от 0⟩" },
        { title:"Фотоаппараты",               price:"⟨от 0⟩" },
        { title:"Мелкая бытовая техника",     price:"⟨от 0⟩" },
        { title:"Очки",                       price:"⟨от 0⟩" },
        { title:"Компонентная пайка плат",    price:"⟨от 0⟩" }
      ]
    },
    {
      title: "Ключи и пульты",
      note: "Дверные, сейфовые, домофонные и автомобильные",
      items: [
        { title:"Дубликат дверного ключа",    price:"от 300 ₽" },
        { title:"Сейфовый ключ",              price:"⟨от 0⟩" },
        { title:"Домофонный брелок",          price:"от 400 ₽" },
        { title:"Автомобильный ключ",         price:"⟨от 0⟩" },
        { title:"Пульт шлагбаума и ворот",    price:"от 1 200 ₽" },
        { title:"Пульт охранной сигнализации",price:"⟨от 0⟩" },
        { title:"Пульт ТВ и ТВ-приставки",    price:"от 700 ₽" }
      ]
    },
    {
      title: "Пока ждёте",
      note: "Делается при вас, за несколько минут",
      items: [
        { title:"Замена батарейки в часах",   price:"от 350 ₽" },
        { title:"Батарейка в автобрелоке",    price:"от 400 ₽" },
        { title:"Гидрогелевая плёнка",        price:"от 790 ₽" },
        { title:"Защитное стекло",            price:"от 890 ₽" },
        { title:"Ксерокопия",                 price:"⟨от 0⟩" },
        { title:"Диагностика",                price:"бесплатно" }
      ]
    }
  ],

  reviews: [
    { text:"⟨Текст отзыва — из переписки, с Авито или с карт⟩", who:"⟨Имя⟩", date:"⟨месяц, год⟩" },
    { text:"⟨Текст отзыва — из переписки, с Авито или с карт⟩", who:"⟨Имя⟩", date:"⟨месяц, год⟩" },
    { text:"⟨Текст отзыва — из переписки, с Авито или с карт⟩", who:"⟨Имя⟩", date:"⟨месяц, год⟩" }
  ]
};
