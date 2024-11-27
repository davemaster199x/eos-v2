<?php

namespace App\Models\EliteModel\ReferralSource;

use App\Models\EliteModel\ReferralSourceStaff\ReferralSourcesStaff;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferralSource extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'referral_source';

    // Specify the columns that are mass assignable
    protected $fillable = [
        'referral_source_name',
        'business_type',
        'logo',
        'full_address',
        'street_address',
        'city',
        'state',
        'zip_code',
        'phone',
        'email',
        'status',
        'deleted'
    ];

    public function referralSourceStaff()
    {
        return $this->hasMany(ReferralSourcesStaff::class, 'referral_source_id')->where('deleted', 0);
    }
}
