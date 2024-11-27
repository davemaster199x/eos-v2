<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TransformFileResponsesV1
{
  protected $fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx'];
  protected $filePrefixes = ['/storage/', 'uploads/', 'documents/', 'images/', 'medical_records/'];

  public function handle($request, Closure $next)
  {
    $response = $next($request);

    if ($response instanceof JsonResponse) {
      $data = $response->getData(true);
      $data = $this->transformData($data);
      $response->setData($data);
    }

    return $response;
  }

  protected function transformData($data)
  {
    if (is_array($data)) {
      foreach ($data as $key => $value) {
        if (is_array($value)) {
          $data[$key] = $this->transformData($value);
        } elseif ($this->looksLikeFilePath($value) && $this->fileExists($value)) {
          $data[$key] = $this->transformFile($value);
        }
      }
    } elseif (is_object($data)) {
      foreach (get_object_vars($data) as $key => $value) {
        if (is_array($value) || is_object($value)) {
          $data->$key = $this->transformData($value);
        } elseif ($this->looksLikeFilePath($value) && $this->fileExists($value)) {
          $data->$key = $this->transformFile($value);
        }
      }
    }

    return $data;
  }

  protected function looksLikeFilePath($value)
  {
    if (!is_string($value)) {
      return false;
    }

    // Check if the value has a file extension
    $extension = pathinfo($value, PATHINFO_EXTENSION);
    if (in_array(strtolower($extension), $this->fileExtensions)) {
      return true;
    }

    // Check if the value starts with a known file prefix
    foreach ($this->filePrefixes as $prefix) {
      if (Str::startsWith($value, $prefix)) {
        return true;
      }
    }

    return false;
  }

  protected function fileExists($path)
  {
    $path = Str::replaceFirst('/storage', '', $path);
    return Storage::disk('public')->exists($path);
  }

  protected function transformFile($path)
  {
    $path = Str::replaceFirst('/storage', '', $path);
    return [
      'name' => basename($path),
      'size' => Storage::disk('public')->size($path),
      'mime_type' => Storage::mimeType(path: $path),
      'last_modified' => Storage::disk('public')->lastModified($path),
      'download_url' => $path,
      'preview_url' => $path,
    ];
  }

  protected function canPreviewFile($path)
  {
    $mimeType = Storage::mimeType($path);
    $previewableMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    return in_array($mimeType, $previewableMimeTypes);
  }
}
