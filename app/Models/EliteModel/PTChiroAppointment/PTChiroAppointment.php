<?php

namespace App\Models\EliteModel\PTChiroAppointment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EliteModel\Patient\PatientIntake;
use App\Models\EliteModel\PTChiroFacility\PTChiroFacility;

class PTChiroAppointment extends Model
{
    use HasFactory;

    protected $table = 'pt_chiro_appointments';

    protected $fillable = [
        'pt_chiro_appt_id',
        'patient_id',
        'facility_id',
        'appointment_type',
        'visit_type',
        'appointment_date',
        'appointment_time',
        'special_notes',
        'appointment_status',
    ];

    protected $casts = [
        'appointment_date' => 'date',
        'appointment_time' => 'datetime',
        'appointment_type' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->pt_chiro_appt_id = 'APPT' . str_pad(static::max('id') + 1, 6, '0', STR_PAD_LEFT);
        });
    }

    public function patient()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_id');
    }

    public function facility()
    {
        return $this->belongsTo(PTChiroFacility::class, 'facility_id');
    }
}