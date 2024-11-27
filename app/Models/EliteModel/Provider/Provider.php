<?php

namespace App\Models\EliteModel\Provider;

use App\Models\EliteModel\AppointmentRequest\AppointmentRequest;
use App\Models\EliteModel\ProviderOffice\ProviderOffice;
use App\Models\EliteModel\SurgeryCenter\SurgeryCenter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    use HasFactory;
    protected $table = 'providers';

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'status',
        'pay_status',
        'provider_type',
        'language',
        'email',
        'phone',
        'provider_communication_note',
        'telemedicine',
        'headshot',
        'lien',
        'cv',
        'signed_contract',
        'w_9',
        'deleted'
    ];

    public function blacklistedReferralSource()
    {
        return $this->hasMany(PBlacklistedReferralSourceDetail::class, 'provider_id');
    }

    public function compliances()
    {
        return $this->hasMany(PComplianceDetail::class, 'provider_id');
    }

    public function otherDocuments()
    {
        return $this->hasMany(POtherDocumentsFormDetail::class, 'provider_id');
    }

    public function providerCollections()
    {
        return $this->hasMany(PProviderCollectionFormDetail::class, 'provider_id');
    }

    public function specialties()
    {
        return $this->hasMany(PSpecialtyDetail::class, 'provider_id');
    }

    public function therapiesProvided()
    {
        return $this->hasMany(PTherapiesProvidedDetail::class, 'provider_id');
    }

    public function offices()
    {
        return $this->hasMany(ProviderOffice::class, 'provider_id');
    }
    public function centers()
    {
        return $this->belongsToMany(SurgeryCenter::class, 'surgery_center_providers', 'provider_id', 'surgery_center_id');
    }
}
