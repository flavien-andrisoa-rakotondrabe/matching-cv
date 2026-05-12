<?php

namespace App\Models;

use App\Models\Resume;
use App\Models\JobOffer;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Analysis extends Model
{
    use HasFactory;

    protected $fillable = [
        'resume_id',
        'job_offer_id',
        'score',
        'matching_skills',
        'missing_skills',
        'recommendations',
        'raw_response',
    ];

    protected $casts = [
        'matching_skills' => 'array',
        'missing_skills' => 'array',
        'recommendations' => 'array',
        'raw_response' => 'array',
        'score' => 'float',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relations
    |--------------------------------------------------------------------------
    */

    public function resume(): BelongsTo
    {
        return $this->belongsTo(Resume::class);
    }

    public function jobOffer(): BelongsTo
    {
        return $this->belongsTo(JobOffer::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopeSuccessful(Builder $query): Builder
    {
        return $query->where('score', '>', 0);
    }

    public function scopeHighScore(Builder $query): Builder
    {
        return $query->where('score', '>=', 80);
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function getFormattedScoreAttribute(): string
    {
        return "{$this->score}%";
    }

    public function getMatchingSkillsCountAttribute(): int
    {
        return count($this->matching_skills ?? []);
    }

    public function getMissingSkillsCountAttribute(): int
    {
        return count($this->missing_skills ?? []);
    }
}
