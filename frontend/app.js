const API_URL = window.APP_CONFIG?.apiUrl || "http://localhost:8000/api";

const translations = {
  ru: {
    documentTitle: "Совпало — подрядчики для событий",
    metaDescription: "Совпало — точный подбор подрядчиков для событий с понятным объяснением каждого совпадения.",
    brandAria: "Совпало — на главную",
    brandTagline: "подрядчики<br />для событий",
    navAria: "Основная навигация",
    navHow: "Как это работает",
    navMatch: "Подбор",
    navAbout: "О сервисе",
    localeAria: "Язык интерфейса",
    catalogLoading: "Каталог загружается",
    heroEyebrow: "Меньше вариантов. Больше уверенности.",
    heroTitle: "Найдём тех, кто действительно подходит",
    heroCopy: "До трёх точных совпадений — с честным объяснением, почему каждый подрядчик оказался в подборке.",
    matcherAria: "Подбор подрядчиков",
    stepParameters: "01 / Параметры",
    formTitle: "Расскажите о событии",
    city: "Город",
    date: "Дата мероприятия",
    eventType: "Тип мероприятия",
    category: "Категория подрядчика",
    budget: "Бюджет, ₸",
    optional: "Опционально",
    duration: "Длительность, ч",
    durationPlaceholder: "Например, 6",
    contractorLanguage: "Язык подрядчика",
    anyLanguage: "Любой",
    submit: "Найти подрядчиков",
    searching: "Ищем совпадения…",
    datasetChecking: "Проверяем датасет…",
    datasetConnected: ({ count }) => `Датасет подключён · ${count} профилей`,
    catalogCount: ({ count }) => `${count} профилей в каталоге`,
    stepMatches: "02 / Совпадения",
    resultsTitle: "Подходят под запрос",
    resultsSubtitle: "Укажите параметры — покажем до трёх вариантов",
    sortAria: "Сортировка",
    sortRelevance: "Сначала точное совпадение",
    sortPriceAsc: "Цена: сначала ниже",
    sortPriceDesc: "Цена: сначала выше",
    howEyebrow: "Прозрачный подбор",
    howTitle: "Не каталог. Короткий список с аргументами.",
    howStep1Title: "Отсекаем лишнее",
    howStep1Copy: "Проверяем город, дату, формат, бюджет, язык и длительность.",
    howStep2Title: "Считаем совпадение",
    howStep2Copy: "Стабильно оцениваем оставшихся подрядчиков и выбираем до трёх.",
    howStep3Title: "Объясняем выбор",
    howStep3Copy: "Показываем конкретные причины попадания каждой карточки в результат.",
    footerTagline: "События начинаются<br />с правильных людей.",
    footerCopy: "Сервис точного подбора event-подрядчиков<br />для Алматы, Астаны и не только.",
    footerCopyright: "© 2026 Совпало",
    footerLocation: "Алматы, Казахстан",
    matchBadge: ({ rank }) => `Совпадение ${rank}`,
    demoProfile: "Демо-профиль",
    demoTitle: "Профиль добавлен для демонстрации",
    estimatedPrice: "ориентир",
    priceFrom: "от",
    maxHours: ({ hours }) => `до ${hours} ч`,
    languagesAria: "Языки",
    why: "Почему в результате",
    tagsAria: "Совпавшие параметры",
    outcomeMatchedTitle: "Подобрали",
    outcomeCategoryTitle: "В этом городе такой категории нет",
    outcomeNoMatchTitle: "Кандидаты есть, но ни один не подходит",
    resultFallbackTitle: "Результат подбора",
    emptyMatchedLabel: "Подобрали",
    emptyMatchedTitle: "Больше точных совпадений нет",
    emptyMatchedMessage: "Это все подрядчики в городе и категории, которые проходят заданные условия.",
    emptyMatchedReasons: ({ details }) => `Остальные кандидаты не прошли условия: ${details}.`,
    emptyCategoryLabel: "В городе нет категории",
    emptyCategoryTitle: "Подрядчиков этой категории здесь нет",
    emptyRejectedLabel: "Кандидаты есть, но не подходят",
    emptyRejectedTitle: "Ни один кандидат не прошёл условия",
    rejection_busy: "заняты в выбранную дату",
    rejection_over_budget: "не укладываются в бюджет",
    rejection_wrong_format: "не берут выбранный формат",
    rejection_wrong_language: "не работают на выбранном языке",
    rejection_duration: "не подходят по длительности",
    apiError: ({ status }) => `Ошибка API: ${status}`,
    requestFailed: "Не удалось получить подборку",
    backendTitle: "Backend не отвечает",
    backendMessage: ({ error }) => `Проверьте, что API запущен по адресу ${API_URL}. ${error}`,
    noDataset: "Нет связи с датасетом",
    apiUnavailable: "API недоступен",
    connectBackend: "Подключите backend",
    connectBackendMessage: ({ error }) => `Запустите REST API и обновите страницу. Ожидаемый адрес: ${API_URL}. ${error}`,
    enterAmount: "Введите сумму",
  },
  kk: {
    documentTitle: "Совпало — іс-шара мердігерлері",
    metaDescription: "Совпало — әр сәйкестікке түсінікті негіздемесі бар іс-шара мердігерлерін дәл іріктеу сервисі.",
    brandAria: "Совпало — басты бет",
    brandTagline: "іс-шараға арналған<br />мердігерлер",
    navAria: "Негізгі навигация",
    navHow: "Қалай жұмыс істейді",
    navMatch: "Іріктеу",
    navAbout: "Сервис туралы",
    localeAria: "Интерфейс тілі",
    catalogLoading: "Каталог жүктелуде",
    heroEyebrow: "Аз нұсқа. Көбірек сенім.",
    heroTitle: "Сізге шынымен сай келетін мамандарды табамыз",
    heroCopy: "Үшке дейін нақты сәйкестік — әр мердігердің неге таңдалғаны туралы түсінікті негіздемемен.",
    matcherAria: "Мердігерлерді іріктеу",
    stepParameters: "01 / Параметрлер",
    formTitle: "Іс-шара туралы айтыңыз",
    city: "Қала",
    date: "Іс-шара күні",
    eventType: "Іс-шара түрі",
    category: "Мердігер санаты",
    budget: "Бюджет, ₸",
    optional: "Қосымша",
    duration: "Ұзақтығы, сағ",
    durationPlaceholder: "Мысалы, 6",
    contractorLanguage: "Мердігер тілі",
    anyLanguage: "Кез келген",
    submit: "Мердігерлерді табу",
    searching: "Сәйкестіктер ізделуде…",
    datasetChecking: "Деректер тексерілуде…",
    datasetConnected: ({ count }) => `Деректер қосылды · ${count} профиль`,
    catalogCount: ({ count }) => `Каталогта ${count} профиль`,
    stepMatches: "02 / Сәйкестіктер",
    resultsTitle: "Сұранысқа сай келеді",
    resultsSubtitle: "Параметрлерді көрсетіңіз — үшке дейін нұсқа ұсынамыз",
    sortAria: "Сұрыптау",
    sortRelevance: "Алдымен дәл сәйкестік",
    sortPriceAsc: "Баға: төменнен жоғары",
    sortPriceDesc: "Баға: жоғарыдан төмен",
    howEyebrow: "Ашық іріктеу",
    howTitle: "Каталог емес. Дәлелдері бар қысқа тізім.",
    howStep1Title: "Артық нұсқаларды алып тастаймыз",
    howStep1Copy: "Қаланы, күнді, форматты, бюджетті, тілді және ұзақтықты тексереміз.",
    howStep2Title: "Сәйкестікті есептейміз",
    howStep2Copy: "Қалған мердігерлерді тұрақты бағалап, үшеуге дейін таңдаймыз.",
    howStep3Title: "Таңдауды түсіндіреміз",
    howStep3Copy: "Әр карточканың нәтижеге неге енгенін нақты көрсетеміз.",
    footerTagline: "Іс-шара дұрыс адамдардан<br />басталады.",
    footerCopy: "Алматы, Астана және басқа қалалардағы<br />event-мердігерлерді дәл іріктеу сервисі.",
    footerCopyright: "© 2026 Совпало",
    footerLocation: "Алматы, Қазақстан",
    matchBadge: ({ rank }) => `Сәйкестік ${rank}`,
    demoProfile: "Демо-профиль",
    demoTitle: "Профиль демонстрация үшін қосылған",
    estimatedPrice: "бағдар",
    priceFrom: "бастап",
    maxHours: ({ hours }) => `${hours} сағ дейін`,
    languagesAria: "Тілдер",
    why: "Неліктен нәтижеде",
    tagsAria: "Сәйкес параметрлер",
    outcomeMatchedTitle: "Іріктелді",
    outcomeCategoryTitle: "Бұл қалада мұндай санат жоқ",
    outcomeNoMatchTitle: "Кандидаттар бар, бірақ ешқайсысы сәйкес емес",
    resultFallbackTitle: "Іріктеу нәтижесі",
    emptyMatchedLabel: "Іріктелді",
    emptyMatchedTitle: "Басқа дәл сәйкестік жоқ",
    emptyMatchedMessage: "Бұл — қала мен санаттағы барлық шартқа сай мердігерлердің толық тізімі.",
    emptyMatchedReasons: ({ details }) => `Қалған кандидаттар шарттардан өтпеді: ${details}.`,
    emptyCategoryLabel: "Қалада бұл санат жоқ",
    emptyCategoryTitle: "Бұл санаттағы мердігерлер мұнда жоқ",
    emptyRejectedLabel: "Кандидаттар бар, бірақ сәйкес емес",
    emptyRejectedTitle: "Бірде-бір кандидат шарттардан өтпеді",
    rejection_busy: "таңдалған күні бос емес",
    rejection_over_budget: "бюджетке сыймайды",
    rejection_wrong_format: "таңдалған форматта жұмыс істемейді",
    rejection_wrong_language: "таңдалған тілде жұмыс істемейді",
    rejection_duration: "ұзақтығы бойынша сәйкес емес",
    apiError: ({ status }) => `API қатесі: ${status}`,
    requestFailed: "Іріктеу нәтижесін алу мүмкін болмады",
    backendTitle: "Backend жауап бермейді",
    backendMessage: ({ error }) => `API ${API_URL} мекенжайында іске қосылғанын тексеріңіз. ${error}`,
    noDataset: "Деректермен байланыс жоқ",
    apiUnavailable: "API қолжетімсіз",
    connectBackend: "Backend-ті қосыңыз",
    connectBackendMessage: ({ error }) => `REST API-ды іске қосып, бетті жаңартыңыз. Күтілетін мекенжай: ${API_URL}. ${error}`,
    enterAmount: "Соманы енгізіңіз",
  },
  en: {
    documentTitle: "Sovpalo — event contractors",
    metaDescription: "Sovpalo finds event contractors and explains every match clearly.",
    brandAria: "Sovpalo — home",
    brandTagline: "contractors<br />for events",
    navAria: "Main navigation",
    navHow: "How it works",
    navMatch: "Matching",
    navAbout: "About",
    localeAria: "Interface language",
    catalogLoading: "Loading catalog",
    heroEyebrow: "Fewer options. More confidence.",
    heroTitle: "Find people who truly fit your event",
    heroCopy: "Up to three precise matches, each with a clear explanation of why the contractor made the shortlist.",
    matcherAria: "Contractor matching",
    stepParameters: "01 / Details",
    formTitle: "Tell us about your event",
    city: "City",
    date: "Event date",
    eventType: "Event type",
    category: "Contractor category",
    budget: "Budget, ₸",
    optional: "Optional",
    duration: "Duration, h",
    durationPlaceholder: "For example, 6",
    contractorLanguage: "Contractor language",
    anyLanguage: "Any",
    submit: "Find contractors",
    searching: "Finding matches…",
    datasetChecking: "Checking dataset…",
    datasetConnected: ({ count }) => `Dataset connected · ${count} profiles`,
    catalogCount: ({ count }) => `${count} profiles in catalog`,
    stepMatches: "02 / Matches",
    resultsTitle: "Matches for your request",
    resultsSubtitle: "Set your preferences to see up to three options",
    sortAria: "Sort results",
    sortRelevance: "Best match first",
    sortPriceAsc: "Price: low to high",
    sortPriceDesc: "Price: high to low",
    howEyebrow: "Transparent matching",
    howTitle: "Not a catalog. A shortlist with reasons.",
    howStep1Title: "Filter out the noise",
    howStep1Copy: "We check city, date, format, budget, language and duration.",
    howStep2Title: "Calculate the match",
    howStep2Copy: "We score the remaining contractors consistently and select up to three.",
    howStep3Title: "Explain the choice",
    howStep3Copy: "We show the exact reasons each card appears in your results.",
    footerTagline: "Great events begin<br />with the right people.",
    footerCopy: "Precise event-contractor matching<br />for Almaty, Astana and beyond.",
    footerCopyright: "© 2026 Sovpalo",
    footerLocation: "Almaty, Kazakhstan",
    matchBadge: ({ rank }) => `Match ${rank}`,
    demoProfile: "Demo profile",
    demoTitle: "This profile was added for demonstration",
    estimatedPrice: "estimate",
    priceFrom: "from",
    maxHours: ({ hours }) => `up to ${hours} h`,
    languagesAria: "Languages",
    why: "Why it matches",
    tagsAria: "Matching details",
    outcomeMatchedTitle: "Selected for you",
    outcomeCategoryTitle: "This category is not available in the city",
    outcomeNoMatchTitle: "Candidates exist, but none match",
    resultFallbackTitle: "Matching result",
    emptyMatchedLabel: "Complete shortlist",
    emptyMatchedTitle: "No more exact matches",
    emptyMatchedMessage: "These are all contractors in this city and category who meet every condition.",
    emptyMatchedReasons: ({ details }) => `Other candidates did not meet the conditions: ${details}.`,
    emptyCategoryLabel: "Category unavailable",
    emptyCategoryTitle: "There are no contractors in this category here",
    emptyRejectedLabel: "Candidates found, but not matched",
    emptyRejectedTitle: "No candidate met every condition",
    rejection_busy: "unavailable on the selected date",
    rejection_over_budget: "over budget",
    rejection_wrong_format: "do not support the selected format",
    rejection_wrong_language: "do not work in the selected language",
    rejection_duration: "do not match the duration",
    apiError: ({ status }) => `API error: ${status}`,
    requestFailed: "Could not load the shortlist",
    backendTitle: "Backend is not responding",
    backendMessage: ({ error }) => `Make sure the API is running at ${API_URL}. ${error}`,
    noDataset: "Dataset is not connected",
    apiUnavailable: "API unavailable",
    connectBackend: "Connect the backend",
    connectBackendMessage: ({ error }) => `Start the REST API and refresh the page. Expected address: ${API_URL}. ${error}`,
    enterAmount: "Enter an amount",
  },
};

