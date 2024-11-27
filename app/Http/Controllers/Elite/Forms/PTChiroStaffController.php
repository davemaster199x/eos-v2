<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\PTChiroFacility\PTChiroFacility;
use App\Models\EliteModel\PTChiroStaff\PTChiroStaff;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PTChiroStaffController extends Controller
{
    public function create()
    {
        $facilities = PTChiroFacility::where('status', '1')->get();
        return view('elite_forms.pt_chiro_staff', compact('facilities'));
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'first_name' => 'nullable|string|max:255',
                'middle_name' => 'nullable|string|max:255',
                'last_name' => 'nullable|string|max:255',
                'title' => 'nullable|string|max:255',
                'email' => 'nullable|email|unique:pt_chiro_staff,email',
                'phone' => 'nullable|string|max:20',
                'status' => 'nullable|in:1,0',
                'facilities' => 'nullable|array',
                'facilities.*' => 'exists:pt_chiro_facilities,id',
            ]);

            $staff = PTChiroStaff::create($validatedData);
            $staff->facilities()->attach($validatedData['facilities']);

            return response()->json([
                'message' => 'PT/Chiro Staff added successfully.',
                'staff' => $staff
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }
}