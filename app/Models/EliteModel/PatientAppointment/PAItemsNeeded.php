<?php

namespace App\Models\EliteModel\PatientAppointment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PAItemsNeeded extends Model
{
  use HasFactory;
  protected $table = 'pa_items_needed';

  protected $fillable = [
    'patient_appointment_id',
    'name',
  ];
  public function patientAppointment()
  {
    return $this->belongsTo(PatientAppointment::class);
  }
}
