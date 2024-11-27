<?php

namespace App\Models\EliteModel\Document;

use App\Models\EliteModel\Patient\PatientIntake;
use App\Models\EliteModel\ProviderOffice\ProviderOffice;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $table = 'document';
    protected $fillable = [
        'patient_intake_id',
        'document_type',
        'nearest_facility',
        'nearest_specialist',
        'bill_amount',
        'notes',
        'status'
    ];

    public function patientIntake()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_intake_id');
    }

    public function nearestFacility()
    {
        return $this->belongsTo(ProviderOffice::class, 'nearest_facility');
    }
    public function nearestSpecialist()
    {
        return $this->belongsTo(ProviderOffice::class, 'nearest_specialist');
    }

    public function recommendationRequested()
    {
        return $this->hasMany(DRecommendationRequested::class, 'document_id');
    }
    public function documents()
    {
        return $this->hasMany(DDocuments::class, 'document_id');
    }
}
