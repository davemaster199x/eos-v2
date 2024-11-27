<?php

namespace App\Providers\Helpers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class FileUploadHandler
{
  /**
   * Handle file upload, delete old file if exists, and return the new file path.
   *
   * @param UploadedFile|null $file
   * @param string $storageFolder
   * @param string|null $oldFilePath
   * @return string|null
   */
  public static function handleFileUpload(?UploadedFile $file, string $storageFolder,  $oldFilePath = null): ?string
  {
    if (!$oldFilePath) {
      if (!$file) {
        return "";
      }
    }

    if (!$file) {
      return $oldFilePath ?? null;
    }

    // Delete the old file if it exists
    if ($oldFilePath) {
      // if Array
      if (is_array($oldFilePath)) {
        foreach ($oldFilePath as $oldFile) {
          Storage::disk('public')->delete($oldFile);
        }
      }
      if (is_string($oldFilePath)) {
        Storage::disk('public')->delete($oldFilePath);
      }
    }

    // Get the original filename
    $originalFilename = $file->getClientOriginalName();

    // Generate a unique filename to prevent overwriting
    // $uniqueFilename = uniqid() . '_' . $originalFilename;

    // Store the new file with the unique filename
    $path = $file->storeAs($storageFolder, $originalFilename, 'public');

    // Return the path with the original filename
    return $path ? '/storage/' . $storageFolder . '/' . $originalFilename : null;
  }

  private static function validateFile(UploadedFile $file): UploadedFile
  {
    $validatedFile = validator(['file' => $file], [
      'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,pdf,doc,docx|max:2048'
    ])->validate()['file'];

    return $validatedFile;
  }
}
