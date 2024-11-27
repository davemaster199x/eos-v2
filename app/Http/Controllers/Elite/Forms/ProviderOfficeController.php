<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\Provider\Provider;
use App\Models\EliteModel\ProviderOffice\POSpecialtyDetail;
use App\Models\EliteModel\ProviderOffice\POTherapiesProvided;
use App\Providers\Helpers\FileUploadHandler;
use App\Models\EliteModel\ProviderOffice\ProviderOffice;
use App\Providers\Helpers\RelatedRecordsHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Traits\FullQueryCaptureTrait;

class ProviderOfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $providerId = null)
    {
        $limit = $request->query('limit');
        $providerOfficeQuery = ProviderOffice::where('deleted', 0);
        $providerType = $request->query(key: 'provider_type');
        if ($providerType) {
            $provider_type = $request->query('provider_type');
        }

        if ($providerId) {
            $providerOfficeQuery->where('provider_id', $providerId);
        } elseif ($request->has('provider_id')) {
            $providerIds = $request->input('provider_id');
            if (is_array($providerIds)) {
                $providerOfficeQuery->whereIn('provider_id', $providerIds);
            } else {
                $providerOfficeQuery->where('provider_id', $providerIds);
            }
        }

        $providerOffices = $providerOfficeQuery->where('provider_type', $provider_type);

        // Filter provider offices by provider type
        // If provider type is "Specialist", include specialty details in the response
        if ($provider_type === "Specialist") {
            $providerOffices = $providerOfficeQuery
                ->with(['poSpecialtyDetail'])
                ->with(['provider.specialties']);
            // Include provider details where provider_type = "Specialist"
            // ->whereHas('provider', function ($query) {
            //     $query->where('provider_type', 'Specialist');
            // });
        }

        if ($provider_type === "Therapist") {
            $providerOffices = $providerOfficeQuery
                ->with(['poTherapiesProvided'])
                ->with(['provider.therapiesProvided']);
            // Include provider details where provider_type = "Therapist"
            // ->whereHas('provider', function ($query) {
            //     $query->where('provider_type', 'Therapist');
            // });
        }

        $providerOffices = $providerOffices->orderBy('office_name');
        if (isset($limit) && $limit > 0) {
            $providerOffices = $providerOffices->paginate($limit);
        } else {
            $providerOffices = $providerOffices->get();
        }



        return response()->json($providerOffices);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Return the view that loads your React application
        return view('app');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'provider_id' => 'nullable|integer|exists:providers,id',
                'provider_type' => 'nullable|string|max:100',
                'full_address' => 'nullable|string|max:255',
                'latitude' => 'nullable|string|max:255',
                'longitude' => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:100',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'zip' => 'nullable|string|max:50',
                'office_name' => 'nullable|string|max:100',
                'notes' => 'nullable|string',
                'phone' => 'nullable|string|max:50',
                'email' => 'nullable|string|max:50',
                'specialties_offered' => 'nullable|array',
                'specialties_offered.*' => 'nullable|string|max:100',
                'therapies_provided' => 'nullable|array',
                // 'image_of_office' => 'nullable|file|image',
                'therapies_provided.*' => 'nullable|string|max:100',
                'monday_schedule' => 'nullable|string',
                'tuesday_schedule' => 'nullable|string',
                'wednesday_schedule' => 'nullable|string',
                'thursday_schedule' => 'nullable|string',
                'friday_schedule' => 'nullable|string',
                'saturday_schedule' => 'nullable|string',
                'sunday_schedule' => 'nullable|string',
                'status' => 'nullable|in:1,0',
                'pay_status' => 'nullable|in:Is Paying,On Hold,Not in Network,For Retention,Is Not Paying',
            ]);

            $providerOffice = new ProviderOffice([
                'provider_id' => $validatedData['provider_id'],
                'provider_type' => $validatedData['provider_type'],
                'full_address' => $validatedData['full_address'] ?? '',
                'latitude' => $validatedData['latitude'] ?? '',
                'longitude' => $validatedData['longitude'] ?? '',
                'street_address' => $validatedData['street_address'] ?? '',
                'city' => $validatedData['city'] ?? '',
                'state' => $validatedData['state'] ?? '',
                'zip_code' => $validatedData['zip'] ?? '',
                'office_name' => $validatedData['office_name'] ?? '',
                'notes' => $validatedData['notes'] ?? '',
                'phone' => $validatedData['phone'] ?? '',
                'email' => $validatedData['email'] ?? '',
                'monday_schedule' => $validatedData['monday_schedule'],
                'tuesday_schedule' => $validatedData['tuesday_schedule'],
                'wednesday_schedule' => $validatedData['wednesday_schedule'],
                'thursday_schedule' => $validatedData['thursday_schedule'],
                'friday_schedule' => $validatedData['friday_schedule'],
                'saturday_schedule' => $validatedData['saturday_schedule'],
                'sunday_schedule' => $validatedData['sunday_schedule'],
                'status' => $validatedData['status'],
                'pay_status' => $validatedData['pay_status'],
            ]);
            if ($request->hasFile('photo_file')) {

                $providerOffice->photo_file = FileUploadHandler::handleFileUpload($request->file('photo_file'), 'provider-office-files', $request->photo_file);
            }

            $providerOffice->save();

            if (!empty($validatedData['specialties_offered'])) {
                foreach ($validatedData['specialties_offered'] as $data) {
                    POSpecialtyDetail::create([
                        'provider_office_id' => $providerOffice->id,
                        'name' => $data,
                    ]);
                }
            }

            if (!empty($validatedData['therapies_provided'])) {
                foreach ($validatedData['therapies_provided'] as $data) {
                    POTherapiesProvided::create([
                        'provider_office_id' => $providerOffice->id,
                        'name' => $data,
                    ]);
                }
            }

            return response()->json(['message' => 'Provider Office information saved successfully.', 'provider' => $providerOffice]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getProviders()
    {
        $providers = Provider::where('status', 1)->select('id', 'name')->get();
        return response()->json($providers);
    }


    /**
     * Display the specified resource.
     */
    public function show(ProviderOffice $providerOffice)
    {
        return response()->json($providerOffice);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProviderOffice $providerOffice)
    {
        return view('app'); // Assuming 'app' is the view that loads your React application
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProviderOffice $providerOffice)
    {
        try {
            $validatedData = $request->validate([
                'provider_id' => 'nullable|integer|exists:providers,id',
                'provider_type' => 'nullable|string|max:100',
                'full_address' => 'nullable|string|max:255',
                'latitude' => 'nullable|string|max:255',
                'longitude' => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:100',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'zip' => 'nullable|string|max:50',
                'office_name' => 'nullable|string|max:100',
                'notes' => 'nullable|string',
                'phone' => 'nullable|string|max:50',
                'email' => 'nullable|string|max:50',
                'specialties_offered' => 'nullable|array',
                'specialties_offered.*' => 'nullable|string|max:100',
                'therapies_provided' => 'nullable|array',
                'therapies_provided.*' => 'nullable|string|max:100',
                'monday_schedule' => 'nullable|string',
                'tuesday_schedule' => 'nullable|string',
                'wednesday_schedule' => 'nullable|string',
                'thursday_schedule' => 'nullable|string',
                'friday_schedule' => 'nullable|string',
                'saturday_schedule' => 'nullable|string',
                'sunday_schedule' => 'nullable|string',
                'status' => 'nullable|in:1,0',

                'pay_status' => 'nullable|in:Is Paying,On Hold,Not in Network,For Retention,Is Not Paying',
            ]);


            $validatedData['photo_file'] = FileUploadHandler::handleFileUpload($request->file('photo_file'), 'provider-office-files', $request->photo_file);


            $providerOffice->update($validatedData);



            if ($request['provider_type'] == 'Specialist') {
                RelatedRecordsHandler::updateRelatedRecords(
                    $providerOffice,
                    'poSpecialtyDetail',
                    $validatedData['specialties_offered'] ?? [],
                    'specialist_office_id',
                    'name'
                );
            }

            if ($request['provider_type'] == 'Therapist') {
                RelatedRecordsHandler::updateRelatedRecords(
                    $providerOffice,
                    'poTherapiesProvided',
                    $validatedData['therapies_provided'] ?? [],
                    'provider_office_id',
                    'name'
                );
            }

            return response()->json(['message' => 'Provider Office information updated successfully.', 'specialist' => $providerOffice]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $provideroffice = ProviderOffice::where('id', $id)
                ->firstOrFail();

            $provideroffice->deleted = 1;
            $provideroffice->save();

            return response()->json(['message' => 'Provider Office deactivated successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Provider not found or already deactivated'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deactivating the Provider.', 'error' => $e->getMessage()], 500);
        }
    }
}
