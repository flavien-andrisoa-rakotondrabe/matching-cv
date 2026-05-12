<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

use App\Models\Analysis;
use App\Models\Resume;
use App\Models\JobOffer;

class AnalysisController extends Controller
{
    /**
     * MATCH CV + OFFRE (MAIN ENDPOINT)
     */
    public function match(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cv' => 'required|file|mimes:pdf,doc,docx|max:5120',
            'job_description' => 'required|string|min:10',
            'job_title' => 'nullable|string|max:255',
        ]);

        try {

            /*
            |--------------------------------------------------------------------------
            | 1. STORE RESUME
            |--------------------------------------------------------------------------
            */

            $file = $request->file('cv');

            $path = $file->store('resumes', 'local');

            $resume = Resume::create([
                'user_id' => $request->user()->id,
                'original_name' => $file->getClientOriginalName(),
                'path' => $path,
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
            ]);

            /*
            |--------------------------------------------------------------------------
            | 2. CREATE JOB OFFER
            |--------------------------------------------------------------------------
            */

            $jobOffer = JobOffer::create([
                'user_id' => $request->user()->id,
                'title' => $validated['job_title'] ?? 'Untitled Job',
                'description' => $validated['job_description'],
            ]);

            /*
            |--------------------------------------------------------------------------
            | 3. SEND TO FASTAPI
            |--------------------------------------------------------------------------
            */

            $fileContent = Storage::disk('local')->get($path);

            $response = Http::attach(
                'file',
                $fileContent,
                $file->getClientOriginalName()
            )->post(env('AI_SERVICE_URL') . '/analyze', [
                'job_description' => $validated['job_description'],
            ]);

            if (!$response->successful()) {
                return response()->json([
                    'message' => 'Erreur IA service',
                    'error' => $response->body(),
                ], 500);
            }

            $result = $response->json();

            /*
            |--------------------------------------------------------------------------
            | 4. SAVE ANALYSIS
            |--------------------------------------------------------------------------
            */

            $analysis = Analysis::create([
                'resume_id' => $resume->id,
                'job_offer_id' => $jobOffer->id,

                'score' => $result['score'] ?? 0,
                'matching_skills' => $result['matching_skills'] ?? [],
                'missing_skills' => $result['missing_skills'] ?? [],
                'recommendations' => $result['recommendations'] ?? [],

                'raw_response' => $result,
            ]);

            /*
            |--------------------------------------------------------------------------
            | 5. RESPONSE FRONTEND
            |--------------------------------------------------------------------------
            */

            return response()->json([
                'message' => 'Analyse terminée',

                'analysis_id' => $analysis->id,

                'analysis' => $analysis,
                'resume' => $resume,
                'job_offer' => $jobOffer,
                'ai_result' => $result,
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Erreur serveur',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * LIST ANALYSES
     */
    public function index(Request $request): JsonResponse
    {
        $analyses = Analysis::where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json($analyses);
    }

    /**
     * SHOW SINGLE ANALYSIS
     */
    public function show(Request $request, string $analysis): JsonResponse
    {
        $analysis = Analysis::find($analysis);

        if (!$analysis) {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }

        return response()->json([
            'id' => $analysis->id,
            'score' => $analysis->score,
            'matching_skills' => $analysis->matching_skills,
            'missing_skills' => $analysis->missing_skills,
            'recommendations' => $analysis->recommendations,
            'raw_response' => $analysis->raw_response,
            'created_at' => $analysis->created_at,
        ]);
    }
}
