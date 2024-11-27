<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EliteModel\PatientAppointment\PatientAppointment;
use App\Models\EliteModel\Patient\PatientIntake;
use App\Models\EliteModel\PatientAppointment\PAAppointmentTypes;
use App\Models\EliteModel\PatientAppointment\PAItemsNeeded;
use App\Models\EliteModel\Provider\Provider;
use App\Models\EliteModel\ProviderOffice\ProviderOffice;
use App\Models\EliteModel\SurgeryCenter\SurgeryCenter;
use App\Providers\Helpers\FileUploadHandler;
use App\Providers\Helpers\RelatedRecordsHandler;
use Exception;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PatientAppointmentController extends Controller
{
    public function index()
    {
        try {
            $limit = request('limit');
            $provider_type = request('provider_type');
            $query = PatientAppointment::where('deleted', 0)
                ->whereHas('provider', function ($q) use ($provider_type) {
                    $q->where('provider_type', $provider_type);
                })
                ->with([
                    'patient.medicalRecords',
                    'patient.referralsource',
                    'patient.referralsourcestaff',
                    'appointmentTypes',
                    'provider.offices',
                    'provider.centers',
                    'providerOffice',
                    'itemsNeeded',
                    'surgeryCenter'
                ])

                ->orderBy(
                    PatientIntake::select('first_name')
                        ->whereColumn('patient_intake.id', 'patient_appointments.patient_id')
                        ->limit(1)
                )
                ->orderBy(
                    PatientIntake::select('last_name')
                        ->whereColumn('patient_intake.id', 'patient_appointments.patient_id')
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
        return view('app');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'patient_id' => 'nullable|exists:patient_intake,id',
                'provider_id' => 'nullable|exists:providers,id',
                'appointment_type' => 'nullable',
                'injection_type' => 'nullable|string',
                'in_office' => 'nullable|string',
                'at_surgery_center' => 'nullable|string',
                'provider_office_id' => 'nullable|exists:provider_offices,id',
                'surgery_center_id' => 'nullable|exists:surgery_centers,id',
                'visit_type' => 'nullable|string',
                'appointment_date' => 'nullable|date',
                'appointment_time' => 'nullable|date_format:H:i',
                'items_needed' => 'nullable|array',
                'items_needed.*' => 'nullable|string',
                'lien_file' => 'nullable|file|max:10240',
                'special_notes' => 'nullable|string',
            ]);

            $validatedData['appt_id'] = 'APPT-' . Str::random(8);
            // if injection type is In Office null at_surgery_center
            // if injection type is At Surgery Center, null in_office
            if ($validatedData['injection_type'] == 'In Office') {
                $validatedData['at_surgery_center'] = null;
            }

            if ($validatedData['injection_type'] == 'At Surgery Center') {
                $validatedData['in_office'] = null;
            }

            if ($request->hasFile('lien_file')) {
                $validatedData['lien_file'] = FileUploadHandler::handleFileUpload($request->file('lien_file'), 'patient-appointments', $validatedData['lien_file']);
            }

            $appointment = PatientAppointment::create($validatedData);

            if (isset($validatedData['items_needed'])) {
                RelatedRecordsHandler::updateRelatedRecords($appointment, 'itemsNeeded', $validatedData['items_needed'], 'patient_appointment_id', 'name');
            }

            if (!empty($validatedData['appointment_type'])) {
                // If appointment_type is array
                if (is_array($validatedData['appointment_type'])) {
                    foreach ($validatedData['appointment_type'] as $type) {
                        PAAppointmentTypes::create([
                            'patient_appointment_id' => $appointment->id,
                            'name' => $type,
                        ]);
                    }
                } else {
                    PAAppointmentTypes::create([
                        'patient_appointment_id' => $appointment->id,
                        'name' => $validatedData['appointment_type'],
                    ]);
                }
            }


            return response()->json(['message' => 'Appointment created successfully', 'appointment' => $appointment]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $appointment = PatientAppointment::findOrFail($id);
        return response()->json($appointment);
    }

    public function edit($id)
    {
        $appointment = PatientAppointment::findOrFail($id);
        $patients = PatientIntake::where('status', 1)->get();
        $providers = Provider::where('status', 1)->get();
        return view('app', compact('appointment', 'patients', 'providers'));
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'patient_id' => 'nullable|exists:patient_intake,id',
                'provider_id' => 'nullable|exists:providers,id',
                'appointment_type' => 'nullable|string',
                'injection_type' => 'nullable|string',
                'in_office' => 'nullable|string',
                'at_surgery_center' => 'nullable|string',
                'provider_office_id' => 'nullable|exists:provider_offices,id',
                'surgery_center_id' => 'nullable|exists:surgery_centers,id',
                'visit_type' => 'nullable|string',
                'appointment_date' => 'nullable|date',
                'appointment_time' => 'nullable|date_format:H:i',
                'items_needed' => 'nullable|array',
                'lien_file' => 'nullable|file|max:10240',
                'special_notes' => 'nullable|string',
            ]);

            $appointment = PatientAppointment::findOrFail($id);
            if (isset($validatedData['items_needed'])) {
                RelatedRecordsHandler::updateRelatedRecords($appointment, 'itemsNeeded', $validatedData['items_needed'], 'patient_appointment_id', 'name');
            }

            if ($request->hasFile('lien_file')) {
                $validatedData['lien_file'] = FileUploadHandler::handleFileUpload($request->file('lien_file'), 'patient-appointments', $validatedData['lien_file']);
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
            $appointment = PatientAppointment::findOrFail($id);
            $appointment->delete();
            return response()->json(['message' => 'Appointment deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting appointment', 'error' => $e->getMessage()], 500);
        }
    }

    public function getProviderOffices($providerId,)
    {
        $providerType =  request()->input('provider_type');
        if ($providerType) {
            $offices = ProviderOffice::where('provider_id', $providerId)->where('status', 1)->where('provider_type', $providerType)->get();
            return response()->json($offices);
        }
        $offices = ProviderOffice::where('provider_id', $providerId)->where('status', 1)->get();
        return response()->json($offices);
    }

    public function getSurgeryCenters($providerId)
    {
        $centers = SurgeryCenter::where('provider_id', $providerId)->where('status', 1)->get();
        return response()->json($centers);
    }
}
