<?php

namespace App\Models\EliteModel\Provider;

use App\Models\EliteModel\Specialist\Specialist;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PProviderCollectionFormDetail extends Model
{
    use HasFactory;

    protected $table = 'p_provider_collection_form_details';

    protected $fillable = [
        'provider_id',
        'provider_collection_form_file',
        'status',
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class, 'provider_id');
    }
}
