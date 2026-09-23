const API_URL = window.APP_CONFIG?.apiUrl || "http://localhost:8000/api";

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
  "Ведущий": [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=84",
  ],
  "Ведущий церемонии": [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=84",
  ],
  "Фотограф": [
    "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=84",
  ],
  "Видеограф": [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=84",
  ],
  "Флорист": [
    "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=84",
  ],
  "Декоратор": [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=84",
  ],
  "Банкетный зал": [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=84",
  ],
  music: [
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=84",
  ],
  default: [
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=84",
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=84",
  ],
};

let lastRequest = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(value) {
  return new Intl.NumberFormat("ru-RU").format(Number(value) || 0);
}

function titleCase(value) {
  if (!value) return "";
  return value[0].toLocaleUpperCase("ru-RU") + value.slice(1);
}

function hash(value) {
  return [...String(value)].reduce((total, char) => total + char.charCodeAt(0), 0);
}

function imageFor(item) {
  const musicCategories = ["Инструменталист", "Лайв-бэнд", "Национальный ансамбль", "Шоу-программа", "Танцевальный коллектив"];
  const venueCategories = ["Ресторан", "Отель", "Загородная площадка"];
  let key = item.category;
  if (musicCategories.includes(item.category)) key = "music";
  if (venueCategories.includes(item.category)) key = "Банкетный зал";
  const pool = imagePools[key] || imagePools.default;
  return pool[hash(item.id) % pool.length];
}

function populateSelect(selector, options, preferred) {
  const select = document.querySelector(selector);
  select.innerHTML = options
    .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(titleCase(value))}</option>`)
    .join("");
  if (options.includes(preferred)) select.value = preferred;
}

function setDatasetStatus(count) {
  const text = `Датасет подключён · ${count} профилей`;
  document.querySelector("#datasetStatus").textContent = text;
  document.querySelector("#headerDatasetStatus").textContent = `${count} профилей в каталоге`;
}

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) {
    let message = `Ошибка API: ${response.status}`;
    try {
      const payload = await response.json();
      message = payload.detail?.[0]?.msg || payload.detail || message;
    } catch {
      // Keep the HTTP status if the backend did not return JSON.
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
    sort: sortSelect.value,
  };
}

function setLoading(loading) {
  resultsPanel.setAttribute("aria-busy", String(loading));
  submitButton.disabled = loading;
  submitButton.querySelector("span").textContent = loading ? "Ищем совпадения…" : "Найти подрядчиков";
  if (!loading) return;

  resultState.hidden = true;
  cardsTrack.hidden = false;
  cardsTrack.innerHTML = [0, 1]
    .map(() => `
      <div class="skeleton-card" aria-hidden="true">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>
    `)
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
    </div>
  `;
}

function renderCard(item) {
  const languages = item.languages
    .map((language) => `<span>${escapeHtml(language)}</span>`)
    .join("");
  const tags = item.match_tags
    .map((tag) => `<span>${escapeHtml(tag)}</span>`)
    .join("");
  const synthetic = item.synthetic
    ? '<span class="synthetic-badge" title="Профиль добавлен для демонстрации">Демо-профиль</span>'
    : "";
  const priceNote = item.price_imputed ? "ориентир" : "от";

  return `
    <article class="contractor-card" data-card-index="${item.rank - 1}">
      <div class="card-image">
        <img src="${imageFor(item)}" alt="${escapeHtml(item.category)} — ${escapeHtml(item.name)}" loading="lazy" referrerpolicy="no-referrer" />
        <span class="card-rank">Совпадение ${String(item.rank).padStart(2, "0")}</span>
        ${synthetic}
      </div>
      <div class="card-body">
        <div class="card-heading">
          <h3>${escapeHtml(item.name)}</h3>
          <div class="card-price"><small>${priceNote}</small> ${formatMoney(item.price)} ₸</div>
        </div>
        <div class="card-meta">
          <span>${escapeHtml(item.city)}</span>
          <span class="meta-separator" aria-hidden="true"></span>
          <span>${escapeHtml(item.category)}</span>
          ${item.max_hours ? `<span class="meta-separator" aria-hidden="true"></span><span>до ${item.max_hours} ч</span>` : ""}
        </div>
        <div class="language-tags" aria-label="Языки">${languages}</div>
        <p class="card-description">${escapeHtml(item.description)}</p>
        <div class="why-box">
          <span class="why-icon" aria-hidden="true">i</span>
          <div>
            <strong>Почему в результате</strong>
            <p>${escapeHtml(item.explanation)}</p>
          </div>
        </div>
        <div class="match-tags" aria-label="Совпавшие параметры">${tags}</div>
      </div>
    </article>
  `;
}

