<?php

namespace App\Models\EliteModel\AppointmentRequest;

use App\Models\EliteModel\Patient\PatientIntake;
use App\Models\EliteModel\Provider\Provider;
use App\Models\EliteModel\ProviderOffice\ProviderOffice;
use App\Models\EliteModel\Specialist\Specialist;
use App\Models\EliteModel\SpecialistOffice\SpecialistOffice;
use App\Models\EliteModel\SurgeryCenter\SurgeryCenter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentRequest extends Model
{
    use HasFactory;

    protected $table = 'appointment_request';

    protected $fillable = [
        'high_priority',
        'patient_intake_id',
        'provider_type',
        'provider_id',
        'injection_type',
        'in_office',
        'at_surgery_center',
        'visit_type',
        'provider_office_id',
        'surgery_center_id',
        'patient_medical_records',
        'notes',
        'request_status',
        'status',
    ];
    // // Define the relationship with the Patient Intake model
    public function patientIntake()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_intake_id');
    }

    // Define the relationship with the Specialist model
    public function provider()
    {
        return $this->belongsTo(Provider::class, 'provider_id')->with('offices');
    }

    // Define the relationship with the Specialist Office model
    public function providerOffice()
    {
        return $this->belongsTo(ProviderOffice::class, 'provider_office_id');
    }

    // Define the relationship with the Surgery Center model
    public function surgeryCenter()
    {
        return $this->belongsTo(SurgeryCenter::class, 'surgery_center_id');
    }

    public function appointmentTypes()
    {
        return $this->hasMany(PARAppointmentTypes::class, 'appointment_request_id');
    }
}
