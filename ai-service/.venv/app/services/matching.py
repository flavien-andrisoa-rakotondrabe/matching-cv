from sklearn.metrics.pairwise import cosine_similarity

class MatchingService:

    @staticmethod
    def calculate_similarity(cv_vector, job_vector):
        return round(
            cosine_similarity([cv_vector], [job_vector])[0][0] * 100,
            2
        )