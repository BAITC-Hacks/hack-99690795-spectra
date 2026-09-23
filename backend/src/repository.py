from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path


def _split(value: str) -> tuple[str, ...]:
    return tuple(part.strip() for part in value.split("|") if part.strip())


def _bool(value: str) -> bool:
    return value.strip().lower() == "true"


@dataclass(frozen=True, slots=True)
class Contractor:
    id: str
    name: str
    categories: tuple[str, ...]
    city: str
    synthetic: bool
    price: int
    price_imputed: bool
    event_formats: tuple[str, ...]
    languages: tuple[str, ...]
    max_hours: int | None
    busy_dates: frozenset[str]
    description: str


class ContractorRepository:
    def __init__(self, dataset_path: Path) -> None:
        self.dataset_path = dataset_path
        self._contractors = self._load()

    def _load(self) -> tuple[Contractor, ...]:
        if not self.dataset_path.exists():
            raise FileNotFoundError(f"Dataset not found: {self.dataset_path}")

        with self.dataset_path.open(encoding="utf-8-sig", newline="") as source:
            rows = csv.DictReader(source)
            return tuple(
                Contractor(
                    id=row["id"],
                    name=row["anon_name"].strip(),
                    categories=_split(row["categories"]),
                    city=row["city"].strip(),
                    synthetic=_bool(row["synthetic"]),
                    price=int(row["price_from_kzt"]),
                    price_imputed=_bool(row["price_imputed"]),
                    event_formats=_split(row["event_formats"]),
                    languages=_split(row["languages"]),
                    max_hours=int(row["max_hours"]) if row["max_hours"].strip() else None,
                    busy_dates=frozenset(_split(row["busy_dates"])),
                    description=row["description"].strip(),
                )
                for row in rows
            )

    @property
    def contractors(self) -> tuple[Contractor, ...]:
        return self._contractors

    def metadata(self) -> dict[str, object]:
        contractors = self._contractors
        return {
            "cities": sorted({item.city for item in contractors}),
            "categories": sorted(
                {category for item in contractors for category in item.categories}
            ),
            "event_types": sorted(
                {event_type for item in contractors for event_type in item.event_formats}
            ),
            "languages": [
                {"value": "ru", "label": "Русский", "short": "RU"},
                {"value": "kk", "label": "Қазақша", "short": "KZ"},
                {"value": "en", "label": "English", "short": "EN"},
            ],
            "contractor_count": len(contractors),
        }
