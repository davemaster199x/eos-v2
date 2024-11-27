<?php

namespace App\Models\EliteModel\SpecialistStaff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SsDesignatedOfficeDetail extends Model
{
    use HasFactory;

    protected $table = 'ss_designated_office_details';

    protected $fillable = [
        'specialist_staff_id', 'specialist_office_id', 'status',
    ];

    public function specialistStaff()
    {
        return $this->belongsTo(SpecialistStaff::class, 'specialist_staff_id');
    }
}
