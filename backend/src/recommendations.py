from __future__ import annotations

from collections import Counter

from .explanations import ExplanationService
from .models import RecommendationRequest
from .repository import Contractor, ContractorRepository


LANGUAGE_MAP = {"ru": "русский", "kk": "казахский", "en": "английский"}
LANGUAGE_SHORT = {"русский": "RU", "казахский": "KZ", "английский": "EN"}


class RecommendationService:
    def __init__(
        self,
        repository: ContractorRepository,
        explanations: ExplanationService,
    ) -> None:
        self.repository = repository
        self.explanations = explanations

    def recommend(self, request: RecommendationRequest) -> dict[str, object]:
        category_pool = [
            item
            for item in self.repository.contractors
            if item.city.casefold() == request.city.casefold()
            and request.category.casefold() in {value.casefold() for value in item.categories}
        ]

        if not category_pool:
            return {
                "status": "CATEGORY_NOT_FOUND",
                "message": (
                    f"В городе {request.city} пока нет подрядчиков категории "
                    f"«{request.category}». Попробуйте другой город или категорию."
                ),
                "items": [],
                "total": 0,
                "rejection_reasons": {},
            }

        reasons: Counter[str] = Counter()
        eligible: list[Contractor] = []
        requested_language = LANGUAGE_MAP.get(request.language) if request.language else None
        requested_date = request.date.isoformat()

        for item in category_pool:
            rejected = False
            if requested_date in item.busy_dates:
                reasons["busy"] += 1
                rejected = True
            if item.price > request.budget:
                reasons["over_budget"] += 1
                rejected = True
            if request.event_type.casefold() not in {
                value.casefold() for value in item.event_formats
            }:
                reasons["wrong_format"] += 1
                rejected = True
            if requested_language and requested_language.casefold() not in {
                value.casefold() for value in item.languages
            }:
                reasons["wrong_language"] += 1
                rejected = True
            if request.duration and item.max_hours and request.duration > item.max_hours:
                reasons["duration"] += 1
                rejected = True
            if not rejected:
                eligible.append(item)

        if not eligible:
            return {
                "status": "NO_MATCH",
                "message": self._no_match_message(request, category_pool, reasons),
                "items": [],
                "total": 0,
                "rejection_reasons": dict(reasons),
            }

        ranked = sorted(
            eligible,
            key=lambda item: (-self._score(request, item), item.id),
        )
        if request.sort == "price_asc":
            ranked.sort(key=lambda item: (item.price, item.id))
        elif request.sort == "price_desc":
            ranked.sort(key=lambda item: (-item.price, item.id))

        selected = ranked[:3]
        explanations = self.explanations.explain(request, selected)
        items = [
            self._serialize(request, item, explanations[item.id], position + 1)
            for position, item in enumerate(selected)
        ]
        hidden_count = max(0, len(eligible) - len(selected))
        message = (
            f"Нашли {len(items)} точных совпадения"
            if len(items) == 3
            else f"Это все подходящие варианты — найдено {len(items)}"
        )
        return {
            "status": "MATCHED",
            "message": message,
            "items": items,
            "total": len(eligible),
            "hidden_count": hidden_count,
            "rejection_reasons": dict(reasons),
        }

    @staticmethod
    def _score(request: RecommendationRequest, item: Contractor) -> float:
        budget_match = min(item.price / request.budget, 1.0)
        language_match = 1.0 if request.language else 0.65
        duration_match = 1.0 if request.duration else 0.65
        description = item.description.casefold()
        context_terms = [request.event_type.casefold(), request.category.casefold()]
        text_match = sum(term in description for term in context_terms) / len(context_terms)
        return round(
            0.30 + budget_match * 0.25 + language_match * 0.20
            + duration_match * 0.15 + text_match * 0.10,
            4,
        )

    def _serialize(
        self,
        request: RecommendationRequest,
        item: Contractor,
        explanation: str,
        rank: int,
    ) -> dict[str, object]:
        tags = ["бюджет", "формат"]
        if request.language:
            tags.append("язык")
        if request.duration:
            tags.append("длительность")
        return {
            "id": item.id,
            "rank": rank,
            "name": item.name,
            "category": request.category,
            "categories": item.categories,
            "city": item.city,
            "price": item.price,
            "price_imputed": item.price_imputed,
            "languages": [LANGUAGE_SHORT.get(lang.casefold(), lang) for lang in item.languages],
            "max_hours": item.max_hours,
            "description": item.description,
            "explanation": explanation,
            "match_tags": tags,
            "synthetic": item.synthetic,
            "score": self._score(request, item),
        }

    @staticmethod
    def _no_match_message(
        request: RecommendationRequest,
        pool: list[Contractor],
        reasons: Counter[str],
    ) -> str:
        labels = {
            "busy": "заняты в эту дату",
            "over_budget": "выше бюджета",
            "wrong_format": "не работают с этим форматом",
            "wrong_language": "не поддерживают выбранный язык",
            "duration": "не подходят по длительности",
        }
        details = [
            f"{count} {labels[key]}"
            for key, count in reasons.most_common()
            if count and key in labels
        ]
        suffix = "; ".join(details[:3])
        return (
            f"В городе {request.city} найдено {len(pool)} подрядчиков категории "
            f"«{request.category}», но сейчас ни один не подходит: {suffix}."
        )
