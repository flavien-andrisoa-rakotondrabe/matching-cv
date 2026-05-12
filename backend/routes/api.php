<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AnalysisController;
use App\Http\Controllers\Api\Auth\GoogleAuthController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\JobOfferController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ResumeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {
    Route::get('/google/redirect', [GoogleAuthController::class, 'redirect']);
    Route::get('/google/callback', [GoogleAuthController::class, 'callback']);
});

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (AUTH SANCTUM)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // AUTH
    Route::post('/logout', LogoutController::class);

    // PROFILE
    Route::get('/profile', [ProfileController::class, 'show']);

    // RESUMES
    Route::prefix('resumes')->group(function () {
        Route::get('/', [ResumeController::class, 'index']);
        Route::post('/', [ResumeController::class, 'store']);
        Route::get('/{resume}', [ResumeController::class, 'show']);
        Route::delete('/{resume}', [ResumeController::class, 'destroy']);
        Route::post('/{resume}/analyze', [ResumeController::class, 'analyze']);
        Route::get('/{resume}/download', [ResumeController::class, 'download']);
    });

    // JOB OFFERS
    Route::apiResource('job-offers', JobOfferController::class);

    // ANALYSES
    Route::prefix('analyses')->group(function () {
        Route::get('/', [AnalysisController::class, 'index']);
        Route::post('/match', [AnalysisController::class, 'match']);
        Route::get('/{analysis}', [AnalysisController::class, 'show']);
    });
});
