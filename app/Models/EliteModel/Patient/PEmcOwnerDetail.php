<?php

namespace App\Models\EliteModel\Patient;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PEmcOwnerDetail extends Model
{
    use HasFactory;

    protected $table = 'p_emc_owner_details';

    protected $fillable = [
        'patient_intake_id',
        'emc_owner_name',
        'status',
    ];

    public function patientIntake()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_intake_id');
    }
}
