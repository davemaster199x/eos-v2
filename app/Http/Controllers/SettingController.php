<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SettingController extends Controller
{
    // // Get the raw SQL query
    // $rawSql = $specialistOfficeQuery->toSql();

    // // Bind parameters to the query
    // $bindings = $specialistOfficeQuery->getBindings();

    // // Log the raw query and the bindings
    // \Log::info('Raw SQL Query: ' . $rawSql);
    // \Log::info('Bindings: ' . json_encode($bindings));

    // Refresh Specific Migration
    // php artisan migrate:refresh-specific 2024_07_30_205327_create_surgery_centers_tables

    // Migrate Specific Migration
    // php artisan migrate --path=/database/migrations/2024_07_30_205327_create_surgery_centers_tables.php

    public function addressSuggestions(Request $request)
    {
        $query = $request->get('query');
        if (!$query) {
            return response()->json(['error' => 'Query parameter is required'], 400);
        }

        $mapboxToken = env('MAPBOX_API_KEY', 'pk.eyJ1IjoiZWxpdGVtY2FyZSIsImEiOiJjbHk4d2hnYWMwbDhtMmtvajBvaWt2cjd2In0.gkNCaHLno7ByPjk2WiGCbQ');
        if (!$mapboxToken) {
            return response()->json(['error' => 'Mapbox API key is not configured' ], 500);
        }

        try {
            $response = Http::get("https://api.mapbox.com/geocoding/v5/mapbox.places/{$query}.json", [
                'access_token' => $mapboxToken,
                'autocomplete' => true,
                'limit' => 5
            ]);

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                $errorMessage = $response->json()['message'] ?? 'Unknown error occurred';
                $statusCode = $response->status();
                \Log::error("Mapbox API error: $errorMessage", [
                    'status_code' => $statusCode,
                    'response' => $response->body()
                ]);
                return response()->json([
                    'error' => 'Unable to fetch suggestions',
                    'message' => $errorMessage,
                    'status_code' => $statusCode
                ], 500);
            }
        } catch (\Exception $e) {
            \Log::error('Exception occurred in addressSuggestions: ' . $e->getMessage(), [
                'exception' => $e
            ]);
            return response()->json([
                'error' => 'An unexpected error occurred',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