const rejectionLabels = {
  busy: "заняты в выбранную дату",
  over_budget: "не укладываются в бюджет",
  wrong_format: "не берут выбранный формат",
  wrong_language: "не работают на выбранном языке",
  duration: "не подходят по длительности",
};

function rejectionDetails(reasons = {}) {
  return Object.entries(reasons)
    .filter(([key, count]) => rejectionLabels[key] && count > 0)
    .map(([key, count]) => `${count} — ${rejectionLabels[key]}`)
    .join("; ");
}

function renderEmptyCard(payload) {
  const details = rejectionDetails(payload.rejection_reasons);
  const outcomes = {
    MATCHED: {
      label: "Подобрали",
      title: "Больше точных совпадений нет",
      message: details
        ? `Остальные кандидаты не прошли условия: ${details}.`
        : "Это все подрядчики в городе и категории, которые проходят заданные условия.",
      tone: "matched",
      icon: "✓",
    },
    CATEGORY_NOT_FOUND: {
      label: "В городе нет категории",
      title: "Подрядчиков этой категории здесь нет",
      message: payload.message,
      tone: "not-found",
      icon: "—",
    },
    NO_MATCH: {
      label: "Кандидаты есть, но не подходят",
      title: "Ни один кандидат не прошёл условия",
      message: payload.message,
      tone: "rejected",
      icon: "×",
    },
  };
  const outcome = outcomes[payload.status] || outcomes.NO_MATCH;

  return `
    <article class="empty-result-card empty-result-card--${outcome.tone}">
      <div class="empty-result-icon" aria-hidden="true">${outcome.icon}</div>
      <span class="outcome-label">${escapeHtml(outcome.label)}</span>
      <h3>${escapeHtml(outcome.title)}</h3>
      <p>${escapeHtml(outcome.message)}</p>
    </article>
  `;
}

function renderResults(payload) {
  const currentItems = payload.items || [];
  const outcomeTitles = {
    MATCHED: "Подобрали",
    CATEGORY_NOT_FOUND: "В этом городе такой категории нет",
    NO_MATCH: "Кандидаты есть, но ни один не подходит",
  };
  resultsTitle.textContent = outcomeTitles[payload.status] || "Результат подбора";
  resultsSubtitle.textContent = payload.message;

  resultState.hidden = true;
  cardsTrack.hidden = false;
  const cards = currentItems.map(renderCard);
  if (currentItems.length < 3) cards.push(renderEmptyCard(payload));
  cardsTrack.innerHTML = cards.join("");

  cardsTrack.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      if (!image.src.endsWith("/assets/event-fallback.svg")) {
        image.src = "/assets/event-fallback.svg";
      }
    });
  });

}

async function submitSearch() {
  if (!form.reportValidity()) return;
  lastRequest = formPayload();
  setLoading(true);
  try {
    const payload = await fetchJson("/recommendations", {
      method: "POST",
      body: JSON.stringify(lastRequest),
    });
    renderResults(payload);
  } catch (error) {
    resultsSubtitle.textContent = "Не удалось получить подборку";
    renderState(
      "Backend не отвечает",
      `Проверьте, что API запущен по адресу ${API_URL}. ${error.message}`,
      "!",
    );
  } finally {
    setLoading(false);
  }
}

async function init() {
  document.querySelector("#date").value = "2026-10-18";
  budgetPreview.textContent = `${formatMoney(budgetInput.value)} ₸`;
  try {
    const metadata = await fetchJson("/meta");
    populateSelect("#city", metadata.cities, "Алматы");
    populateSelect("#eventType", metadata.event_types, "свадьба");
    populateSelect("#category", metadata.categories, "Ведущий");
    setDatasetStatus(metadata.contractor_count);
    await submitSearch();
  } catch (error) {
    document.querySelector("#datasetStatus").textContent = "Нет связи с датасетом";
    document.querySelector("#headerDatasetStatus").textContent = "API недоступен";
    renderState(
      "Подключите backend",
      `Запустите REST API и обновите страницу. Ожидаемый адрес: ${API_URL}. ${error.message}`,
      "!",
    );
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitSearch();
});

sortSelect.addEventListener("change", () => {
  if (lastRequest) submitSearch();
});

budgetInput.addEventListener("input", () => {
  budgetPreview.textContent = budgetInput.value ? `${formatMoney(budgetInput.value)} ₸` : "Введите сумму";
});

init();
