<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\SurgeryCenter\SurgeryCenter;
use App\Http\Controllers\Elite\Forms\SurgeryCenterSpecialistController;
use App\Models\EliteModel\SurgeryCenter\SCProceduresOfferedDetail;
use App\Providers\Helpers\FileUploadHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class SurgeryCenterController extends Controller
{
    public function index()
    {
        $limit = request('limit');
        $query = SurgeryCenter::where('deleted', 0)
            ->with(['proceduresOffered', 'surgeryCenterProviders.provider'])
            ->orderBy('name', 'asc');

        if (isset($limit) && $limit > 0) {
            $surgeryCenters = $query->paginate($limit);
        }


        $surgeryCenters->getCollection()->transform(function ($surgeryCenter) {
            $surgeryCenter->surgeryCenterProviders = $surgeryCenter->surgeryCenterProviders->map(function ($surgeryCenterProvider) {
                return [
                    'id' => $surgeryCenterProvider->id,
                    'provider_id' => $surgeryCenterProvider->provider_id,
                    'provider_name' => $surgeryCenterProvider->provider->first_name . ' ' . $surgeryCenterProvider->provider->last_name,
                    'status' => $surgeryCenterProvider->status,
                    // Add any other fields you need from surgeryCenterProvider or provider
                ];
            });
            return $surgeryCenter;
        });


        return response()->json($surgeryCenters);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'nullable|string|max:255',
                'full_address' => 'nullable|string|max:255',
                'latitude'  => 'nullable|string|max:255',
                'longitude' => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:50',
                'zip_code' => 'nullable|string|max:20',
                'phone' => 'nullable|string|max:20',
                'email' => 'nullable|email|max:50',
                // 'baa_file' => 'nullable|file|mimes:pdf,doc,docx',
                // 'w9_file' => 'nullable|file|mimes:pdf,doc,docx',
                // 'facility_lien_file' => 'nullable|file|mimes:pdf,doc,docx',
                // 'photo_file' => 'nullable|file|image',
                'status' => 'nullable|in:1,0',
                'provider_id' => 'nullable|array',
                'provider_id.*' => 'exists:providers,id',
                // 'procedures_offered' => 'nullable|array',
                // 'procedures_offered.*' => 'string',
            ]);

            $surgeryCenter = new SurgeryCenter($validatedData);

            // Handle file uploads
            $fileFields = ['baa_file', 'w9_file', 'facility_lien_file', 'photo_file'];
            foreach ($fileFields as $field) {
                if ($request->hasFile($field)) {
                    $path = FileUploadHandler::handleFileUpload($request->file($field), 'surgery_center_files', $surgeryCenter->$field);
                    $validatedData[$field] = $path;
                }
            }

            $surgeryCenter->save();

            // Associate providers using SurgeryCenterProviderController
            if (!empty($validatedData['provider_id'])) {
                $surgeryCenterProviderController = new SurgeryCenterProviderController();
                foreach ($validatedData['provider_id'] as $providerId) {
                    $providerRequest = new Request([
                        'surgery_center_id' => $surgeryCenter->id,
                        'provider_id' => $providerId,
                        'status' => '1', // Default to active
                    ]);
                    $surgeryCenterProviderController->store($providerRequest);
                }
            }

            if (!empty($request->procedures_offered)) {
                foreach ($request->procedures_offered as $data) {
                    SCProceduresOfferedDetail::create([
                        'surgery_center_id' => $surgeryCenter->id,
                        'name' => $data,
                    ]);
                }
            }

            return response()->json([
                'message' => 'Surgery Center information saved successfully.',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $surgeryCenter = SurgeryCenter::findOrFail($id);
        return response()->json($surgeryCenter);
    }

    public function update(Request $request, $id)
    {
        try {
            $surgeryCenter = SurgeryCenter::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'nullable|string|max:255',
                'full_address' => 'nullable|string|max:255',
                'latitude'  => 'nullable|string|max:255',
                'longitude' => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:50',
                'zip_code' => 'nullable|string|max:20',
                'phone' => 'nullable|string|max:20',
                'email' => 'nullable|email',
                // 'baa_file' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
                // 'w9_file' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
                // 'facility_lien_file' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
                // 'photo_file' => 'nullable|file|image|max:2048',
                'status' => 'nullable|in:1,0',
                'provider_id' => 'nullable|array',
                'provider_id.*' => 'exists:providers,id',

            ]);

            // // Handle file uploads
            $fileFields = ['baa_file', 'w9_file', 'facility_lien_file', 'photo_file'];
            foreach ($fileFields as $field) {
                if ($request->hasFile($field)) {
                    $path = FileUploadHandler::handleFileUpload($request->file($field), 'surgery_center_files', $surgeryCenter->$field);
                    $validatedData[$field] = $path;
                } else {
                    $validatedData[$field] = '';
                }
            }

            $surgeryCenter->update($validatedData);

            // Update associated providers
            if (isset($validatedData['provider_id'])) {
                $surgeryCenter->providers()->sync($validatedData['provider_id']);
            }

            // Update procedures offered
            if (isset($request['procedures_offered'])) {
                $surgeryCenter->proceduresOffered()->delete(); // Remove old procedures
                foreach ($request['procedures_offered'] as $procedure) {
                    $surgeryCenter->proceduresOffered()->create([
                        'surgery_center_id' => $surgeryCenter->id,
                        'name' => $procedure,
                        'status' => '1', // Default to active
                    ]);
                }
            }

            return response()->json(data: [
                'message' => 'Surgery Center information updated successfully.',
                'surgery_center' => $surgeryCenter
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $SurgeryCenter = SurgeryCenter::where('id', $id)
                ->firstOrFail();

            $SurgeryCenter->deleted = 1;
            $SurgeryCenter->save();

            return response()->json(['message' => 'SurgeryCenter deactivated successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'SurgeryCenter not found or already deactivated'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deactivating the SurgeryCenter.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getSurgeryCentersByProvider($providerId)
    {
        $surgeryCenters = SurgeryCenter::whereHas('providers', function ($query) use ($providerId) {
            $query->where('providers.id', $providerId);
        })->where('status', 1)->get();

        return response()->json($surgeryCenters);
    }
}
