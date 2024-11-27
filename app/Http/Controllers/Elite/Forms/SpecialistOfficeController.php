<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EliteModel\SpecialistOffice\SpecialistOffice;
use App\Models\EliteModel\SpecialistOffice\SpecialtiesOfferedDetail;
use Illuminate\Validation\ValidationException;

class SpecialistOfficeController extends Controller
{
    public function create()
    {
        // Simply return the view; React handles the form itself
        return view('app'); // Assuming 'app' is the view that loads your React application
    }

    public function get_specialist_office(Request $request, $specialistId = null)
    {
        $specialistOfficeQuery = SpecialistOffice::where('status', 1);

        if ($specialistId) {
            $specialistOfficeQuery->where('specialist_id', $specialistId);
        } elseif ($request->has('specialist_id')) {
            $specialistIds = $request->input('specialist_id');
            if (is_array($specialistIds)) {
                $specialistOfficeQuery->whereIn('specialist_id', $specialistIds);
            } else {
                $specialistOfficeQuery->where('specialist_id', $specialistIds);
            }
        }

        $specialistOffices = $specialistOfficeQuery->get();
        return response()->json($specialistOffices);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'specialist_id' => 'nullable|integer|exists:specialist,id',
                'full_address' => 'nullable|string|max:255',
                'latitude' => 'nullable|string|max:255',
                'longitude' => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:100',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'zip' => 'nullable|string|max:50',
                'office_name' => 'nullable|string|max:100',
                'office_notes' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:50',
                'specialties_offered' => 'nullable|array',
                'specialties_offered.*' => 'nullable|string|max:100',
                'image_of_office' => 'nullable|file|image',
                'status' => 'nullable|in:1,0',
            ]);

            // Processing the validated data and saving it to the database
            $specialist_offices = new SpecialistOffice([
                'specialist_id' => $validatedData['specialist_id'],
                'full_address' => $validatedData['full_address'],
                'latitude' => $validatedData['latitude'],
                'longitude' => $validatedData['longitude'],
                'street_address' => $validatedData['street_address'],
                'city' => $validatedData['city'],
                'state' => $validatedData['state'],
                'zip' => $validatedData['zip'],
                'office_name' => $validatedData['office_name'],
                'office_notes' => $validatedData['office_notes'],
                'phone' => $validatedData['phone'],
                'status' => $validatedData['status'],
                'specialties_offered' => $validatedData['specialties_offered'] ?? [],
            ]);

            if ($request->hasFile('image_of_office')) {
                $specialist_offices->image_of_office = $request->file('image_of_office')->store('specialist_office_logos', 'public');
            }

            $specialist_offices->save();

            if (!empty($validatedData['specialties_offered'])) {
                foreach ($validatedData['specialties_offered'] as $data) {
                    SpecialtiesOfferedDetail::create([
                        'specialist_office_id' => $specialist_offices->id,
                        'specialties_offered' => $data,
                    ]);
                }
            }

            return response()->json(['message' => 'Specialist Office information saved successfully.', 'specialist' => $specialist_offices]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }
}
