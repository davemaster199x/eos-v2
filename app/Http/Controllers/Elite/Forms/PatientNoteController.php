<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\EliteModel\PatientNote\PatientNote;
use Illuminate\Validation\ValidationException;

class PatientNoteController extends Controller
{
    public function create()
    {
        return view('app');
    }

    public function index()
    {
        $patientnotes = PatientNote::where('status', 1)->get();
        return response()->json($patientnotes);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'patient_intake_id' => 'nullable|integer|exists:patient_intake,id',
            'note_type' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:255',
        ]);

        try {
            // Create a new PatientNote record
            $patientNote = PatientNote::create($validatedData);

            // Return a success response
            return response()->json(['message' => 'Patient note added successfully!', 'data' => $patientNote], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }
}
