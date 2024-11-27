<?php

namespace App\Models\EliteModel\SurgeryCenter;

use App\Models\EliteModel\Provider\Provider;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\EliteModel\Specialist\Specialist;
use Illuminate\Database\Eloquent\Model;

class SurgeryCenter extends Model
{
    use HasFactory;

    protected $table = 'surgery_centers';

    protected $fillable = [
        'name',
        'full_address',
        'latitude',
        'longitude',
        'street_address',
        'city',
        'state',
        'zip_code',
        'phone',
        'email',
        'baa_file',
        'w9_file',
        'facility_lien_file',
        'photo_file',
        'status',
        'procedures_offered',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'procedures_offered' => 'array',
    ];


    public function providers()
    {
        return $this->belongsToMany(Provider::class, 'surgery_center_providers', 'surgery_center_id', 'provider_id');
    }
    public function provider()
    {
        return $this->belongsTo(Provider::class, 'provider_id');
    }


    public function proceduresOffered()
    {
        return $this->hasMany(SCProceduresOfferedDetail::class, 'surgery_center_id');
    }

    public function surgeryCenterProviders()
    {
        return $this->hasMany(SurgeryCenterProvider::class, 'surgery_center_id');
    }
}
