<?php

namespace App\Models\EliteModel\SurgeryCenter;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SCProceduresOfferedDetail extends Model
{
    use HasFactory;

    protected $table = 'sc_procedures_offered_detail';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'surgery_center_id',
        'name',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'status' => 'boolean',
    ];

    /**
     * Get the surgery center that offers this procedure.
     */
    public function surgeryCenter()
    {
        return $this->belongsTo(SurgeryCenter::class, 'surgery_center_id');
    }
}
