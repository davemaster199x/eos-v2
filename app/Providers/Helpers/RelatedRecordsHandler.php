<?php

namespace App\Providers\Helpers;

use Illuminate\Database\Eloquent\Model;

class RelatedRecordsHandler
{
  /**
   * Update related records for a given model.
   *
   * @param Model $model The parent model
   * @param string $relationMethod The name of the relation method on the parent model
   * @param array $newRecords Array of new records to be created
   * @param string $foreignKey The foreign key name in the related table
   * @param string $dataKey The key in $newRecords containing the data to be saved
   * @return void
   */
  public static function updateRelatedRecords(Model $model, string $relationMethod, array|string|int $newRecords, string $foreignKey, string $dataKey, int $deleted = 0): void
  {
    // Delete existing records
    $model->$relationMethod()->delete();

    // Ensure $newRecords is always an array
    $records = is_array($newRecords) ? $newRecords : [$newRecords];

    // Create new records
    if (!$deleted) {
      if (!empty($records)) {
        $model->$relationMethod()->createMany(
          array_map(function ($record) use ($foreignKey, $dataKey, $model) {
            return [
              $foreignKey => $model->id,
              $dataKey => $record,
            ];
          }, $records)
        );
      }
    }
  }
}
