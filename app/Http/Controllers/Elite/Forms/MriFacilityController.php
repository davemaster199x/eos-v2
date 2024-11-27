<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\MriFacility\MriFacility;
use App\Providers\Helpers\FileUploadHandler;
use Faker\Core\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class MriFacilityController extends Controller
{
    public function index()
    {
        $limit = request('limit');
        $query = MriFacility::where('deleted', 0)->orderBy('facility_name', 'asc');

        $data = $query->get();

        if (isset($limit) && $limit > 0) {
            $data = $query->paginate($limit);
        }

        return response()->json($data);
    }

    public function create()
    {
        return view('app');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'facility_name'    => 'nullable|string|max:100',
                'full_address'     => 'nullable|string|max:255',
                'latitude'         => 'nullable|string|max:255',
                'longitude'        => 'nullable|string|max:255',
                'street_address'   => 'nullable|string|max:100',
                'city'             => 'nullable|string|max:50',
                'state'            => 'nullable|string|max:50',
                'zip_code'              => 'nullable|string|max:50',
                'phone'            => 'nullable|string|max:50',
                'email'            => 'nullable|string|max:50',
                // 'image_of_office'  => 'nullable|file|image|max:2048',
                'status'           => 'nullable|string|max:5',
            ]);

            if ($request->hasFile('image_of_office')) {
                $path = FileUploadHandler::handleFileUpload($request->file('image_of_office'), 'mri_facility_files');
                $validatedData['image_of_office'] = $path;
            }

            $mriFacility = new MriFacility([
                'facility_name'   => $validatedData['facility_name'],
                'full_address'    => $validatedData['full_address'],
                'latitude'        => $validatedData['latitude'],
                'longitude'       => $validatedData['longitude'],
                'street_name'     => $validatedData['street_address'],
                'city'            => $validatedData['city'],
                'state'           => $validatedData['state'],
                'zip_code'        => $validatedData['zip_code'],
                'phone'           => $validatedData['phone'],
                'email'           => $validatedData['email'],
                'image_of_office' => $validatedData['image_of_office'] ?? null,
                'status'          => $validatedData['status'],
            ]);

            $mriFacility->save();

            return response()->json(['message' => 'Mri Facility information saved successfully.', 'Mri' => $mriFacility]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $mriFacility = MriFacility::findOrFail($id);
            return response()->json($mriFacility);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Facility not found', 'error' => $e->getMessage()], 404);
        }
    }

    public function edit($id)
    {
        try {
            $mriFacility = MriFacility::findOrFail($id);
            return view('elite_forms.mri_facility_edit', compact('mriFacility'));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Facility not found', 'error' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $mriFacility = MriFacility::findOrFail($id);

            $validatedData = $request->validate([
                'facility_name'    => 'nullable|string|max:100',
                'full_address'     => 'nullable|string|max:255',
                'latitude'         => 'nullable|string|max:255',
                'longitude'        => 'nullable|string|max:255',
                'street_address'   => 'nullable|string|max:100',
                'city'             => 'nullable|string|max:50',
                'state'            => 'nullable|string|max:50',
                'zip_code'              => 'nullable|string|max:50',
                'phone'            => 'nullable|string|max:50',
                'email'            => 'nullable|email|max:255',
                'status'           => 'nullable|string|max:50',
                // 'image_of_office'  => 'nullable|file|image|max:2048',
            ]);

            if ($request->hasFile('image_of_office')) {
                $validatedData['image_of_office'] =
                    FileUploadHandler::handleFileUpload($request->file('image_of_office'), 'mri_facility_files', $mriFacility->image_of_office);;
            }

            $mriFacility->update([
                'facility_name'   => $validatedData['facility_name'],
                'full_address'    => $validatedData['full_address'],
                'latitude'        => $validatedData['latitude'] ?? null,
                'longitude'       => $validatedData['longitude'] ?? null,
                'street_address'  => $validatedData['street_address'],
                'city'            => $validatedData['city'],
                'state'           => $validatedData['state'],
                'zip_code'        => $validatedData['zip_code'],
                'phone'           => $validatedData['phone'],
                'email'           => $validatedData['email'] ?? null,
                'status'          => $validatedData['status'],
                'image_of_office' => $validatedData['image_of_office'] ?? null,
            ]);

            return response()->json(['message' => 'MRI Facility information updated successfully.', 'mri' => $mriFacility]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $mriFacility = MriFacility::where('id', $id)
                ->firstOrFail();

            $mriFacility->deleted = 1;
            $mriFacility->save();

            return response()->json(['message' => 'Facility deactivated successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Facility not found or already deactivated'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deactivating the facility.', 'error' => $e->getMessage()], 500);
        }
    }
}
