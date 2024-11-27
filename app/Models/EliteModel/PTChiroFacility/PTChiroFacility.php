<?php
namespace App\Models\EliteModel\PTChiroFacility;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PTChiroFacility extends Model
{
    use HasFactory;

    protected $table = 'pt_chiro_facilities';

    protected $fillable = [
        'facility_id',
        'full_address',
        'latitude',
        'longitude',
        'name',
        'street_address',
        'city',
        'state',
        'zip_code',
        'phone',
        'image',
        'therapies_provided',
        'status',
        'pay_status',
        'notes',
        'cv_file',
        'lien_file',
        'provider_collection_form_file',
        'contract_file',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'therapies_provided' => 'array',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->facility_id = 'FAC' . str_pad(static::max('id') + 1, 6, '0', STR_PAD_LEFT);
        });
    }
}
