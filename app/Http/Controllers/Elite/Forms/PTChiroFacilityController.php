<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\PTChiroFacility\PTChiroFacility;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class PTChiroFacilityController extends Controller
{
    public function index()
    {
        $facilities = PTChiroFacility::all();
        return response()->json($facilities);
    }

    public function create()
    {
        return view('app');
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $this->validateFacilityData($request);
            $facility = $this->createFacility($validatedData);
            $this->handleFileUploads($request, $facility);

            return response()->json([
                'message' => 'PT/Chiro Facility information saved successfully.',
                'facility' => $facility
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $facility = PTChiroFacility::findOrFail($id);
            return response()->json($facility);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Facility not found', 'error' => $e->getMessage()], 404);
        }
    }

    public function edit($id)
    {
        try {
            $facility = PTChiroFacility::findOrFail($id);
            return view('app', compact('facility'));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Facility not found', 'error' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $facility = PTChiroFacility::findOrFail($id);
            $validatedData = $this->validateFacilityData($request);
            $facility->fill($validatedData);
            $this->handleFileUploads($request, $facility);

            return response()->json([
                'message' => 'PT/Chiro Facility information updated successfully.',
                'facility' => $facility
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
            $facility = PTChiroFacility::findOrFail($id);
            if ($facility->image) {
                Storage::disk('public')->delete($facility->image);
            }
            $facility->delete();

            return response()->json(['message' => 'Facility deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the facility.', 'error' => $e->getMessage()], 500);
        }
    }

    private function validateFacilityData(Request $request): array
    {
        return $request->validate([
            'name' => 'nullable|string|max:255',
            'full_address' => 'nullable|string|max:255',
            'latitude' => 'nullable|string|max:255',
            'longitude' => 'nullable|string|max:255',
            'street_address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:50',
            'zip_code' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'image' => 'nullable|image',
            'therapies_provided' => 'nullable|array',
            'status' => 'nullable|in:1,0',
            'pay_status' => 'nullable|in:Is Paying,On Hold,Not in Network,For Retention,Is Not Paying',
            'notes' => 'nullable|string',
            'cv_file' => 'nullable|file|mimes:pdf,doc,docx',
            'lien_file' => 'nullable|file|mimes:pdf,doc,docx',
            'provider_collection_form_file' => 'nullable|file|mimes:pdf,doc,docx',
            'contract_file' => 'nullable|file|mimes:pdf,doc,docx',
        ]);
    }

    private function createFacility(array $data): PTChiroFacility
    {
        return PTChiroFacility::create($data);
    }

    private function handleFileUploads(Request $request, PTChiroFacility $facility): void
    {
        $fileFields = ['image', 'cv_file', 'lien_file', 'provider_collection_form_file', 'contract_file'];
        foreach ($fileFields as $field) {
            if ($request->hasFile($field)) {
                $facility->$field = $request->file($field)->store('pt_chiro_facility_files', 'public');
            }
        }
        $facility->save();
    }

    private function validationErrorResponse(ValidationException $e): JsonResponse
    {
        return response()->json([
            'message' => 'Validation error occurred.',
            'errors' => $e->errors()
        ], 422);
    }

    private function generalErrorResponse(\Exception $e): JsonResponse
    {
        return response()->json([
            'message' => 'An error occurred while saving the PT/Chiro Facility information.',
            'error' => $e->getMessage()
        ], 500);
    }
}
