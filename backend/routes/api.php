<?php

use App\Http\Controllers\Api\AnalysisController;
use App\Http\Controllers\Api\Auth\GoogleAuthController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\JobOfferController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ResumeController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::prefix('auth')->group(function () {

    Route::get('/google/redirect', [
        GoogleAuthController::class,
        'redirect',
    ]);

    Route::get('/google/callback', [
        GoogleAuthController::class,
        'callback',
    ]);
});

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------------------
    */

    Route::post('/logout', LogoutController::class);

    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get('/profile', [
        ProfileController::class,
        'show',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Resumes
    |--------------------------------------------------------------------------
    */

    Route::prefix('resumes')->group(function () {

        Route::get('/', [
            ResumeController::class,
            'index',
        ]);

        Route::post('/', [
            ResumeController::class,
            'store',
        ]);

        Route::get('/{resume}', [
            ResumeController::class,
            'show',
        ]);

        Route::delete('/{resume}', [
            ResumeController::class,
            'destroy',
        ]);

        Route::post('/{resume}/analyze', [
            ResumeController::class,
            'analyze',
        ]);

        Route::get('/{resume}/download', [
            ResumeController::class,
            'download',
        ])->name('resumes.download');
    });

    /*
    |--------------------------------------------------------------------------
    | Job Offers
    |--------------------------------------------------------------------------
    */

    Route::apiResource('job-offers', JobOfferController::class);

    /*
    |--------------------------------------------------------------------------
    | Analyses
    |--------------------------------------------------------------------------
    */

    Route::prefix('analyses')->group(function () {

        Route::get('/', [
            AnalysisController::class,
            'index',
        ]);

        Route::get('/{analysis}', [
            AnalysisController::class,
            'show',
        ]);
    });
});
