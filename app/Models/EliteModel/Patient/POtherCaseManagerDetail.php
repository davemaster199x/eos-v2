<?php

namespace App\Models\EliteModel\Patient;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class POtherCaseManagerDetail extends Model
{
    use HasFactory;

    protected $table = 'p_other_case_manager_details';

    protected $fillable = [
        'patient_intake_id',
        'other_referral_source_staff_id',
        'status',
    ];

    public function patientIntake()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_intake_id');
    }
}
