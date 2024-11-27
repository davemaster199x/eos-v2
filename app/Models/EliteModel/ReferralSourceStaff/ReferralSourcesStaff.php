<?php

namespace App\Models\EliteModel\ReferralSourceStaff;

use App\Models\EliteModel\ReferralSource\ReferralSource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferralSourcesStaff extends Model
{
    use HasFactory;

    protected $table = 'referral_source_staff';

    protected $fillable = [
        'referral_source_id',
        'first_name',
        'middle_name',
        'last_name',
        'title',
        'phone',
        'email',
        'status',
        'deleted'
    ];

    public function referralSource()
    {
        return $this->belongsTo(ReferralSource::class, 'referral_source_id')->where('deleted', 0);
    }
}
