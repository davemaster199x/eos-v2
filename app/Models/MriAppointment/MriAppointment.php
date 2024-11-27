<?php

namespace App\Models\MriAppointment;

use App\Models\EliteModel\MriFacility\MriFacility;
use App\Models\EliteModel\Patient\PatientIntake;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MriAppointment extends Model
{
    use HasFactory;
    protected $table = 'mri_appointment';

    protected $fillable = [
        'patient_id',
        'mri_facility_id',
        'appointment_date',
        'appointment_time',
        'notes',
        'mri_appt_status',
    ];

    /**
     * Get the patient associated with the MRI appointment.
     */
    public function patient()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_id');
    }

    /**
     * Get the MRI facility associated with the MRI appointment.
     */
    public function mriFacility()
    {
        return $this->belongsTo(MriFacility::class, 'mri_facility_id');
    }
}
