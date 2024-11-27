<?php

namespace App\Models\EliteModel\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PComplianceDetail extends Model
{
  use HasFactory;
  protected $table = 'p_compliance_detail';

  protected $fillable = [
    'provider_id',
    'file',
    'status',
  ];

  public function provider()
  {
    return $this->belongsTo(Provider::class, 'provider_id');
  }
}
