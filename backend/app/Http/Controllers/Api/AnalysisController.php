<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Analysis;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalysisController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $analyses = Analysis::query()
            ->whereHas('resume', function ($query) use ($request) {
                $query->where(
                    'user_id',
                    $request->user()->id
                );
            })
            ->latest()
            ->get();

        return response()->json($analyses);
    }

    public function show(Analysis $analysis): JsonResponse
    {
        return response()->json($analysis);
    }
}
