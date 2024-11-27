<?php

namespace App\Models\EliteModel\LawFirm;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LawFirm extends Model
{
    use HasFactory;

    protected $table = 'law_firm';

    protected $guarded = [];

    public function lawFirmStaffs()
    {
        return $this->hasMany(LawFirmStaff::class, 'law_firm_id');
    }

    public function blacklistedLawFirms()
    {
        return $this->hasMany(SBlacklistedLawFirmDetail::class, 'law_firm_id');
    }
}
