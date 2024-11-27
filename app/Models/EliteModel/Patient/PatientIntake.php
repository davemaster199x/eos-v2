<?php

namespace App\Models\EliteModel\Patient;

use App\Models\EliteModel\Document\Document;
use App\Models\EliteModel\LawFirm\LawFirm;
use App\Models\EliteModel\ReferralSource\ReferralSource;
use App\Models\EliteModel\ReferralSourceStaff\ReferralSourcesStaff;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientIntake extends Model
{
    use HasFactory;

    protected $table = 'patient_intake';

    protected $fillable = [
        'law_firm_id',
        'is_vip',
        'referral_source_id',
        'referral_source_staff_id',
        'first_name',
        'middle_name',
        'last_name',
        'preferred_language',
        'gender',
        'date_of_birth',
        'date_of_injury',
        'phone',
        'email',
        'full_address',
        'latitude',
        'longitude',
        'street_address',
        'city',
        'state',
        'zip_code',
        'accident_type',
        'medical_note',
        'status',
        'deleted',
        'priority',
        'action_date_description',
        'accident_details',
        'summary_of_injuries',
        'prior_treatments',
        'appointment_preferrence',
        'policy_details',
    ];

    public function emcOwners()
    {
        return $this->hasMany(PEmcOwnerDetail::class, 'patient_intake_id');
    }

    public function medicalRecords()
    {
        return $this->hasMany(PMedicalRecordsDetail::class, 'patient_intake_id');
    }

    public function otherCaseManagers()
    {
        return $this->hasMany(POtherCaseManagerDetail::class, 'patient_intake_id');
    }

    public function simplePatientStatuses()
    {
        return $this->hasMany(PSimplePatientStatusDetail::class, 'patient_intake_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'patient_intake_id');
    }

    public function lawfirm()
    {
        return $this->belongsTo(LawFirm::class, 'law_firm_id');
    }

    public function referralSource()
    {
        return $this->belongsTo(ReferralSource::class, 'referral_source_id');
    }

    public function referralSourceStaff()
    {
        return $this->belongsTo(ReferralSourcesStaff::class, 'referral_source_staff_id');
    }
}