const optionLabels = {
  kk: {
    "Алматы": "Алматы", "Астана": "Астана", "Зарубежье": "Шетел",
    "день рождения": "туған күн", "конференция": "конференция", "корпоратив": "корпоратив", "свадьба": "үйлену тойы", "той": "той", "юбилей": "мерейтой",
    "Банкетный зал": "Банкет залы", "Ведущий": "Жүргізуші", "Ведущий церемонии": "Рәсім жүргізушісі", "Видеограф": "Бейнеоператор", "Декоратор": "Безендіруші", "Загородная площадка": "Қала сыртындағы алаң", "Инструменталист": "Аспапшы", "Лайв-бэнд": "Жанды музыка тобы", "Национальный ансамбль": "Ұлттық ансамбль", "Отель": "Қонақ үй", "Подарки и сувениры": "Сыйлықтар мен кәдесыйлар", "Ресторан": "Мейрамхана", "Танцевальный коллектив": "Би тобы", "Флорист": "Флорист", "Фото и видеобудки": "Фото және бейне кабиналары", "Фотограф": "Фотограф", "Шоу-программа": "Шоу-бағдарлама",
  },
  en: {
    "Алматы": "Almaty", "Астана": "Astana", "Зарубежье": "International",
    "день рождения": "Birthday", "конференция": "Conference", "корпоратив": "Corporate event", "свадьба": "Wedding", "той": "Traditional celebration", "юбилей": "Anniversary",
    "Банкетный зал": "Banquet hall", "Ведущий": "Event host", "Ведущий церемонии": "Ceremony host", "Видеограф": "Videographer", "Декоратор": "Event decorator", "Загородная площадка": "Country venue", "Инструменталист": "Instrumentalist", "Лайв-бэнд": "Live band", "Национальный ансамбль": "Traditional ensemble", "Отель": "Hotel", "Подарки и сувениры": "Gifts and souvenirs", "Ресторан": "Restaurant", "Танцевальный коллектив": "Dance group", "Флорист": "Florist", "Фото и видеобудки": "Photo and video booths", "Фотограф": "Photographer", "Шоу-программа": "Show program",
  },
};

