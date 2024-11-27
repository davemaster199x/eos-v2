<?php

namespace App\Models\EliteModel\Patient;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PSimplePatientStatusDetail extends Model
{
    use HasFactory;
    
    protected $table = 'p_simple_patient_status_details';

    protected $fillable = [
        'patient_intake_id',
        'simple_patient_status_id',
        'status',
    ];

    public function patientIntake()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_intake_id');
    }

    public function simplePatientStatus()
    {
        return $this->belongsTo(SimplePatientStatus::class, 'simple_patient_status_id');
    }
}
