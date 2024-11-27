<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\EliteModel\Patient\PatientIntake;
use App\Models\EliteModel\Patient\PEmcOwnerDetail;
use App\Models\EliteModel\Patient\POtherCaseManagerDetail;
use App\Models\EliteModel\Patient\PMedicalRecordsDetail;
use App\Providers\Helpers\FileUploadHandler;
use App\Providers\Helpers\RelatedRecordsHandler;
use Illuminate\Support\Facades\Storage;

class PatientController extends Controller
{
    public function index(Request $request)
    {

        // Get the limit from the query string, default to 10 if not provided
        $limit = $request->query('limit');

        $query = PatientIntake::where('deleted', 0)
            ->with([
                'medicalRecords',
                'lawfirm',
                'emcOwners',
                'referralsource.referralSourceStaff',
                'otherCaseManagers',
                'referralSourceStaff',
            ]);

        $query->orderBy('first_name');
        $patients = $query->get();

        // Execute the query and return the results as JSON
        if (isset($limit) && $limit > 0) {
            $patients = $query->paginate($limit);
        }

        return response()->json($patients);
    }

    public function create()
    {
        return view('app');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'law_firm_id' => 'nullable|exists:law_firm,id',
                'is_vip' => 'nullable|string|in:1,0|max:1',
                'referral_source_id' => 'nullable|integer',
                'referral_source_staff_id' => 'nullable|integer',
                'first_name' => 'nullable|string|max:50',
                'middle_name' => 'nullable|string|max:50',
                'last_name' => 'nullable|string|max:50',
                'preferred_language' => 'nullable|string|max:50',
                'gender' => 'nullable|string|max:10',
                'date_of_birth' => 'nullable|date_format:Y-m-d',
                'date_of_injury' => 'nullable|date_format:Y-m-d',
                'phone' => 'nullable|string|max:100',
                'email' => 'nullable|string|email|max:100',
                'full_address' => 'nullable|string|max:100',
                'latitude' => 'nullable|string|max:100',
                'longitude' => 'nullable|string|max:100',
                'street_address' => 'nullable|string|max:100',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'zip_code' => 'nullable|string|max:50',
                'accident_type' => 'nullable|string|max:50',
                'medical_note' => 'nullable|string|max:100',
                'emc_owner' => 'nullable|array',
                'emc_owner.*' => 'nullable|string|max:100',
                'other_case_managers' => 'nullable|array',
                'other_case_managers.*' => 'nullable|string|max:100',
                'medicalFiles' => 'nullable|array',
                'medicalFiles.*' => 'nullable|file|max:10240',
            ]);

            $patient = PatientIntake::create($validatedData);
            if ($request->hasFile('medicalFiles')) {
                $paths = [];
                foreach ($request->file('medicalFiles') as $file) {
                    $path = FileUploadHandler::handleFileUpload($file, 'patient_files');
                    $patient->medicalRecords()->create(attributes: [
                        'patient_intake_id' => $patient->id,
                        'medical_records_file' => $path
                    ]);
                    $paths = array_merge($paths, [$path]);
                }
                RelatedRecordsHandler::updateRelatedRecords($patient, 'medicalRecords',  $paths, 'patient_intake_id', 'medical_records_file');
            } else {
                RelatedRecordsHandler::updateRelatedRecords($patient, 'medicalRecords',  [], 'patient_intake_id', 'medical_records_file');
                $validatedData['medical_records'] = null;
            }
            // Store EMC owners
            if (!empty($validatedData['emc_owner'])) {
                RelatedRecordsHandler::updateRelatedRecords($patient, 'emcOwners', $validatedData['emc_owner'],  'patient_intake_id', 'emc_owner_name');
            }

            // Store other case managers
            if (isset($validatedData['other_case_managers'])) {
                RelatedRecordsHandler::updateRelatedRecords($patient, 'otherCaseManagers', $validatedData['other_case_managers'],  'patient_intake_id', 'other_referral_source_staff_id');
            }
            return response()->json(['message' => 'Patient information saved successfully.', 'patient' => $patient]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $patient = PatientIntake::findOrFail($id);
        return response()->json($patient);
    }

    public function edit($id)
    {
        // Return the view for editing the patient
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'law_firm_id' => 'nullable|exists:law_firm,id',
                'is_vip' => 'nullable|string|in:1,0|max:1',
                'referral_source_id' => 'nullable|integer',
                'referral_source_staff_id' => 'nullable|integer',
                'first_name' => 'nullable|string|max:50',
                'middle_name' => 'nullable|string|max:50',
                'last_name' => 'nullable|string|max:50',
                'preferred_language' => 'nullable|string|max:50',
                'gender' => 'nullable|string|max:10',
                'date_of_birth' => 'nullable|date_format:Y-m-d',
                'date_of_injury' => 'nullable|date_format:Y-m-d',
                'phone' => 'nullable|string|max:100',
                'email' => 'nullable|string|email|max:100',
                'full_address' => 'nullable|string|max:100',
                'latitude' => 'nullable|string|max:100',
                'longitude' => 'nullable|string|max:100',
                'street_address' => 'nullable|string|max:100',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'zip_code' => 'nullable|string|max:50',
                'accident_type' => 'nullable|string|max:50',
                'medical_note' => 'nullable|string|max:100',
                'emc_owner' => 'nullable|array',
                'emc_owner.*' => 'nullable|string|max:100',
                'other_case_managers' => 'nullable|array',
                'other_case_managers.*' => 'nullable|string|max:100',
            ]);

            $patient = PatientIntake::findOrFail($id);
            // Store medical files
            if ($request->hasFile('medicalFiles')) {
                $paths = [];
                foreach ($request->file('medicalFiles') as $file) {
                    $path = FileUploadHandler::handleFileUpload($file, 'patient_files', $patient->medicalRecords->pluck('medical_records_file')->toArray());
                    $patient->medicalRecords()->create([
                        'patient_intake_id' => $patient->id,
                        'medical_records_file' => $path
                    ]);
                    $paths = array_merge($paths, [$path]);
                }
                RelatedRecordsHandler::updateRelatedRecords($patient, 'medicalRecords',  $paths, 'patient_intake_id', 'medical_records_file');
            } else {
                RelatedRecordsHandler::updateRelatedRecords($patient, 'medicalRecords',  [], 'patient_intake_id', 'medical_records_file');
                $validatedData['medical_records'] = null;
            }

            // Store other case managers
            if (isset($validatedData['other_case_managers']) && !empty($validatedData['other_case_managers'])) {
                RelatedRecordsHandler::updateRelatedRecords($patient, 'otherCaseManagers', $validatedData['other_case_managers'],  'patient_intake_id', 'other_referral_source_staff_id');
            } else {
                RelatedRecordsHandler::updateRelatedRecords($patient, 'otherCaseManagers',  [], 'patient_intake_id', 'other_referral_source_staff_id');
                $validatedData['other_case_managers'] = null;
            }
            // Store EMC owners
            if (!empty($validatedData['emc_owner'])) {
                RelatedRecordsHandler::updateRelatedRecords($patient, 'emcOwners', $validatedData['emc_owner'],  'patient_intake_id', 'emc_owner_name');
            } else {
                RelatedRecordsHandler::updateRelatedRecords($patient, 'emcOwners',  [], 'patient_intake_id', 'emc_owner_name');
                $validatedData['emc_owner'] = null;
            }

            $patient->update($validatedData);





            return response()->json(['message' => 'Patient information updated successfully.', 'patient' => $patient]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $patient = PatientIntake::where('id', $id)
                ->firstOrFail();

            $patient->deleted = 1;
            $patient->save();

            return response()->json(['message' => 'Patient information deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deleting the patient information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function getMedicalRecords($patientId)
    {
        $medicalRecords = PMedicalRecordsDetail::where('patient_intake_id', $patientId)->get();
        return response()->json($medicalRecords);
    }
}
