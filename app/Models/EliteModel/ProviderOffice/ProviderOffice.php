<?php

namespace App\Models\EliteModel\ProviderOffice;

use App\Models\EliteModel\Provider\Provider;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProviderOffice extends Model
{
    use HasFactory;

    protected $table = 'provider_offices';

    protected $fillable = [
        'provider_id',
        'office_name',
        'notes',
        'provider_type',
        'full_address',
        'latitude',
        'longitude',
        'street_address',
        'city',
        'state',
        'zip_code',
        'phone',
        'email',
        'photo_file',
        // 'specialties_offered',
        // 'therapies_provided',
        'pay_status',
        'status',
        'monday_schedule',  // Add new fields for office schedules
        'tuesday_schedule',
        'wednesday_schedule',
        'thursday_schedule',
        'friday_schedule',
        'saturday_schedule',
        'sunday_schedule',
    ];

    public function poSpecialtyDetail()
    {
        return $this->hasMany(POSpecialtyDetail::class, 'provider_office_id');
    }

    public function poTherapiesProvided()
    {
        return $this->hasMany(POTherapiesProvided::class, 'provider_office_id');
    }
    public function provider()
    {
        return $this->belongsTo(Provider::class, 'provider_id');
    }
}