const form = document.querySelector("#searchForm");
const cardsTrack = document.querySelector("#cardsTrack");
const resultState = document.querySelector("#resultState");
const resultsPanel = document.querySelector(".results-panel");
const resultsTitle = document.querySelector("#resultsTitle");
const resultsSubtitle = document.querySelector("#resultsSubtitle");
const sortSelect = document.querySelector("#sortSelect");
const budgetInput = document.querySelector("#budget");
const budgetPreview = document.querySelector("#budgetPreview");
const submitButton = form.querySelector("button[type='submit']");

const imagePools = {
  "Ведущий": ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=84"],
  "Ведущий церемонии": ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=84"],
  "Фотограф": ["https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=84"],
  "Видеограф": ["https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=84"],
  "Флорист": ["https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=84"],
  "Декоратор": ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=84"],
  "Банкетный зал": ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=84"],
  music: ["https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=84"],
  default: ["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=84", "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=84"],
};

let metadata = null;
let lastRequest = null;

function savedLocale() {
  try {
    const saved = localStorage.getItem("sovpalo-locale");
    if (["ru", "kk", "en"].includes(saved)) return saved;
  } catch {
    // Private browsing may deny storage access.
  }
  const browserLocale = navigator.language?.toLowerCase() || "ru";
  if (browserLocale.startsWith("kk")) return "kk";
  if (browserLocale.startsWith("en")) return "en";
  return "ru";
}

