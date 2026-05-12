from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

class EmbeddingService:

    @staticmethod
    def encode(text: str):
        return model.encode(text)