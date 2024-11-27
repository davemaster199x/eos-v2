<?php

namespace App\Models\EliteModel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimplePatientStatus extends Model
{
    use HasFactory;

    protected $table = 'simple_patient_status';

    protected $fillable = [
        'simple_patient_status_name',
        'status',
    ];

    public function patientStatusDetails()
    {
        return $this->hasMany(PSimplePatientStatusDetail::class, 'simple_patient_status_id');
    }
}
