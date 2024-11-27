<?php

namespace App\Models\EliteModel\Document;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DDocuments extends Model
{
  use HasFactory;

  protected $table = 'd_documents';
  protected $fillable = [
    'document_id',
    'document_file'
  ];

  public function document()
  {
    return $this->belongsTo(Document::class, 'document_id');
  }
}
