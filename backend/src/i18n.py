from __future__ import annotations


LOCALE_NAMES = {"ru": "Русский", "kk": "Қазақша", "en": "English"}

CATEGORY_LABELS = {
    "ru": {},
    "kk": {
        "Банкетный зал": "Банкет залы",
        "Ведущий": "Жүргізуші",
        "Ведущий церемонии": "Рәсім жүргізушісі",
        "Видеограф": "Бейнеоператор",
        "Декоратор": "Безендіруші",
        "Загородная площадка": "Қала сыртындағы алаң",
        "Инструменталист": "Аспапшы",
        "Лайв-бэнд": "Жанды музыка тобы",
        "Национальный ансамбль": "Ұлттық ансамбль",
        "Отель": "Қонақ үй",
        "Подарки и сувениры": "Сыйлықтар мен кәдесыйлар",
        "Ресторан": "Мейрамхана",
        "Танцевальный коллектив": "Би тобы",
        "Флорист": "Флорист",
        "Фото и видеобудки": "Фото және бейне кабиналары",
        "Фотограф": "Фотограф",
        "Шоу-программа": "Шоу-бағдарлама",
    },
    "en": {
        "Банкетный зал": "Banquet hall",
        "Ведущий": "Event host",
        "Ведущий церемонии": "Ceremony host",
        "Видеограф": "Videographer",
        "Декоратор": "Event decorator",
        "Загородная площадка": "Country venue",
        "Инструменталист": "Instrumentalist",
        "Лайв-бэнд": "Live band",
        "Национальный ансамбль": "Traditional ensemble",
        "Отель": "Hotel",
        "Подарки и сувениры": "Gifts and souvenirs",
        "Ресторан": "Restaurant",
        "Танцевальный коллектив": "Dance group",
        "Флорист": "Florist",
        "Фото и видеобудки": "Photo and video booths",
        "Фотограф": "Photographer",
        "Шоу-программа": "Show program",
    },
}

EVENT_LABELS = {
    "ru": {},
    "kk": {
        "день рождения": "туған күн",
        "конференция": "конференция",
        "корпоратив": "корпоратив",
        "свадьба": "үйлену тойы",
        "той": "той",
        "юбилей": "мерейтой",
    },
    "en": {
        "день рождения": "birthday",
        "конференция": "conference",
        "корпоратив": "corporate event",
        "свадьба": "wedding",
        "той": "traditional celebration",
        "юбилей": "anniversary",
    },
}

CITY_LABELS = {
    "ru": {},
    "kk": {"Алматы": "Алматы", "Астана": "Астана", "Зарубежье": "Шетел"},
    "en": {"Алматы": "Almaty", "Астана": "Astana", "Зарубежье": "International"},
}

LANGUAGE_LABELS = {
    "ru": {"русский": "русский", "казахский": "казахский", "английский": "английский"},
    "kk": {"русский": "орыс", "казахский": "қазақ", "английский": "ағылшын"},
    "en": {"русский": "Russian", "казахский": "Kazakh", "английский": "English"},
}

MATCH_TAGS = {
    "ru": {"budget": "бюджет", "format": "формат", "language": "язык", "duration": "длительность"},
    "kk": {"budget": "бюджет", "format": "формат", "language": "тіл", "duration": "ұзақтығы"},
    "en": {"budget": "budget", "format": "format", "language": "language", "duration": "duration"},
}


def label(value: str, locale: str, labels: dict[str, dict[str, str]]) -> str:
    return labels.get(locale, {}).get(value, value)


def category_label(value: str, locale: str) -> str:
    return label(value, locale, CATEGORY_LABELS)


def event_label(value: str, locale: str) -> str:
    return label(value, locale, EVENT_LABELS)


def city_label(value: str, locale: str) -> str:
    return label(value, locale, CITY_LABELS)


def language_label(value: str, locale: str) -> str:
    return label(value, locale, LANGUAGE_LABELS)
