<?php

namespace App\Models\EliteModel\Provider;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class POtherDocumentsFormDetail extends Model
{
    use HasFactory;
    protected $table = 'p_other_documents_form_details';

    protected $fillable = [
        'provider_id',
        'other_documents_file',
        'status',
    ];

    public function provider()
    {
        return $this->belongsTo(Provider::class, 'provider_id');
    }
}
