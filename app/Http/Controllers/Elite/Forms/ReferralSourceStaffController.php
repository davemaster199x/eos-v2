<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\EliteModel\ReferralSourceStaff\ReferralSourcesStaff;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReferralSourceStaffController extends Controller
{
    public function create()
    {
        return view('app');
    }

    public function index()
    {
        $limit = request('limit');
        $query = ReferralSourcesStaff::where('referral_source_staff.deleted', 0)->with('referralSource');
        $referralSourceStaff = $query->orderBy('referral_source_staff.first_name', 'asc');
        $referralSourceStaff = $query->get();
        if (isset($limit) && $limit > 0) {
            $referralSourceStaff = $query->paginate($limit);
        }

        return response()->json($referralSourceStaff);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'referral_source_id' => 'nullable|exists:referral_source,id', // Assuming the table name is 'referral_sources'
            'first_name' => 'nullable|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'status' => 'nullable|string|in:0,1', // Assuming status is either '0' or '1'
        ]);

        try {
            // Create a new ReferralSourceStaff record
            $staff = ReferralSourcesStaff::create($validatedData);

            // Return a success response
            return response()->json(['message' => 'Staff member added successfully!', 'data' => $staff], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $staff = ReferralSourcesStaff::where('id', $id)->firstOrFail();
        return response()->json($staff);
    }


    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'referral_source_id' => 'nullable|exists:referral_source,id', // Assuming the table name is 'referral_sources'
            'first_name' => 'nullable|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'status' => 'nullable|string|in:0,1', // Assuming status is either '0' or '1'
        ]);

        try {
            // Update the ReferralSourceStaff record
            $staff = ReferralSourcesStaff::where('id', $id)
                ->update($validatedData);

            // Return a success response
            return response()->json(['message' => 'Staff member updated successfully!', 'data' => $staff], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }



    public function destroy($id)
    {
        try {
            $rsstaff = ReferralSourcesStaff::where('id', $id)->firstOrFail();
            $rsstaff->deleted = 1;

            $rsstaff->save();

            return response()->json(['message' => 'Referral Source deactivated successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'RS not found or already deactivated'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deactivating the RS.', 'error' => $e->getMessage()], 500);
        }
    }
}
