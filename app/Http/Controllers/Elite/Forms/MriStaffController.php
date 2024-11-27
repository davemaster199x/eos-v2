<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\MriStaff\MriStaff;
use App\Models\EliteModel\MriStaff\MriStaffAssignedFacility;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MriStaffController extends Controller
{
    public function index(Request $request)
    {
        try {
            $limit = $request->query('limit');
            $query = MriStaff::where('deleted', 0)->with(['assignedFacilities.facility']);

            $query->orderBy('first_name');
            $mriStaffs = $query->get();

            if (isset($limit) && $limit > 0) {
                $mriStaffs = $query->paginate($limit);
            }
            return response()->json($mriStaffs, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching the MRI staff.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function create()
    {
        return view('elite_forms.mri_staff');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'mri_facility_id'   => 'nullable|array',
                'mri_facility_id.*' => 'nullable|exists:mri_facility,id',
                'first_name'        => 'nullable|string|max:100',
                'middle_name'       => 'nullable|string|max:100',
                'last_name'         => 'nullable|string|max:100',
                'title'             => 'nullable|string',
                'email'             => 'nullable|string|email|max:100',
                'phone'             => 'nullable|string|max:100',
                'status'            => 'nullable|string|max:1',
            ]);

            $mriStaff = MriStaff::create([
                'first_name'  => $validatedData['first_name'],
                'middle_name' => $validatedData['middle_name'],
                'last_name'   => $validatedData['last_name'],
                'title'       => $validatedData['title'],
                'email'       => $validatedData['email'],
                'phone'       => $validatedData['phone'],
                'status'      => $validatedData['status'],
            ]);

            foreach ($validatedData['mri_facility_id'] as $facilityId) {
                MriStaffAssignedFacility::create([
                    'mri_facility_id' => $facilityId,
                    'mri_staff_id'    => $mriStaff->id,
                ]);
            }

            return response()->json(['message' => 'MRI Staff information saved successfully.', 'Mri' => $mriStaff]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $mriStaff = MriStaff::findOrFail($id);
            return response()->json($mriStaff);
        } catch (Exception $e) {
            return response()->json(['message' => 'MRI Staff not found', 'error' => $e->getMessage()], 404);
        }
    }

    public function edit($id)
    {
        try {
            $mriStaff = MriStaff::findOrFail($id);
            return view('elite_forms.mri_staff_edit', compact('mriStaff'));
        } catch (Exception $e) {
            return response()->json(['message' => 'MRI Staff not found', 'error' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $mriStaff = MriStaff::findOrFail($id);

            $validatedData = $request->validate([
                'mri_facility_id'   => 'nullable|array',
                'mri_facility_id.*' => 'nullable|exists:mri_facility,id',
                'first_name'        => 'nullable|string|max:100',
                'middle_name'       => 'nullable|string|max:100',
                'last_name'         => 'nullable|string|max:100',
                'title'             => 'nullable|string',
                'email'             => 'nullable|string|email|max:100',
                'phone'             => 'nullable|string|max:100',
                'status'            => 'nullable|string|max:1',
            ]);;

            $mriStaff->update([
                'first_name'  => $validatedData['first_name'],
                'middle_name' => $validatedData['middle_name'],
                'last_name'   => $validatedData['last_name'],
                'title'       => $validatedData['title'],
                'email'       => $validatedData['email'],
                'phone'       => $validatedData['phone'],
                'status'      => $validatedData['status'],
            ]);

            // Sync MRI Staff assigned facilities
            if (isset($validatedData['mri_facility_id'])) {
                $mriStaff->assignedFacilities()->delete();
                foreach ($validatedData['mri_facility_id'] as $facilityId) {
                    $mriStaff->assignedFacilities()->create([
                        'mri_facility_id' => $facilityId,
                      ]);
                }
            }

            return response()->json(['message' => 'MRI Staff information updated successfully.', 'Mri' => $mriStaff]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $mriStaff = MriStaff::where('id', $id)->firstOrFail();
            $mriStaff->deleted = 1;
            $mriStaff->save();
            return response()->json(['message' => 'MRI Staff deleted successfully']);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the MRI Staff.', 'error' => $e->getMessage()], 500);
        }
    }
}
