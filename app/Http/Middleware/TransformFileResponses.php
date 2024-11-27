<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TransformFileResponses
{
  protected $validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'csv'];

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
        if (is_array($value) || is_object($value)) {
          $data[$key] = $this->transformData($value);
        } elseif ($this->isValidFilePath($value)) {
          $data[$key] = $this->transformFile($value);
        }
      }
    } elseif (is_object($data)) {
      foreach (get_object_vars($data) as $key => $value) {
        if (is_array($value) || is_object($value)) {
          $data->$key = $this->transformData($value);
        } elseif ($this->isValidFilePath($value)) {
          $data->$key = $this->transformFile($value);
        }
      }
    }

    return $data;
  }

  protected function isValidFilePath($value)
  {
    if (!is_string($value) || !Str::contains($value, 'storage/')) {
      return false;
    }

    $extension = strtolower(pathinfo($value, PATHINFO_EXTENSION));
    return in_array($extension, $this->validExtensions);
  }

  protected function transformFile($path)
  {
    $path = Str::replaceFirst('storage/', '', $path);

    if (!Storage::disk('public')->exists($path)) {
      return null;
    }

    return [
      'name' => basename($path),
      'size' => Storage::disk('public')->size($path),
      'mime_type' => Storage::mimeType($path),
      'last_modified' => Storage::disk('public')->lastModified($path),
      'download_url' => Storage::url(path: $path),
      'preview_url' => Storage::url($path),
      'extension' => pathinfo($path, PATHINFO_EXTENSION),
    ];
  }

  protected function canPreviewFile($path)
  {
    $mimeType = Storage::mimeType($path);
    $previewableMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    return in_array($mimeType, $previewableMimeTypes);
  }
}
