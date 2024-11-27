<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\PTChiroAppointment\PTChiroAppointment;
use App\Models\EliteModel\PTChiroFacility\PTChiroFacility;
use App\Models\EliteModel\Patient\PatientIntake;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PTChiroAppointmentController extends Controller
{
    public function create()
    {
        $patients = PatientIntake::where('status', 1)->get();
        $facilities = PTChiroFacility::where('status', 1)->get();
        return view('elite_forms.pt_chiro_appointment', compact('patients', 'facilities'));
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'patient_id' => 'nullable|exists:patient_intake,id',
                'facility_id' => 'nullable|exists:pt_chiro_facilities,id',
                'appointment_type' => 'nullable|array',
                'visit_type' => 'nullable|in:In Person,Telemedicine',
                'appointment_date' => 'nullable|date',
                'appointment_time' => 'nullable|date_format:H:i',
                'special_notes' => 'nullable|string',
                'appointment_status' => 'nullable|in:Pending,Cancelled,Rescheduled,Completed,No-Show',
            ]);

            $appointment = new PTChiroAppointment($validatedData);
            $appointment->save();

            return response()->json([
                'message' => 'PT/Chiro Appointment created successfully.',
                'appointment' => $appointment
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, PTChiroAppointment $appointment)
    {
        try {
            $validatedData = $request->validate([
                'patient_id' => 'nullable|exists:patient_intake,id',
                'facility_id' => 'nullable|exists:pt_chiro_facilities,id',
                'appointment_type' => 'nullable|array',
                'visit_type' => 'nullable|in:In Person,Telemedicine',
                'appointment_date' => 'nullable|date',
                'appointment_time' => 'nullable|date_format:H:i',
                'special_notes' => 'nullable|string',
                'appointment_status' => 'nullable|in:Pending,Cancelled,Rescheduled,Completed,No-Show',
            ]);

            $appointment->update($validatedData);

            return response()->json([
                'message' => 'PT/Chiro Appointment updated successfully.',
                'appointment' => $appointment
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }
}