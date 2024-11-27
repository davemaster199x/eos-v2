<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForceHtmlResponse
{
  public function handle(Request $request, Closure $next)
  {
    if (!$request->expectsJson() && !$request->is('api/*')) {
      $request->headers->set('Accept', 'text/html');
    }

    return $next($request);
  }
}
