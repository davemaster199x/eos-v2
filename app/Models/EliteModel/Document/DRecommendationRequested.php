<?php

namespace App\Models\EliteModel\Document;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DRecommendationRequested extends Model
{
    use HasFactory;

    protected $table = 'd_recommendation_requested';
    protected $fillable = [
        'document_id',
        'recommendation_requested'
    ];

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
