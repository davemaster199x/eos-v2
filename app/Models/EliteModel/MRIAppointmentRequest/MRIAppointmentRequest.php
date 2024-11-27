<?php

namespace App\Models\EliteModel\MRIAppointmentRequest;

use App\Models\EliteModel\MriFacility\MriFacility;
use App\Models\EliteModel\Patient\PatientIntake;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MRIAppointmentRequest extends Model
{
    use HasFactory;

    protected $table = 'mri_appointment_requests';
    protected $fillable = [
        'high_priority',
        'mri_appt_req_id',
        'patient_id',
        'facility_id',
        'notes',
        'request_status',
    ];


    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->mri_appt_req_id = 'MRI' . str_pad(static::max('id') + 1, 6, '0', STR_PAD_LEFT);
        });
    }

    public function patient()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_id');
    }

    public function facility()
    {
        return $this->belongsTo(MriFacility::class, 'facility_id');
    }
}
