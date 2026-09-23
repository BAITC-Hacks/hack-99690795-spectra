from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .explanations import ExplanationService
from .models import RecommendationRequest
from .recommendations import RecommendationService
from .repository import ContractorRepository


repository = ContractorRepository(settings.dataset_path)
service = RecommendationService(repository, ExplanationService(settings))

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Детерминированный подбор event-подрядчиков с объяснениями.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.allowed_origins),
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


@app.get("/api/health")
def health() -> dict[str, object]:
    return {
        "status": "ok",
        "contractors": len(repository.contractors),
        "explanations": "openai" if service.explanations.client else "local",
    }


@app.get("/api/meta")
def metadata() -> dict[str, object]:
    return repository.metadata()


@app.post("/api/recommendations")
def recommendations(request: RecommendationRequest) -> dict[str, object]:
    return service.recommend(request)


@app.get("/")
def root() -> dict[str, str]:
    return {"service": settings.app_name, "docs": "/docs", "health": "/api/health"}