let currentLocale = savedLocale();

function t(key, variables = {}) {
  const value = translations[currentLocale][key] ?? translations.ru[key] ?? key;
  return typeof value === "function" ? value(variables) : value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(value) {
  const locales = { ru: "ru-RU", kk: "kk-KZ", en: "en-US" };
  return new Intl.NumberFormat(locales[currentLocale]).format(Number(value) || 0);
}

function optionLabel(value) {
  if (currentLocale === "ru") {
    return value ? value[0].toLocaleUpperCase("ru-RU") + value.slice(1) : "";
  }
  return optionLabels[currentLocale]?.[value] || value;
}

function hash(value) {
  return [...String(value)].reduce((total, char) => total + char.charCodeAt(0), 0);
}

function imageFor(item) {
  const category = item.category_key || item.category;
  const musicCategories = ["Инструменталист", "Лайв-бэнд", "Национальный ансамбль", "Шоу-программа", "Танцевальный коллектив"];
  const venueCategories = ["Ресторан", "Отель", "Загородная площадка"];
  let key = category;
  if (musicCategories.includes(category)) key = "music";
  if (venueCategories.includes(category)) key = "Банкетный зал";
  const pool = imagePools[key] || imagePools.default;
  return pool[hash(item.id) % pool.length];
}

function applyTranslations() {
  document.documentElement.lang = currentLocale;
  document.title = t("documentTitle");
  document.querySelector('meta[name="description"]').content = t("metaDescription");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-locale]").forEach((button) => {
    const active = button.dataset.locale === currentLocale;
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("is-active", active);
  });
  budgetPreview.textContent = budgetInput.value ? `${formatMoney(budgetInput.value)} ₸` : t("enterAmount");
}

