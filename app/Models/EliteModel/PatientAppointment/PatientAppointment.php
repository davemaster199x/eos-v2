<?php

namespace App\Models\EliteModel\PatientAppointment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EliteModel\Provider\Provider;
use App\Models\EliteModel\ProviderOffice\ProviderOffice;
use App\Models\EliteModel\SurgeryCenter\SurgeryCenter;
use App\Models\EliteModel\Patient\PatientIntake;

class PatientAppointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'appt_id',
        'patient_id',
        'provider_id',
        'injection_type',
        'in_office',
        'at_surgery_center',
        'provider_office_id',
        'surgery_center_id',
        'visit_type',
        'appointment_date',
        'appointment_time',
        'lien_file',
        'special_notes',
        'appointment_status',
    ];

    protected $casts = [
        'appointment_date' => 'date',
        'appointment_time' => 'datetime',
    ];

    public function patient()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_id');
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }


    public function providerOffice()
    {
        return $this->belongsTo(ProviderOffice::class);
    }

    public function surgeryCenter()
    {
        return $this->belongsTo(SurgeryCenter::class, 'surgery_center_id');
    }

    public function itemsNeeded()
    {
        return $this->hasMany(PAItemsNeeded::class, 'patient_appointment_id');
    }

    public function appointmentTypes()
    {
        return $this->hasMany(PAAppointmentTypes::class, 'patient_appointment_id');
    }
}
