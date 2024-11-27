<?php

namespace App\Models\EliteModel\SpecialistStaff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SsPointOfContactDetail extends Model
{
    use HasFactory;

    protected $table = 'ss_point_of_contact_details';

    protected $fillable = [
        'specialist_staff_id', 'point_of_contact', 'status',
    ];

    public function specialistStaff()
    {
        return $this->belongsTo(SpecialistStaff::class, 'specialist_staff_id');
    }
}
