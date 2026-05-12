from fastapi import APIRouter, File, Form, UploadFile

router = APIRouter()

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    return {
        "filename": file.filename,
        "job_description": job_description,
    }