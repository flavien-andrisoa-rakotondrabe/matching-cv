<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadResumeRequest;
use App\Models\Resume;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ResumeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $resumes = $request->user()
            ->resumes()
            ->latest()
            ->get();

        return response()->json($resumes);
    }

    public function store(
        UploadResumeRequest $request
    ): JsonResponse {

        $file = $request->file('resume');

        $path = $file->store('resumes', 'private');

        $resume = Resume::create([
            'user_id' => $request->user()->id,
            'original_name' => $file->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ]);

        return response()->json([
            'message' => 'Resume uploaded successfully.',
            'data' => $resume,
        ], 201);
    }

    public function show(Resume $resume): JsonResponse
    {
        return response()->json($resume);
    }

    public function destroy(Resume $resume): JsonResponse
    {
        Storage::disk('private')->delete($resume->path);

        $resume->delete();

        return response()->json([
            'message' => 'Resume deleted successfully.',
        ]);
    }

    public function analyze(Resume $resume): JsonResponse
    {
        return response()->json([
            'message' => 'Analysis queued.',
        ]);
    }

    public function download(Resume $resume)
    {
        return Storage::disk('private')
            ->download(
                $resume->path,
                $resume->original_name
            );
    }
}
