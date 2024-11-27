<?php

namespace App\Models\EliteModel\SurgeryCenter;

use App\Models\EliteModel\Provider\Provider;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurgeryCenterProvider extends Model
{
    use HasFactory;

    protected $table = 'surgery_center_providers';

    protected $fillable = [
        'surgery_center_id',
        'provider_id',
        'status',
    ];

    public function surgeryCenter()
    {
        return $this->belongsTo(SurgeryCenter::class);
    }

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
