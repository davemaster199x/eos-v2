<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\Patient\PatientIntake;
use App\Models\EliteModel\PTChiroFacility\PTChiroFacility;
use App\Models\EliteModel\PTChiroAppointmentRequest\PTChiroAppointmentRequest;
use App\Models\EliteModel\Patient\PMedicalRecordsDetail;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PTChiroAppointmentRequestController extends Controller
{
    public function index()
    {
        $appointments = PTChiroAppointmentRequest::all();
        return response()->json($appointments);
    }

    public function create()
    {
        $patients = PatientIntake::where('status', 1)->get();
        $facilities = PTChiroFacility::where('status', 1)->get();
        return view('elite_forms.pt_chiro_appointment_request', compact('patients', 'facilities'));
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'patient_id' => 'nullable|exists:patient_intake,id',
                'facility_id' => 'nullable|exists:pt_chiro_facilities,id',
                'appointment_types' => 'nullable|array',
                'appointment_types.*' => 'nullable|string',
                'notes' => 'nullable|string',
            ]);

            $appointmentRequest = PTChiroAppointmentRequest::create($validatedData);

            // Fetch medical records for the selected patient
            $medicalRecords = PMedicalRecordsDetail::where('patient_intake_id', $validatedData['patient_id'])->get();

            return response()->json([
                'message' => 'PT/Chiro Appointment Request created successfully.',
                'appointmentRequest' => $appointmentRequest,
                'medicalRecords' => $medicalRecords
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $appointment = PTChiroAppointmentRequest::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment request not found'], 404);
        }

        return response()->json($appointment);
    }

    public function edit($id)
    {
        $appointment = PTChiroAppointmentRequest::findOrFail($id);
        $patients = PatientIntake::where('status', 1)->get();
        $facilities = PTChiroFacility::where('status', 1)->get();
        return view('elite_forms.pt_chiro_appointment_request_edit', compact('appointment', 'patients', 'facilities'));
    }

    public function update(Request $request, $id)
    {
        try {
            $appointmentRequest = PTChiroAppointmentRequest::findOrFail($id);

            $validatedData = $request->validate([
                'patient_id' => 'nullable|exists:patient_intake,id',
                'facility_id' => 'nullable|exists:pt_chiro_facilities,id',
                'appointment_types' => 'nullable|array',
                'notes' => 'nullable|string',
                'request_status' => 'nullable|in:Pending,Confirmed,Rejected',
            ]);

            $appointmentRequest->update($validatedData);

            return response()->json([
                'message' => 'PT/Chiro Appointment Request updated successfully.',
                'appointmentRequest' => $appointmentRequest
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $appointment = PTChiroAppointmentRequest::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment request not found'], 404);
        }

        $appointment->delete();

        return response()->json(['message' => 'Appointment request deleted successfully.']);
    }
}
