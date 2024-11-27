<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\MriAppointment\MriAppointment;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MriAppointmentController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Get the limit from the query string, default to 10 if not provided
            $limit = $request->query('limit');

            $query = MriAppointment::where('mri_appointment.deleted', 0)
                ->with([
                    'patient',
                    'mriFacility',
                ]);

            $query->join('patient_intake', 'mri_appointment.patient_id', '=', 'patient_intake.id')
                ->orderBy('patient_intake.first_name')
                ->select('mri_appointment.*');
            $appointments = $query->get();

            // Execute the query and return the results as JSON
            if (isset($limit) && $limit > 0) {
                $appointments = $query->paginate($limit);
            }

            return response()->json($appointments);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while retrieving appointments.', 'error' => $e->getMessage()], 500);
        }
    }

    public function create()
    {
        return view('app');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'patient_id' => 'nullable|exists:patient_intake,id',
                'mri_facility_id' => 'nullable|exists:mri_facility,id',
                'appointment_date' => 'nullable|date',
                'appointment_time' => 'nullable|date_format:H:i',
                'notes' => 'nullable|string',
            ]);

            $validatedData['mri_appt_status'] = 'Pending'; // Default value

            $appointment = MriAppointment::create($validatedData);

            return response()->json(['message' => 'Appointment created successfully', 'appointment' => $appointment], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $appointment = MriAppointment::findOrFail($id);
            return response()->json($appointment);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while retrieving the appointment.', 'error' => $e->getMessage()], 500);
        }
    }

    public function edit($id)
    {
        try {
            $appointment = MriAppointment::findOrFail($id);
            return view('app', compact('appointment'));
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while retrieving the appointment for editing.', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $appointment = MriAppointment::findOrFail($id);

            $validatedData = $request->validate([
                'patient_id' => 'nullable|exists:patient_intake,id',
                'mri_facility_id' => 'nullable|exists:mri_facility,id',
                'appointment_date' => 'nullable|date',
                'appointment_time' => 'nullable',
                'notes' => 'nullable|string',
                'mri_appt_status' => 'nullable|string',
            ]);

            if (isset($validatedData['appointment_time'])) {
                $validatedData['appointment_time'] = date('H:i', strtotime($validatedData['appointment_time']));
            }

            $appointment->update($validatedData);

            return response()->json(['message' => 'Appointment updated successfully', 'appointment' => $appointment]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $appointment = MriAppointment::where('id', $id)
                ->firstOrFail();

            $appointment->deleted = 1;
            $appointment->save();

            return response()->json(['message' => 'Appointment deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the appointment.', 'error' => $e->getMessage()], 500);
        }
    }
}
