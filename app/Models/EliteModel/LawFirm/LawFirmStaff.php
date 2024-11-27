<?php

namespace App\Models\EliteModel\LawFirm;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LawFirmStaff extends Model
{
    use HasFactory;

    protected $table = 'law_firm_staff';

    protected $guarded = [];

    public function lawFirm()
    {
        return $this->belongsTo(LawFirm::class, 'law_firm_id');
    }
}
