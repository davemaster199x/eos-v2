<?php

namespace App\Models\EliteModel\ProviderStaff;

use App\Models\EliteModel\ProviderStaff\PsDesignatedOfficeDetail;
use App\Models\EliteModel\ProviderStaff\PsPointOfContactDetail;
use App\Models\EliteModel\ProviderStaff\PsProviderDetail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProviderStaff extends Model
{
  use HasFactory;

  protected $table = 'provider_staff';

  protected $fillable = [
    'provider_type',
    'title',
    'first_name',
    'middle_name',
    'last_name',
    'staff_language',
    'email',
    'phone',
    'status',
    'deleted',
  ];

  public function designatedOfficeDetails()
  {
    return $this->hasMany(PsDesignatedOfficeDetail::class, 'provider_staff_id');
  }

  public function pointOfContactDetails()
  {
    return $this->hasMany(PsPointOfContactDetail::class, 'provider_staff_id');
  }

  public function providerDetails()
  {
    return $this->hasMany(PsProviderDetail::class, 'provider_staff_id');
  }
}
