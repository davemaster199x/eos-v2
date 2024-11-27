<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\AppointmentRequest\AppointmentRequest;
use App\Models\EliteModel\AppointmentRequest\PARAppointmentTypes;
use App\Providers\Helpers\FileUploadHandler;
use App\Providers\Helpers\RelatedRecordsHandler;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AppointmentRequestController extends Controller
{
    public function index()
    {
        try {
            $limit = request('limit');
            $providerType = request('provider_type');

            // Build a query to get all law firms.
            // The where clause is used to avoid soft-deleted records.
            $query = AppointmentRequest::where('deleted', 0)
                ->where('provider_type', $providerType)
                ->with('patientIntake')
                ->with('appointmentTypes')
                ->with('provider')
                ->with('providerOffice')
                ->with('surgeryCenter');

            // Sort the results by law firm name in ascending order.
            // $query->orderBy('patient_intake.first_name', 'asc');

            // Get the results of the query.
            // If $limit is set, get the paginated results.
            // Otherwise, get all the results at once.
            if (isset($limit) && $limit > 0) {
                $data = $query->paginate($limit);
            } else {
                $data = $query->get();
            }

            // Return the results as a JSON response.
            return response()->json($data, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching the appointment requests.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function create()
    {
        return view('elite_forms.appointment_request');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'high_priority' => 'nullable|string|max:10',
                'patient_intake_id' => 'nullable|integer',
                'provider_type' => 'nullable|string|max:50',
                'provider_id' => 'nullable|integer',
                'injection_type' => 'nullable|string|max:50',
                'appointment_type' => 'nullable',
                'in_office' => 'nullable|string',
                'at_surgery_center' => 'nullable|string',
                'visit_type' => 'nullable|string|max:50',
                'provider_office_id' => 'nullable',
                'surgery_center_id' => 'nullable',
                'patient_medical_records' => 'nullable|file|max:2048',
                'notes' => 'nullable|string',
                'request_status' => 'nullable|string|max:50',
                'status' => 'nullable|string|max:1',
            ]);


            if ($request->hasFile('patient_medical_records')) {
                $validatedData['patient_medical_records'] = FileUploadHandler::handleFileUpload($request->file('patient_medical_records'), 'appointment_request_file', $request->patient_medical_records);
            }
            $appointmentRequest = AppointmentRequest::create($validatedData);

            if ($validatedData['provider_type'] == "Specialist") {
                PARAppointmentTypes::create([
                    'appointment_request_id' => $appointmentRequest->id,
                    'name' => $validatedData['appointment_type'],
                ]);
            }

            if ($validatedData['provider_type'] == "Therapist") {
                if (!empty($validatedData['appointment_type'])) {
                    foreach ($validatedData['appointment_type'] as $type) {
                        PARAppointmentTypes::create([
                            'appointment_request_id' => $appointmentRequest->id,
                            'name' => $type,
                        ]);
                    }
                }
            }

            return response()->json($appointmentRequest, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $appointmentRequest = AppointmentRequest::findOrFail($id);
            return response()->json($appointmentRequest, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Appointment request not found.',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    public function edit($id)
    {
        try {
            $appointmentRequest = AppointmentRequest::findOrFail($id);
            return view('elite_forms.appointment_request_edit', compact('appointmentRequest'));
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Appointment request not found.',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'high_priority' => 'nullable|string|max:10',
                'patient_intake_id' => 'nullable|integer',
                'provider_type' => 'nullable|string|max:50',
                'provider_id' => 'nullable|integer',
                'appointment_type' => 'nullable',
                'injection_type' => 'nullable|string|max:50',
                'in_office' => 'nullable|string',
                'at_surgery_center' => 'nullable|string',
                'visit_type' => 'nullable|string|max:50',
                'provider_office_id' => 'nullable',
                'surgery_center_id' => 'nullable',
                'notes' => 'nullable|string',
                'request_status' => 'nullable|string|max:50',
                'status' => 'nullable|string|max:1',
            ]);

            $validatedData['patient_medical_records'] = FileUploadHandler::handleFileUpload($request->file('patient_medical_records'), 'appointment_request_file', $request->patient_medical_records);


            $appointmentRequest = AppointmentRequest::findOrFail($id);
            if ($request['provider_type'] == 'Specialist') {
                RelatedRecordsHandler::updateRelatedRecords(
                    $appointmentRequest,
                    'appointmentTypes',
                    $validatedData['appointment_type'] ?? [],
                    'provider_id',
                    'name'
                );
            }

            if ($request['provider_type'] == 'Therapist') {
                RelatedRecordsHandler::updateRelatedRecords(
                    $appointmentRequest,
                    'appointmentTypes',
                    $validatedData['appointment_type'] ?? [],
                    'provider_id',
                    'name'
                );
            }

            $appointmentRequest->update($validatedData);

            return response()->json($appointmentRequest, 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $appointmentRequest = AppointmentRequest::findOrFail($id);
            $appointmentRequest->deleted = 1;
            $appointmentRequest->appointmentTypes()->deleted = 1;
            $appointmentRequest->save();


            return response()->json(['message' => 'Appointment request deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error deleting appointment request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
