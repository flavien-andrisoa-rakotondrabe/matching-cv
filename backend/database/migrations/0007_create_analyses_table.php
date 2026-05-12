<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('analyses', function (Blueprint $table) {
            $table->id();

            $table->foreignId('resume_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('job_offer_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->float('score');

            $table->json('matching_skills')->nullable();

            $table->json('missing_skills')->nullable();

            $table->json('recommendations')->nullable();

            $table->json('raw_response')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analyses');
    }
};
