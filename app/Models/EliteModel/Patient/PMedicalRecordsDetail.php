<?php

namespace App\Models\EliteModel\Patient;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PMedicalRecordsDetail extends Model
{
    use HasFactory;

    protected $table = 'p_medical_records_details';

    protected $fillable = [
        'patient_intake_id',
        'medical_records_file',
        'file_name',
        'file_size',
        'status',
    ];

    protected $appends = ['file_url'];

    public function patientIntake()
    {
        return $this->belongsTo(PatientIntake::class, 'patient_intake_id');
    }

    public function getFileUrlAttribute()
    {
        return Storage::url($this->medical_records_file);
    }

    public function getFileSizeAttribute($value)
    {
        return $this->formatSize($value);
    }

    private function formatSize($bytes)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));
        return round($bytes, 2) . ' ' . $units[$pow];
    }
}
