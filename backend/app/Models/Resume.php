<?php

namespace App\Models;

use App\Models\User;
use App\Models\Analysis;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Resume extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'original_name',
        'path',
        'mime_type',
        'size',
        'parsed_text',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relations
    |--------------------------------------------------------------------------
    */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function analyses(): HasMany
    {
        return $this->hasMany(Analysis::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Scopes
    |--------------------------------------------------------------------------
    */

    public function scopeProcessed(Builder $query): Builder
    {
        return $query->whereNotNull('parsed_text');
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    public function getFileUrlAttribute(): string
    {
        return route('resumes.download', $this);
    }

    public function getFileExistsAttribute(): bool
    {
        return Storage::disk('private')->exists($this->path);
    }

    public function getFileSizeMbAttribute(): float
    {
        return round($this->size / 1024 / 1024, 2);
    }
}
