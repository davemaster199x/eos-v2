<?php

namespace App\Models\EliteModel\ProviderStaff;

use App\Models\EliteModel\Provider\Provider;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PsProviderDetail extends Model
{
  use HasFactory;

  protected $table = 'ps_provider_details';

  protected $fillable = [
    'provider_staff_id',
    'provider_id',
    'status',
  ];


  public function providerStaff()
  {
    return $this->belongsTo(ProviderStaff::class, 'provider_staff_id');
  }

  public function provider()
  {
    return $this->belongsTo(Provider::class, 'provider_id');
  }
}
