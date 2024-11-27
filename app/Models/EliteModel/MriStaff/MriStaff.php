<?php

namespace App\Models\EliteModel\MriStaff;

use App\Models\EliteModel\MriStaff\MriStaffAssignedFacility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MriStaff extends Model
{
    use HasFactory;

    protected $table = 'mri_staff';

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'title',
        'email',
        'phone',
        'status',
    ];

    public function assignedFacilities()
    {
        return $this->hasMany(MriStaffAssignedFacility::class, 'mri_staff_id');
    }
}
