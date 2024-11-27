<?php

namespace App\Models\EliteModel\PTChiroStaff;

use App\Models\EliteModel\PTChiroFacility\PTChiroFacility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PTChiroStaff extends Model
{
    use HasFactory;

    protected $table = 'pt_chiro_staff';

    protected $fillable = [
        'pt_chiro_facility_staff_id',
        'first_name',
        'middle_name',
        'last_name',
        'title',
        'email',
        'phone',
        'status',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->pt_chiro_facility_staff_id = 'STAFF' . str_pad(static::max('id') + 1, 6, '0', STR_PAD_LEFT);
        });
    }

    public function facilities()
    {
        return $this->belongsToMany(PTChiroFacility::class, 'pt_chiro_facility_staff', 'pt_chiro_staff_id', 'pt_chiro_facility_id')->withTimestamps();
    }
}