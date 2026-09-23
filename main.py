"""Convenience entry point for the backend development server."""

import uvicorn

from backend.src.config import settings


def main() -> None:
    uvicorn.run(
        "backend.src.main:app",
        host=settings.app_host,
        port=settings.app_port,
        reload=True,
    )


if __name__ == "__main__":
    main()
