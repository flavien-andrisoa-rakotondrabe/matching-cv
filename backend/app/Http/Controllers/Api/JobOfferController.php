<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\JobOffer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobOfferController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $request->user()
                ->jobOffers()
                ->latest()
                ->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
        ]);

        $jobOffer = $request->user()
            ->jobOffers()
            ->create($validated);

        return response()->json($jobOffer, 201);
    }

    public function show(JobOffer $jobOffer): JsonResponse
    {
        return response()->json($jobOffer);
    }

    public function update(
        Request $request,
        JobOffer $jobOffer
    ): JsonResponse {

        $validated = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
        ]);

        $jobOffer->update($validated);

        return response()->json($jobOffer);
    }

    public function destroy(JobOffer $jobOffer): JsonResponse
    {
        $jobOffer->delete();

        return response()->json([
            'message' => 'Job offer deleted.',
        ]);
    }
}
