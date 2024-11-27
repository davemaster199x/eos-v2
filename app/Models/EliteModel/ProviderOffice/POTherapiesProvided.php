<?php

namespace App\Models\EliteModel\ProviderOffice;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class POTherapiesProvided extends Model
{
    use HasFactory;

    protected $table = 'po_therapies_provided';

    protected $fillable = [
        'provider_office_id',
        'name',
        'status',
    ];

    public function providerOffice()
    {
        return $this->belongsTo(ProviderOffice::class, 'provider_office_id');
    }
}
