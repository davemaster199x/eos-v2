<?php

namespace App\Models\EliteModel\SpecialistStaff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecialistStaff extends Model
{
    use HasFactory;

    protected $table = 'specialist_staff';

    protected $fillable = [
        'title', 'name', 'staff_language', 'email', 'phone', 'status',
    ];

    public function designatedOfficeDetails()
    {
        return $this->hasMany(SsDesignatedOfficeDetail::class, 'specialist_staff_id');
    }

    public function pointOfContactDetails()
    {
        return $this->hasMany(SsPointOfContactDetail::class, 'specialist_staff_id');
    }

    public function specialistDetails()
    {
        return $this->hasMany(SsSpecialistDetail::class, 'specialist_staff_id');
    }
}