function populateSelect(selector, options, preferred) {
  const select = document.querySelector(selector);
  const previous = select.value;
  select.innerHTML = options
    .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(optionLabel(value))}</option>`)
    .join("");
  const nextValue = options.includes(previous) ? previous : preferred;
  if (options.includes(nextValue)) select.value = nextValue;
}

function populateMetadata(preferred = {}) {
  if (!metadata) return;
  populateSelect("#city", metadata.cities, preferred.city || "Алматы");
  populateSelect("#eventType", metadata.event_types, preferred.eventType || "свадьба");
  populateSelect("#category", metadata.categories, preferred.category || "Ведущий");
}

function setDatasetStatus(count) {
  document.querySelector("#datasetStatus").textContent = t("datasetConnected", { count });
  document.querySelector("#headerDatasetStatus").textContent = t("catalogCount", { count });
}

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) {
    let message = t("apiError", { status: response.status });
    try {
      const payload = await response.json();
      message = payload.detail?.[0]?.msg || payload.detail || message;
    } catch {
      // Keep the localized HTTP error when the backend did not return JSON.
    }
    throw new Error(message);
  }
  return response.json();
}

function formPayload() {
  const data = new FormData(form);
  const duration = String(data.get("duration") || "").trim();
  const language = String(data.get("language") || "").trim();
  return {
    city: data.get("city"),
    date: data.get("date"),
    event_type: data.get("event_type"),
    category: data.get("category"),
    budget: Number(data.get("budget")),
    duration: duration ? Number(duration) : null,
    language: language || null,
    locale: currentLocale,
    sort: sortSelect.value,
  };
}

function setLoading(loading) {
  resultsPanel.setAttribute("aria-busy", String(loading));
  submitButton.disabled = loading;
  submitButton.querySelector("span").textContent = loading ? t("searching") : t("submit");
  if (!loading) return;

  resultState.hidden = true;
  cardsTrack.hidden = false;
  cardsTrack.innerHTML = [0, 1]
    .map(() => `
      <div class="skeleton-card" aria-hidden="true">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div><div class="skeleton-line"></div>
          <div class="skeleton-line"></div><div class="skeleton-line"></div>
        </div>
      </div>`)
    .join("");
}

function renderState(title, message, icon = "i") {
  cardsTrack.hidden = true;
  cardsTrack.innerHTML = "";
  resultState.hidden = false;
  resultState.innerHTML = `
    <div class="state-content">
      <span class="state-icon" aria-hidden="true">${escapeHtml(icon)}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(message)}</p>
    </div>`;
}

function renderCard(item) {
  const languages = item.languages.map((language) => `<span>${escapeHtml(language)}</span>`).join("");
  const tags = item.match_tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const synthetic = item.synthetic
    ? `<span class="synthetic-badge" title="${escapeHtml(t("demoTitle"))}">${escapeHtml(t("demoProfile"))}</span>`
    : "";
  const priceNote = item.price_imputed ? t("estimatedPrice") : t("priceFrom");
  const rank = String(item.rank).padStart(2, "0");

  return `
    <article class="contractor-card" data-card-index="${item.rank - 1}">
      <div class="card-image">
        <img src="${imageFor(item)}" alt="${escapeHtml(item.category)} — ${escapeHtml(item.name)}" loading="lazy" referrerpolicy="no-referrer" />
        <span class="card-rank">${escapeHtml(t("matchBadge", { rank }))}</span>${synthetic}
      </div>
      <div class="card-body">
        <div class="card-heading">
          <h3>${escapeHtml(item.name)}</h3>
          <div class="card-price"><small>${escapeHtml(priceNote)}</small> ${formatMoney(item.price)} ₸</div>
        </div>
        <div class="card-meta">
          <span>${escapeHtml(item.city)}</span><span class="meta-separator" aria-hidden="true"></span>
          <span>${escapeHtml(item.category)}</span>
          ${item.max_hours ? `<span class="meta-separator" aria-hidden="true"></span><span>${escapeHtml(t("maxHours", { hours: item.max_hours }))}</span>` : ""}
        </div>
        <div class="language-tags" aria-label="${escapeHtml(t("languagesAria"))}">${languages}</div>
        <p class="card-description">${escapeHtml(item.description)}</p>
        <div class="why-box"><span class="why-icon" aria-hidden="true">i</span><div>
          <strong>${escapeHtml(t("why"))}</strong><p>${escapeHtml(item.explanation)}</p>
        </div></div>
        <div class="match-tags" aria-label="${escapeHtml(t("tagsAria"))}">${tags}</div>
      </div>
    </article>`;
}

function rejectionDetails(reasons = {}) {
  return Object.entries(reasons)
    .filter(([key, count]) => translations[currentLocale][`rejection_${key}`] && count > 0)
    .map(([key, count]) => `${count} — ${t(`rejection_${key}`)}`)
    .join("; ");
}

function renderEmptyCard(payload) {
  const details = rejectionDetails(payload.rejection_reasons);
  const outcomes = {
    MATCHED: {
      label: t("emptyMatchedLabel"), title: t("emptyMatchedTitle"),
      message: details ? t("emptyMatchedReasons", { details }) : t("emptyMatchedMessage"),
      tone: "matched", icon: "✓",
    },
    CATEGORY_NOT_FOUND: {
      label: t("emptyCategoryLabel"), title: t("emptyCategoryTitle"), message: payload.message,
      tone: "not-found", icon: "—",
    },
    NO_MATCH: {
      label: t("emptyRejectedLabel"), title: t("emptyRejectedTitle"), message: payload.message,
      tone: "rejected", icon: "×",
    },
  };
  const outcome = outcomes[payload.status] || outcomes.NO_MATCH;
  return `
    <article class="empty-result-card empty-result-card--${outcome.tone}">
      <div class="empty-result-icon" aria-hidden="true">${outcome.icon}</div>
      <span class="outcome-label">${escapeHtml(outcome.label)}</span>
      <h3>${escapeHtml(outcome.title)}</h3><p>${escapeHtml(outcome.message)}</p>
    </article>`;
}

function renderResults(payload) {
  const currentItems = payload.items || [];
  const outcomeTitles = {
    MATCHED: t("outcomeMatchedTitle"),
    CATEGORY_NOT_FOUND: t("outcomeCategoryTitle"),
    NO_MATCH: t("outcomeNoMatchTitle"),
  };
  resultsTitle.textContent = outcomeTitles[payload.status] || t("resultFallbackTitle");
  resultsSubtitle.textContent = payload.message;
  resultState.hidden = true;
  cardsTrack.hidden = false;
  const cards = currentItems.map(renderCard);
  if (currentItems.length < 3) cards.push(renderEmptyCard(payload));
  cardsTrack.innerHTML = cards.join("");
  cardsTrack.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      if (!image.src.endsWith("/assets/event-fallback.svg")) image.src = "/assets/event-fallback.svg";
    });
  });
}

async function submitSearch() {
  if (!form.reportValidity()) return;
  lastRequest = formPayload();
  setLoading(true);
  try {
    const payload = await fetchJson("/recommendations", { method: "POST", body: JSON.stringify(lastRequest) });
    renderResults(payload);
  } catch (error) {
    resultsSubtitle.textContent = t("requestFailed");
    renderState(t("backendTitle"), t("backendMessage", { error: error.message }), "!");
  } finally {
    setLoading(false);
  }
}

async function setLocale(locale) {
  if (!["ru", "kk", "en"].includes(locale) || locale === currentLocale) return;
  currentLocale = locale;
  try { localStorage.setItem("sovpalo-locale", locale); } catch { /* Storage is optional. */ }
  applyTranslations();
  populateMetadata();
  if (metadata) setDatasetStatus(metadata.contractor_count);
  if (lastRequest) await submitSearch();
}

async function init() {
  applyTranslations();
  document.querySelector("#date").value = "2026-10-18";
  try {
    metadata = await fetchJson("/meta");
    populateMetadata({ city: "Алматы", eventType: "свадьба", category: "Ведущий" });
    setDatasetStatus(metadata.contractor_count);
    await submitSearch();
  } catch (error) {
    document.querySelector("#datasetStatus").textContent = t("noDataset");
    document.querySelector("#headerDatasetStatus").textContent = t("apiUnavailable");
    renderState(t("connectBackend"), t("connectBackendMessage", { error: error.message }), "!");
  }
}

form.addEventListener("submit", (event) => { event.preventDefault(); submitSearch(); });
sortSelect.addEventListener("change", () => { if (lastRequest) submitSearch(); });
budgetInput.addEventListener("input", () => {
  budgetPreview.textContent = budgetInput.value ? `${formatMoney(budgetInput.value)} ₸` : t("enterAmount");
});
document.querySelectorAll("[data-locale]").forEach((button) => {
  button.addEventListener("click", () => setLocale(button.dataset.locale));
});

init();
