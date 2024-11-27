<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EliteModel\ReferralSource\ReferralSource;
use Illuminate\Validation\ValidationException;
use App\Providers\Helpers\FileUploadHandler;

class ReferralSourceController extends Controller
{
    public function create()
    {
        return view('app');
    }

    public function index()
    {
        $limit = request('limit');
        $query = ReferralSource::where('deleted', 0)->with('referralSourceStaff');
        $referralsource = $query->orderBy('referral_source_name', 'asc');
        $referralsource = $query->get();
        if (isset($limit) && $limit > 0) {
            $referralsource = $query->paginate($limit);
        }
        return response()->json($referralsource);
    }

    public function store(Request $request)
    {
        try {
            // Validate the request data
            $validatedData = $request->validate([
                'referral_source_name' => 'nullable|string|max:100',
                'business_type' => 'nullable|string|max:50',
                // 'logo' => 'nullable|file|max:2048',
                'full_address' => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:100',
                'city' => 'nullable|string|max:50',
                'state' => 'nullable|string|max:50',
                'zip_code' => 'nullable|string|max:10',
                'phone' => 'nullable|string|max:100',
                'email' => 'nullable|email|max:50',
            ]);
            $validatedData['logo'] = FileUploadHandler::handleFileUpload($request->file('logo'), 'referral-source-files',);
            // Create the referral source in the database
            ReferralSource::create($validatedData);

            // Return success response
            return response()->json(['message' => 'Referral source added successfully!'], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $ReferralSource = ReferralSource::where('id', $id)->where('deleted', 0)
            ->firstOrFail();
        return response()->json($ReferralSource);
    }

    public function update(Request $request, $id)
    {
        try {
            // Validate the request data
            $validatedData = $request->validate([
                'referral_source_name' => 'nullable|string|max:100',
                'business_type' => 'nullable|string|max:50',
                // 'logo' => 'nullable|file|max:2048',
                'full_address' => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:100',
                'city' => 'nullable|string|max:50',
                'state' => 'nullable|string|max:50',
                'zip_code' => 'nullable|string|max:10',
                'phone' => 'nullable|string|max:100',
                'email' => 'nullable|email|max:50',
            ]);
            $validatedData['logo'] = FileUploadHandler::handleFileUpload($request->file('logo'), 'referral-source-files', $request->logo);
            // Update the referral source in the database
            ReferralSource::where('id', $id)
                ->update($validatedData);

            // Return success response
            return response()->json(['message' => 'Referral source updated successfully!'], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return validation error response
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Log the exception message and return an error response
            \Log::error('Failed to update referral source: ' . $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $ReferralSource = ReferralSource::where('id', $id)
                ->firstOrFail();

            $ReferralSource->deleted = 1;
            $ReferralSource->save();

            return response()->json(['message' => 'Provider Office deactivated successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Provider not found or already deactivated'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deactivating the Provider.', 'error' => $e->getMessage()], 500);
        }
    }
}
