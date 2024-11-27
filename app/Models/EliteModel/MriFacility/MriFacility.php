<?php

namespace App\Models\EliteModel\MriFacility;

use App\Models\EliteModel\MriStaff\MriStaffAssignedFacility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MriFacility extends Model
{
    use HasFactory;

    protected $table = 'mri_facility';

    protected $fillable = [
        'facility_name',
        'full_address',
        'latitude',
        'longitude',
        'street_name',
        'city',
        'state',
        'zip_code',
        'phone',
        'email',
        'image_of_office',
        'status',
        'deleted'
    ];

    public function MriStaffAssignedFacility()
    {
        return $this->hasMany(MriStaffAssignedFacility::class, 'mri_facility_id');
    }
}
