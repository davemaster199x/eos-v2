<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\Patient\PatientIntake;
use App\Models\EliteModel\MRIFacility\MRIFacility;
use App\Models\EliteModel\MRIAppointmentRequest\MRIAppointmentRequest;
use App\Models\EliteModel\Patient\PMedicalRecordsDetail;
use App\Providers\Helpers\FileUploadHandler;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MRIAppointmentRequestController extends Controller
{
    public function index()
    {
        try {
            $limit = request('limit');
            $query = MRIAppointmentRequest::where('deleted', 0)
                ->with(['patient.medicalRecords', 'facility'])->orderBy(
                    PatientIntake::select('first_name')
                        ->whereColumn('patient_intake.id', 'mri_appointment_requests.patient_id')
                        ->limit(1)
                )
                ->orderBy(
                    PatientIntake::select('last_name')
                        ->whereColumn('patient_intake.id', 'mri_appointment_requests.patient_id')
                        ->limit(1)
                );


            if (isset($limit) && $limit > 0) {
                $data = $query->paginate($limit);
            } else {
                $data = $query->get();
            }

            return response()->json($data, 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation error occurred.',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching the appointment requests.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function create()
    {
        $patients = PatientIntake::where('status', 1)->get();
        $facilities = MRIFacility::where('status', 1)->get();
        return view('elite_forms.mri_appointment_request', compact('patients', 'facilities'));
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'high_priority' => 'nullable',
                'patient_id' => 'nullable|exists:patient_intake,id',
                'facility_id' => 'nullable|exists:mri_facility,id',
                'notes' => 'nullable|string',
            ]);

            $appointmentRequest = MRIAppointmentRequest::create($validatedData);

            // Fetch medical records for the selected patient
            $medicalRecords = PMedicalRecordsDetail::where('patient_intake_id', $validatedData['patient_id'])->get();

            return response()->json([
                'message' => 'MRI Appointment Request created successfully.',
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
        try {
            $appointmentRequest = MRIAppointmentRequest::findOrFail($id);
            return response()->json($appointmentRequest);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the MRI Appointment Request.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function edit($id)
    {
        try {
            $appointmentRequest = MRIAppointmentRequest::findOrFail($id);
            $patients = PatientIntake::where('status', 1)->get();
            $facilities = MRIFacility::where('status', 1)->get();
            return view('elite_forms.mri_appointment_request_edit', compact('appointmentRequest', 'patients', 'facilities'));
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the MRI Appointment Request for editing.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $appointmentRequest = MRIAppointmentRequest::findOrFail($id);

            $validatedData = $request->validate([
                'patient_id' => 'nullable|exists:patient_intake,id',
                'facility_id' => 'nullable|exists:mri_facility,id',
                'notes' => 'nullable|string',
                'request_status' => 'nullable|in:Pending,Confirmed,Rejected',
            ]);
            if ($request->hasFile('patient_medical_records')) {
                // Add the file path to the validated data array
                $validatedData['patient_medical_records'] = FileUploadHandler::handleFileUpload($request->file('patient_medical_records'), 'appointment_request_file', $request->patient_medical_records);
            }
            $appointmentRequest->update($validatedData);


            return response()->json([
                'message' => 'MRI Appointment Request updated successfully.',
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
        try {
            $appointmentRequest = MRIAppointmentRequest::findOrFail($id);
            $appointmentRequest->delete();

            return response()->json(['message' => 'MRI Appointment Request deleted successfully']);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the MRI Appointment Request.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
