from fastapi import APIRouter, File, Form, UploadFile

from app.services.parser import extract_text_from_file
from app.services.embedding import EmbeddingService
from app.services.matching import MatchingService
from app.models.response import AnalysisResponse

router = APIRouter()


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    # --------------------------------------------------
    # READ FILE
    # --------------------------------------------------
    content = await file.read()

    # --------------------------------------------------
    # EXTRACT TEXT (CV)
    # --------------------------------------------------
    cv_text = extract_text_from_file(file.filename, content)

    # --------------------------------------------------
    # EMBEDDINGS
    # --------------------------------------------------
    cv_vec = EmbeddingService.encode(cv_text)
    job_vec = EmbeddingService.encode(job_description)

    # --------------------------------------------------
    # MATCHING SCORE
    # --------------------------------------------------
    score = MatchingService.calculate_similarity(cv_vec, job_vec)

    # --------------------------------------------------
    # SIMPLE SKILLS DETECTION (baseline NLP)
    # --------------------------------------------------
    skills_pool = ["React", "Laravel", "Node", "Docker", "AWS"]

    matching_skills = [
        skill for skill in skills_pool
        if skill.lower() in cv_text.lower()
    ]

    missing_skills = [
        skill for skill in skills_pool
        if skill not in matching_skills
    ]

    # --------------------------------------------------
    # RECOMMENDATIONS (simple rules for now)
    # --------------------------------------------------
    recommendations = []

    if "docker" not in cv_text.lower():
        recommendations.append("Learn Docker for deployment skills")

    if score < 60:
        recommendations.append("Improve alignment with job requirements")

    if "aws" not in cv_text.lower():
        recommendations.append("Gain cloud experience (AWS or similar)")

    # --------------------------------------------------
    # RESPONSE (STRICT MODEL)
    # --------------------------------------------------
    return AnalysisResponse(
        score=score,
        matching_skills=matching_skills,
        missing_skills=missing_skills,
        recommendations=recommendations
    )