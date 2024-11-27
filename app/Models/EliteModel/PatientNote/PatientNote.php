<?php

namespace App\Models\EliteModel\PatientNote;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientNote extends Model
{
    use HasFactory;

    protected $table = 'patient_notes';

    protected $fillable = [
        'patient_intake_id',
        'note_type',
        'notes',
        'status',
    ];
}
