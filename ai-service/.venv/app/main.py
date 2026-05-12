from fastapi import FastAPI
from app.api.routes.analysis import router as analysis_router

app = FastAPI(
    title="CV Matching AI Service",
    version="1.0.0",
)

app.include_router(
    analysis_router,
    prefix="/api",
)