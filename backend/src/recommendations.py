from __future__ import annotations

from collections import Counter

from .explanations import ExplanationService
from .i18n import (
    MATCH_TAGS,
    category_label,
    city_label,
    event_label,
    language_label,
)
from .models import RecommendationRequest
from .repository import Contractor, ContractorRepository


LANGUAGE_MAP = {"ru": "русский", "kk": "казахский", "en": "английский"}
LANGUAGE_SHORT = {"русский": "RU", "казахский": "KZ", "английский": "EN"}

REJECTION_LABELS = {
    "ru": {
        "busy": "заняты в эту дату",
        "over_budget": "выше бюджета",
        "wrong_format": "не работают с этим форматом",
        "wrong_language": "не поддерживают выбранный язык",
        "duration": "не подходят по длительности",
    },
    "kk": {
        "busy": "бұл күні бос емес",
        "over_budget": "бюджеттен жоғары",
        "wrong_format": "бұл форматта жұмыс істемейді",
        "wrong_language": "таңдалған тілді қолдамайды",
        "duration": "ұзақтығы бойынша сәйкес келмейді",
    },
    "en": {
        "busy": "are unavailable on this date",
        "over_budget": "are over budget",
        "wrong_format": "do not support this event format",
        "wrong_language": "do not support the selected language",
        "duration": "do not match the requested duration",
    },
}


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
                "message": self._category_not_found_message(request),
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
        message = self._matched_message(request.locale, len(items))
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
        tag_labels = MATCH_TAGS[request.locale]
        tags = [tag_labels["budget"], tag_labels["format"]]
        if request.language:
            tags.append(tag_labels["language"])
        if request.duration:
            tags.append(tag_labels["duration"])
        return {
            "id": item.id,
            "rank": rank,
            "name": item.name,
            "category": category_label(request.category, request.locale),
            "category_key": request.category,
            "categories": [category_label(value, request.locale) for value in item.categories],
            "city": city_label(item.city, request.locale),
            "price": item.price,
            "price_imputed": item.price_imputed,
            "languages": [LANGUAGE_SHORT.get(lang.casefold(), lang) for lang in item.languages],
            "max_hours": item.max_hours,
            "description": self._localized_description(request, item),
            "explanation": explanation,
            "match_tags": tags,
            "synthetic": item.synthetic,
            "score": self._score(request, item),
        }

    @staticmethod
    def _category_not_found_message(request: RecommendationRequest) -> str:
        city = city_label(request.city, request.locale)
        category = category_label(request.category, request.locale)
        if request.locale == "en":
            return (
                f"There are no {category.lower()} contractors in {city} yet. "
                "Try another city or category."
            )
        if request.locale == "kk":
            return (
                f"«{city}» қаласында «{category}» санатындағы мердігерлер әзірге жоқ. "
                "Басқа қала немесе санатты қолданып көріңіз."
            )
        return (
            f"В городе {city} пока нет подрядчиков категории «{category}». "
            "Попробуйте другой город или категорию."
        )

    @staticmethod
    def _matched_message(locale: str, count: int) -> str:
        if locale == "en":
            return f"Found {count} exact matches" if count == 3 else f"These are all {count} matching options"
        if locale == "kk":
            return f"{count} нақты сәйкестік табылды" if count == 3 else f"Барлық сәйкес нұсқа табылды — {count}"
        return f"Нашли {count} точных совпадения" if count == 3 else f"Это все подходящие варианты — найдено {count}"

    @staticmethod
    def _localized_description(
        request: RecommendationRequest,
        item: Contractor,
    ) -> str:
        if request.locale == "ru":
            return item.description

        formats = ", ".join(event_label(value, request.locale) for value in item.event_formats)
        languages = ", ".join(language_label(value, request.locale) for value in item.languages)
        city = city_label(item.city, request.locale)
        if request.locale == "en":
            duration = f" Available for events up to {item.max_hours} hours." if item.max_hours else ""
            return (
                f"{item.name} provides event services in {city} for {formats}. "
                f"Working languages: {languages}.{duration}"
            )
        duration = f" Іс-шараның ұзақтығы {item.max_hours} сағатқа дейін." if item.max_hours else ""
        return (
            f"{item.name} {city} қаласында мына форматтарда қызмет көрсетеді: {formats}. "
            f"Қызмет көрсету тілдері: {languages}.{duration}"
        )

    @staticmethod
    def _no_match_message(
        request: RecommendationRequest,
        pool: list[Contractor],
        reasons: Counter[str],
    ) -> str:
        labels = REJECTION_LABELS[request.locale]
        details = [
            f"{count} {labels[key]}"
            for key, count in reasons.most_common()
            if count and key in labels
        ]
        suffix = "; ".join(details[:3])
        city = city_label(request.city, request.locale)
        category = category_label(request.category, request.locale)
        if request.locale == "en":
            return (
                f"There are {len(pool)} {category.lower()} contractors in {city}, "
                f"but none match all conditions: {suffix}."
            )
        if request.locale == "kk":
            return (
                f"«{city}» қаласында «{category}» санатындағы {len(pool)} мердігер бар, "
                f"бірақ қазір ешқайсысы барлық шартқа сай емес: {suffix}."
            )
        return (
            f"В городе {city} найдено {len(pool)} подрядчиков категории "
            f"«{category}», но сейчас ни один не подходит: {suffix}."
        )
