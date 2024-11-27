<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EliteModel\LawFirm\LawFirm;
use App\Providers\Helpers\FileUploadHandler;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class LawFirmController extends Controller
{
    public function index()
    {
        // Get the 'limit' query parameter from the request.
        // If it's not provided, $limit will be null.
        $limit = request('limit');

        // Build a query to get all law firms.
        // The where clause is used to avoid soft-deleted records.
        $query = LawFirm::where('deleted', 0);

        // Sort the results by law firm name in ascending order.
        $query->orderBy('law_firm_name', 'asc');

        // Get the results of the query.
        // If $limit is set, get the paginated results.
        // Otherwise, get all the results at once.
        $lawFirms = $query->get();
        if (isset($limit) && $limit > 0) {
            $lawFirms = $query->paginate($limit);
        } else {
            $lawFirms = $query->get();
        }

        // Return the results as a JSON response.
        return response()->json($lawFirms);
    }

    public function create()
    {
        return view('app');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'law_firm_name'  => 'nullable|string|max:100',
                'firm_type'      => 'nullable|string|max:50',
                // 'logo'           => 'nullable|file|image',
                'full_address'   => 'nullable|string',
                'latitude'       => 'nullable|string|max:255',
                'longitude'      => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:100',
                'city'           => 'nullable|string|max:100',
                'state'          => 'nullable|string|max:100',
                'zip'            => 'nullable|string|max:50',
                'phone'          => 'nullable|string|max:100',
                'email'          => 'nullable|email|max:100',
            ]);

            $firm = new LawFirm($validatedData);

            if ($request->hasFile('logo')) {
                $firm->logo = $request->file('logo')->store('law-firm-files', 'public');
            }

            $firm->save();

            return response()->json(['message' => 'Firm information saved successfully.']);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $lawFirm = LawFirm::findOrFail($id);
        return response()->json($lawFirm);
    }

    public function edit($id)
    {
        // Return the form for editing the law firm (e.g., return view('edit_law_firm', ['lawFirm' => $lawFirm]));
    }

    public function update(Request $request, $id)
    {
        try {
            $firm = LawFirm::findOrFail($id);

            $validatedData = $request->validate([
                'law_firm_name'  => 'nullable|string|max:100',
                'firm_type'      => 'nullable|string|max:50',
                // 'logo'           => 'nullable|file|image|max:2048', // Re-enable logo upload
                'full_address'   => 'nullable|string|max:255',
                'latitude'       => 'nullable|string|max:255',
                'longitude'      => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:100',
                'city'           => 'nullable|string|max:100',
                'state'          => 'nullable|string|max:100',
                'zip'            => 'nullable|string|max:50',
                'phone'          => 'nullable|string|max:100',
                'email'          => 'nullable|email|max:100',
            ]);

            if ($request->hasFile('logo')) {
                $validatedData['logo'] = FileUploadHandler::handleFileUpload($request->file('logo'), 'law-firm-files', $firm->logo);
            }

            $firm->update($validatedData);

            return response()->json([
                'message' => 'Firm information updated successfully.',
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
            $firm = LawFirm::where('id', $id)
                ->firstOrFail();

            $firm->deleted = 1;
            $firm->save();

            return response()->json(['message' => 'Firm information deactivated successfully.']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Firm not found or already deactivated.'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deactivating the firm information.', 'error' => $e->getMessage()], 500);
        }
    }
}
