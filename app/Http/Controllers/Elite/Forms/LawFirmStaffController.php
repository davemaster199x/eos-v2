<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EliteModel\LawFirm\LawFirmStaff;
use App\Models\EliteModel\LawFirm\LawFirm;
use Illuminate\Validation\ValidationException;

class LawFirmStaffController extends Controller
{
    public function index(Request $request)
    {
        $law_firm_id = $request->query('law_firm_id');
        // Fetch all active law firm staff
        if ($law_firm_id) {
            $staff = LawFirmStaff::where('status', 1)->where('law_firm_id', $law_firm_id)->get();
        }
        $staff = LawFirmStaff::where('status', 1)->get();
        return response()->json($staff);
    }

    public function create()
    {
        // Fetch the list of law firms
        $lawFirms = LawFirm::where('status', 1)->get();

        // Return the view with the list of law firms
        return view('app', compact('lawFirms'));
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'law_firm_id' => 'nullable|exists:law_firm,id',
                'first_name'  => 'nullable|string|max:100',
                'last_name'   => 'nullable|string|max:100',
                'title'       => 'nullable|string|max:100',
                'phone'       => 'nullable|string|max:100',
                'email'       => 'nullable|email|max:100',
            ]);

            $staff = LawFirmStaff::create($validatedData);

            return response()->json(['message' => 'Staff member added successfully.', 'staff' => $staff]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $staff = LawFirmStaff::findOrFail($id);
            return response()->json($staff);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Staff member not found.', 'error' => $e->getMessage()], 404);
        }
    }

    public function edit($id)
    {
        try {
            $staff = LawFirmStaff::findOrFail($id);
            // Return the form for editing the law firm staff member
        } catch (\Exception $e) {
            return response()->json(['message' => 'Staff member not found.', 'error' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'law_firm_id' => 'nullable|exists:law_firms,id',
                'first_name'  => 'nullable|string|max:100',
                'last_name'   => 'nullable|string|max:100',
                'title'       => 'nullable|string|max:100',
                'phone'       => 'nullable|string|max:100',
                'email'       => 'nullable|email|max:100',
            ]);

            $staff = LawFirmStaff::findOrFail($id);
            $staff->update($validatedData);

            return response()->json(['message' => 'Staff member updated successfully.', 'staff' => $staff]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $staff = LawFirmStaff::findOrFail($id);
            $staff->delete();

            return response()->json(['message' => 'Staff member deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the staff member.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getLawfirmStaffsByLawFirmId($law_firm_id = null)
    {
        try {
            $lawFirmStaffs = LawFirm::with('lawFirmStaffs')->where('status', 1)->findOrFail($law_firm_id)->lawFirmStaffs;

            // $query = LawFirmStaff::where('status', 1);

            // if ($law_firm_id) {
            //     $query->where('law_firm_id', $law_firm_id);
            // }

            // $lawFirmStaff = $query->get();

            return response()->json($lawFirmStaffs);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while retrieving the staff members.', 'error' => $e->getMessage()], 500);
        }
    }
}
