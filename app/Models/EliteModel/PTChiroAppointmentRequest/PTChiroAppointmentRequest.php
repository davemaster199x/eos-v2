<?php

namespace App\Models\EliteModel\PTChiroAppointmentRequest;

use App\Models\EliteModel\Patient\PatientIntake;
use App\Models\EliteModel\PTChiroFacility\PTChiroFacility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PTChiroAppointmentRequest extends Model
{
    use HasFactory;

    protected $table = 'pt_chiro_appointment_requests';
    protected $fillable = [
        'pt_chiro_appt_req_id',
        'patient_id',
        'facility_id',
        'appointment_types',
        'notes',
        'request_status',
    ];

    protected $casts = [
        'appointment_types' => 'array',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->pt_chiro_appt_req_id = 'APT' . str_pad(static::max('id') + 1, 6, '0', STR_PAD_LEFT);
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