<?php

namespace App\Models\EliteModel\PatientAppointment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PAAppointmentTypes extends Model
{
  use HasFactory;
  protected $table = 'pa_appointment_types';

  protected $fillable = [
    'patient_appointment_id',
    'name',
  ];
  public function patientAppointment()
  {
    return $this->belongsTo(PatientAppointment::class);
  }
}
