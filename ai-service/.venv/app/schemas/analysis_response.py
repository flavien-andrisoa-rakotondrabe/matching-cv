from pydantic import BaseModel

class AnalysisResponse(BaseModel):
    score: float
    matching_skills: list[str]
    missing_skills: list[str]
    recommendations: list[str]