<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\View;

class DynamicHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $path = $request->path();

        if (str_contains($path, 'elite')) {
            View::share('header', 'partials.elite-header');
        } elseif (str_contains($path, 'referrals')) {
            View::share('header', 'partials.referrals-header');
        } elseif (str_contains($path, 'uploads')) {
            View::share('header', 'partials.uploads-header');
        } else {
            View::share('header', 'partials.elite-header');
        }

        return $next($request);
    }
}
