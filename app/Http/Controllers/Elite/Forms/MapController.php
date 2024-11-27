<?php

namespace App\Http\Controllers\Elite\Forms;

use Illuminate\Http\Request;
use App\Models\EliteModel\MriFacility\MriFacility;
use App\Models\EliteModel\SurgeryCenter\SurgeryCenter;
use App\Http\Controllers\Controller;
use App\Models\EliteModel\ProviderOffice\ProviderOffice;




class MapController extends Controller
{
    public function getFacilities(Request $request)
    {
        // Filters
        $address = $request->query('address');
        $targetLat = $request->query('lat');
        $targetLng = $request->query('lng');
        $facilityType = $request->query('facility_type');
        $specialties = $request->query('specialties', []);
        $therapiesProvided = $request->query('therapies', []);
        $provider = $request->query('provider_id');
        $city = $request->query('city');
        $zipcode = $request->query('zipcode');
        $active = $request->query('active');

        $limit = $request->query('limit', 15);
        $radius = $request->query('radius', default: 10);
        $q = $request->query('q');

        $show = $address ? 'distance' : 'all';

        // Initialize query based on facility type
        if ($facilityType == 'MRI') {
            $query = MriFacility::where('status', $active);

            // Where q like Name, Address, or Phone
            if (!empty($q)) {
                $query->where(function ($query) use ($q) {
                    $query->where('facility_name', 'like', '%' . $q . '%')
                        ->orWhere('full_address', 'like', '%' . $q . '%')
                        ->orWhere('phone', 'like', '%' . $q . '%');
                });
            }
        } elseif ($facilityType == 'Specialist') {
            $query = ProviderOffice::where('provider_type', $facilityType)
                ->with('provider', function ($query) use ($active) {
                    if ($active == '1') {
                        $query->where('status', 1);
                    }
                });

            if (!empty($specialties)) {
                $specialtiesArr = explode(',', $specialties);
                $query->whereHas('poSpecialtyDetail', function ($query) use ($specialtiesArr) {
                    $query->whereIn('name', $specialtiesArr);
                });
            }

            if (!empty($provider)) {
                $query->where('provider_id', $provider);
            }

            $query->with('poSpecialtyDetail');
        } elseif ($facilityType == 'Therapist') {
            $query = ProviderOffice::where('provider_type', $facilityType)
                ->with('provider', function ($query) use ($active) {
                    if ($active == '1') {
                        $query->where('status', 1);
                    }
                });

            if (!empty($therapiesProvided)) {
                $therapiesArr = explode(',', $therapiesProvided);
                $query->whereHas('poTherapiesProvided', function ($query) use ($therapiesArr) {
                    $query->whereIn('name', $therapiesArr);
                });
            }

            if (!empty($provider)) {
                $query->where('provider_id', $provider);
            }

            $query->with('poTherapiesProvided');
        } elseif ($facilityType == 'Surgery Center') {
            $query = SurgeryCenter::where('status', $active)
                ->with('provider')
                ->with('provider', function ($query) use ($active) {
                    if ($active == '1') {
                        $query->where('status', '1');
                    }
                });
            // Where q like Name, Address, or Phone
            if (!empty($q)) {
                $query->where(function ($query) use ($q) {
                    $query->where('name', 'like', '%' . $q . '%')
                        ->orWhere('full_address', 'like', '%' . $q . '%')
                        ->orWhere('phone', 'like', '%' . $q . '%');
                });
            }

            if (!empty($provider)) {
                $query->where('provider_id', $provider);
            }
        } else {
            return response()->json(['message' => 'Invalid facility type'], 400);
        }

        // Apply city and zipcode filters if provided
        if (!empty($city)) {
            $query->where('city', 'like', '%' . $city . '%');
        }

        if (!empty($zipcode)) {
            $query->where('zip_code', 'like', '%' . $zipcode . '%');
        }

        if (!empty($active)) {
            $query->where('status', 1);
        }
        $query->where('deleted', 0);

        // If latitude and longitude are provided, calculate the distance for each facility
        if (!empty($show) && !empty($targetLat) && !empty($targetLng)) {
            if ($show == 'all') {


                switch ($facilityType) {
                    case 'MRI':
                        $facilities = $query->orderBy('facility_name', 'asc')->get();
                        break;
                    case 'Specialist':
                        $facilities = $query->orderBy('office_name', 'asc')->get();
                        break;
                    case 'Therapist':
                        $facilities = $query->orderBy('office_name', 'asc')->get();
                        break;
                    case 'Surgery Center':
                        $facilities = $query->orderBy('name', 'asc')->get();
                        break;
                    default:
                        return $query->get();
                }
                $facilities = $query->paginate(perPage: $limit)->withQueryString();
            } else {
                $facilities = $query;

                $distanceThreshold = $radius; // Set your distance threshold in miles

                // Calculate distance and filter out facilities outside the distance threshold
                $facilities =
                    $facilities->select('*')
                    ->selectRaw('? * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(? - longitude)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude))) AS distance', [
                        3959, // Earth's radius in miles
                        $targetLat,
                        $targetLng,
                        $targetLat
                    ])
                    ->having('distance', '<=', $distanceThreshold) // 30 miles threshold
                    ->orderBy('distance');
                $facilities = $query->paginate($limit)->withQueryString()->through(function ($facility) {
                    $facility->distance = round($facility->distance, 2); // Round to 2 decimal places
                    return $facility;
                });

                // return response()->json($facilities);
            }
        }



        return response()->json($facilities);
    }




    private function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        $R = 6371; // Radius of the Earth in km
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat / 2) * sin($dLat / 2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) * sin($dLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $R * $c; // Distance in km
        return $distance * 0.621371; // Convert km to miles
    }

    private function geocodeAddressWithMapbox($address)
    {
        $apiKey = 'pk.eyJ1IjoiZWxpdGVtY2FyZSIsImEiOiJjbHk4d2hnYWMwbDhtMmtvajBvaWt2cjd2In0.gkNCaHLno7ByPjk2WiGCbQ';
        $encodedAddress = urlencode($address);
        $url = "https://api.mapbox.com/geocoding/v5/mapbox.places/{$encodedAddress}.json?access_token={$apiKey}";

        $response = file_get_contents($url);
        $json = json_decode($response, true);

        if (!empty($json['features'])) {
            $location = $json['features'][0]['geometry']['coordinates'];
            return ['longitude' => $location[0], 'latitude' => $location[1]];
        }

        return null;
    }
}
