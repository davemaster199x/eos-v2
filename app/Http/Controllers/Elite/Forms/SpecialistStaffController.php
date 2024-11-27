<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\EliteModel\SpecialistStaff\SpecialistStaff;
use Illuminate\Validation\ValidationException;

class SpecialistStaffController extends Controller
{
    public function create()
    {
        return view('app');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'specialist_id'         => 'nullable|array',
                'specialist_id.*'       => 'nullable|integer|exists:specialist,id', 
                'title'                 => 'nullable|string|max:200',
                'name'                  => 'nullable|string|max:100',
                'staff_language'        => 'nullable|string|max:50',
                'email'                 => 'nullable|string|email|max:50',
                'phone'                 => 'nullable|string|max:50',
                'point_of_contact'      => 'nullable|array',
                'point_of_contact.*'    => 'nullable|string|max:50',
                'designated_office'     => 'nullable|array',
                'designated_office.*'   => 'nullable|string|max:50',
                'status'                => 'nullable|in:1,0',
            ]);
            
            $specialist_offices = new SpecialistStaff([
                'title'            => $validatedData['title'],
                'name'             => $validatedData['name'],
                'staff_language'   => $validatedData['staff_language'],
                'email'            => $validatedData['email'],
                'phone'            => $validatedData['phone'],
                'status'           => $validatedData['status'],
            ]);
    
            $specialist_offices->save();

            if (isset($validatedData['specialist_id'])) {
                foreach ($validatedData['specialist_id'] as $specialistId) {
                    $specialist_offices->specialistDetails()->create([
                        'specialist_staff_id' => $specialist_offices->id,
                        'specialist_id'       => $specialistId,
                    ]);
                }
            }
    
            if (isset($validatedData['point_of_contact'])) {
                foreach ($validatedData['point_of_contact'] as $pointOfContact) {
                    $specialist_offices->pointOfContactDetails()->create([
                        'specialist_staff_id' => $specialist_offices->id,
                        'point_of_contact'    => $pointOfContact,
                    ]);
                }
            }
    
            if (!empty($validatedData['designated_office'])) {
                foreach ($validatedData['designated_office'] as $designated_office) {
                    $specialist_offices->designatedOfficeDetails()->create([
                        'specialist_staff_id'   => $specialist_offices->id,
                        'specialist_office_id'  => $designated_office,
                    ]);
                }
            }
            
            return response()->json(['message' => 'Specialist Staff information saved successfully.', 'specialist' => $specialist_offices]);            
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }
}
