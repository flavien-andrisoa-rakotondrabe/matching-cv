from docx import Document

def extract_docx_text(file_path: str) -> str:
    document = Document(file_path)

    return "\n".join(
        paragraph.text
        for paragraph in document.paragraphs
    )