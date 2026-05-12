import fitz
import docx
import tempfile

def extract_pdf(content: bytes):
    doc = fitz.open(stream=content, filetype="pdf")
    return "\n".join(page.get_text() for page in doc)

def extract_docx(content: bytes):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
        tmp.write(content)
        tmp_path = tmp.name

    document = docx.Document(tmp_path)
    return "\n".join(p.text for p in document.paragraphs)

def extract_text_from_file(filename: str, content: bytes):
    if filename.endswith(".pdf"):
        return extract_pdf(content)
    elif filename.endswith(".docx"):
        return extract_docx(content)
    else:
        return content.decode("utf-8", errors="ignore")