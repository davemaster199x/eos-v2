<?php

namespace App\Models\EliteModel\Provider;

use App\Models\EliteModel\ReferralSource\ReferralSource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PBlacklistedReferralSourceDetail extends Model
{
    use HasFactory;

    protected $table = 'p_blacklisted_referral_source_details';

    protected $fillable = [
        'provider_id',
        'referral_source_id',
        'status',
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class, 'provider_id');
    }

    public function referralSource()
    {
        return $this->belongsTo(ReferralSource::class, 'referral_source_id');
    }
}
