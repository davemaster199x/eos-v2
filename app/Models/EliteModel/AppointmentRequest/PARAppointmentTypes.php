<?php

namespace App\Models\EliteModel\AppointmentRequest;

use App\Models\EliteModel\AppointmentRequest\AppointmentRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PARAppointmentTypes extends Model
{
  use HasFactory;
  protected $table = 'par_appointment_types';

  protected $fillable = [
    'appointment_request_id',
    'name',
  ];

  public function appointmentRequest()
  {
    return $this->belongsTo(AppointmentRequest::class);
  }
}
