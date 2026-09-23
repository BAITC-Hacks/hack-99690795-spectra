# Совпало

Готовый сервис подбора event-подрядчиков: пользователь задаёт параметры события и получает до трёх карточек с конкретным объяснением каждого совпадения.

Frontend и backend полностью разделены и общаются только через REST API.

## Что реализовано

- параметры города, типа события и категории загружаются из backend;
- строгая фильтрация по городу, категории, дате, бюджету, формату, языку и длительности;
- детерминированный скоринг со стабильным порядком результатов;
- сортировка по релевантности, возрастанию и убыванию цены;
- максимум три карточки с фото, ценой, языками, описанием и причиной совпадения;
- понятные состояния `MATCHED`, `CATEGORY_NOT_FOUND` и `NO_MATCH`;
- синтетические профили явно отмечаются;
- OpenAI используется только для текста объяснения и не влияет на фильтрацию или порядок;
- если OpenAI выключен или недоступен, backend возвращает локальное фактологическое объяснение;
- адаптивная вёрстка для desktop, tablet и mobile.

## Структура

```text
backend/src/
  config.py             настройки окружения
  repository.py         загрузка CSV
  recommendations.py    фильтрация и скоринг
  explanations.py       OpenAI + локальный fallback
  models.py             входной REST-контракт
  main.py               FastAPI endpoints

frontend/
  index.html
  styles.css
  app.js
  server.mjs             независимый статический сервер
```

## Запуск backend

Требуются Python 3.13+ и `uv`.

```bash
cp backend/.env.example backend/.env
uv sync
uv run python main.py
```

API будет доступен на `http://localhost:8000`, интерактивная документация — на `http://localhost:8000/docs`.

Чтобы включить генерацию объяснений через OpenAI, задайте в `backend/.env`:

```dotenv
OPENAI_ENABLED=true
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4.1-mini
```

Ключ из корневого `.env` также поддерживается для совместимости.

## Запуск frontend

Frontend не требует npm-зависимостей, достаточно Node.js 20+.

```bash
cp frontend/.env.example frontend/.env
cd frontend
npm run dev
```

Откройте `http://localhost:5173`. Адрес REST API настраивается через `API_URL` в `frontend/.env`.

## REST API

| Метод | Путь | Назначение |
| --- | --- | --- |
| `GET` | `/api/health` | состояние сервиса и режим объяснений |
| `GET` | `/api/meta` | города, категории, типы мероприятий и языки |
| `POST` | `/api/recommendations` | подбор до трёх подрядчиков |

Пример запроса:

```json
{
  "city": "Алматы",
  "date": "2026-10-18",
  "event_type": "свадьба",
  "category": "Ведущий",
  "budget": 1200000,
  "duration": 6,
  "language": "ru",
  "sort": "relevance"
}
```

Датасет читается из `dataset/dataset.csv`; путь можно заменить через `DATASET_PATH`.
