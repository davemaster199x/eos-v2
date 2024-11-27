<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreprocessDates
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Define the fields that need to be preprocessed as dates
        $dateFields = ['appointment_date', 'date_of_birth', 'date_of_injury'];

        foreach ($dateFields as $field) {
            if ($request->has($field)) {
                $cleanedDate = preg_replace('/\s*\(.*\)$/', '', $request->input($field));
                $request->merge([
                    $field => Carbon::parse($cleanedDate)->format('Y-m-d'),
                ]);
            }
        }

        return $next($request);
    }
}
