<?php

namespace App\Models\EliteModel\ProviderStaff;

use App\Models\EliteModel\SpecialistStaff\ProviderStaff;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PsPointOfContactDetail extends Model
{
  use HasFactory;

  protected $table = 'ps_point_of_contact_details';

  protected $fillable = [
    'provider_staff_id',
    'point_of_contact',
    'status',
  ];

  public function providerStaff()
  {
    return $this->belongsTo(ProviderStaff::class, 'provider_staff_id');
  }
}
