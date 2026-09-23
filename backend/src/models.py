from __future__ import annotations

from datetime import date
from typing import Literal

from pydantic import BaseModel, Field, field_validator


class RecommendationRequest(BaseModel):
    city: str = Field(min_length=1, max_length=80)
    date: date
    event_type: str = Field(min_length=1, max_length=80)
    category: str = Field(min_length=1, max_length=120)
    budget: int = Field(gt=0, le=100_000_000)
    duration: int | None = Field(default=None, ge=1, le=48)
    language: Literal["ru", "kk", "en"] | None = None
    sort: Literal["relevance", "price_asc", "price_desc"] = "relevance"

    @field_validator("city", "event_type", "category")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()
