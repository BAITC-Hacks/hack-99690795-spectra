from __future__ import annotations

import json
import logging
from typing import Any

from .config import Settings
from .models import RecommendationRequest
from .repository import Contractor


logger = logging.getLogger(__name__)

LANGUAGE_LABELS = {"ru": "русском", "kk": "казахском", "en": "английском"}


class ExplanationService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.client: Any | None = None
        if settings.openai_enabled and settings.openai_api_key:
            try:
                from openai import OpenAI

                self.client = OpenAI(
                    api_key=settings.openai_api_key,
                    timeout=settings.openai_timeout_seconds,
                    max_retries=1,
                )
            except Exception:
                logger.exception("OpenAI client could not be initialized; using local copy")

    def explain(
        self,
        request: RecommendationRequest,
        candidates: list[Contractor],
    ) -> dict[str, str]:
        local = {item.id: self._local_explanation(request, item) for item in candidates}
        if not self.client or not candidates:
            return local

        payload = {
            "request": {
                "city": request.city,
                "date": request.date.isoformat(),
                "event_type": request.event_type,
                "category": request.category,
                "budget_kzt": request.budget,
                "duration_hours": request.duration,
                "language": request.language,
            },
            "candidates": [
                {
                    "id": item.id,
                    "name": item.name,
                    "price_kzt": item.price,
                    "event_formats": item.event_formats,
                    "languages": item.languages,
                    "max_hours": item.max_hours,
                    "description": item.description,
                }
                for item in candidates
            ],
        }
        try:
            response = self.client.responses.create(
                model=self.settings.openai_model,
                instructions=(
                    "Ты редактор сервиса подбора event-подрядчиков. Верни только JSON-объект, "
                    "где ключ — id кандидата, значение — точное объяснение на русском в 1–2 "
                    "предложениях. Используй только факты из JSON. Обязательно назови конкретное "
                    "совпадение: формат, бюджет, язык, длительность или особенность описания. "
                    "Не ранжируй кандидатов и не используй общие рекламные фразы."
                ),
                input=json.dumps(payload, ensure_ascii=False),
            )
            generated = json.loads(response.output_text)
            for item in candidates:
                value = generated.get(item.id)
                if isinstance(value, str) and value.strip():
                    local[item.id] = value.strip()
        except Exception:
            logger.exception("OpenAI explanation failed; using deterministic local copy")
        return local

    @staticmethod
    def _local_explanation(
        request: RecommendationRequest,
        contractor: Contractor,
    ) -> str:
        reserve = request.budget - contractor.price
        if reserve > 0:
            budget_part = (
                f"Стоимость укладывается в бюджет с запасом {reserve:,.0f} ₸".replace(",", " ")
            )
        else:
            budget_part = "Стоимость точно соответствует указанному бюджету"

        matches: list[str] = [f"работает с форматом «{request.event_type}»"]
        if request.language:
            matches.append(f"проводит события на {LANGUAGE_LABELS[request.language]} языке")
        if request.duration and contractor.max_hours:
            matches.append(
                f"доступен на {request.duration} ч при лимите до {contractor.max_hours} ч"
            )

        return f"{budget_part}. {contractor.name} " + " и ".join(matches) + "."
