<?php


namespace App\Models\EliteModel\ProviderStaff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EliteModel\ProviderOffice\ProviderOffice;

class PsDesignatedOfficeDetail extends Model
{
  use HasFactory;

  protected $table = 'ps_designated_office_details';

  protected $fillable = [
    'provider_staff_id',
    'designated_office',
    'status',
  ];

  public function providerStaff()
  {
    return $this->belongsTo(ProviderStaff::class, 'provider_staff_id');
  }

  public function designated_office()
  {
    return $this->belongsTo(ProviderOffice::class, 'designated_office');
  }
}
