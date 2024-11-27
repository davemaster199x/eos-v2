<?php

namespace App\Models\EliteModel\MriStaff;

use App\Models\EliteModel\MriFacility\MriFacility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MriStaffAssignedFacility extends Model
{
    use HasFactory;

    protected $table = 'mri_staff_assigned_facility';

    protected $fillable = [
        'mri_staff_id',
        'mri_facility_id',
        'status',
    ];

    public function facility()
    {
        return $this->belongsTo(MriFacility::class, 'mri_facility_id');
    }
}
