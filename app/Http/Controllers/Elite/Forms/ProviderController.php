<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\Provider\PBlacklistedLawFirmDetail;
use App\Models\EliteModel\Provider\PBlacklistedReferralSourceDetail;
use App\Models\EliteModel\Provider\POtherDocumentsFormDetail;
use App\Models\EliteModel\Provider\PProviderCollectionFormDetail;
use App\Models\EliteModel\Provider\Provider;
use App\Models\EliteModel\Provider\PSpecialtyDetail;
use App\Models\EliteModel\Provider\PTherapiesProvidedDetail;
use App\Models\ProviderOffice\ProviderOffice;
use App\Providers\Helpers\FileUploadHandler;
use App\Providers\Helpers\RelatedRecordsHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Faker\Core\File;
use PhpParser\Node\Stmt\ElseIf_;
use Illuminate\Support\Facades\Storage;

use function Psy\debug;

class ProviderController extends Controller
{

    public function index(Request $request)
    {
        // Get the limit from the query string, default to 10 if not provided
        $limit = $request->query('limit');
        // Get the provider_type from the query string, default to null if not provided
        $providerType = $request->query('provider_type');

        $query = Provider::where('deleted', 0)
            ->with([
                'offices',
                'providerCollections',
                'specialties',
                'therapiesProvided',
                'blacklistedReferralSource.referralSource',
                'otherDocuments',
                'compliances'
            ]);

        if ($providerType) {
            $query->where('provider_type', $providerType);
        }

        $query->orderBy('first_name');
        $providers = $query->get();
        // Execute the query and return the results as JSON
        if (isset($limit) && $limit > 0) {
            $providers = $query->paginate($limit);
        }


        return response()->json($providers);
    }

    public function getFacilitiesByProvider(Request $request)
    {
        // Get the provider ID from the query string
        $providerId = $request->query('provider_id');

        if (!$providerId) {
            return response()->json(['error' => 'Provider ID is required'], 400);
        }

        // Fetch facilities related to the provider
        $facilities = ProviderOffice::where('provider_id', $providerId)->get();

        return response()->json($facilities);
    }

    public function create()
    {
        return view('app');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'first_name' => 'nullable|string|max:50',
                'middle_name' => 'nullable|string|max:50',
                'last_name' => 'nullable|string|max:50',
                'status' => 'nullable|in:1,0',
                'pay_status' => 'nullable|string|max:50',
                'provider_type' => 'nullable|string|max:50',
                'specialty_name' => 'nullable|array',
                'specialty_name.*' => 'nullable|string|max:100',
                'therapies_provided' => 'nullable|array',
                'therapies_provided.*' => 'nullable|string|max:100',
                'email' => 'nullable|string|email|max:100',
                'phone' => 'nullable|string|max:50',
                'language' => 'nullable|string|max:50',
                'provider_communication_note' => 'nullable|string',
                'telemedicine' => 'nullable|string',
                // 'headshotFile' => 'sometimes|file|max:10240',
                // 'lienFile' => 'sometimes|file|max:10240',
                // 'cvFile' => 'sometimes|file|max:10240',
                // 'signedcontractFile' => 'sometimes|file|max:10240',
                // 'w9File' => 'sometimes|file|max:10240',
                'providercollectionFormFiles' => 'nullable|array',
                'providercollectionFormFiles.*' => 'nullable|file|max:10240',
                'otherdocumentsFiles' => 'nullable|array',
                'otherdocumentsFiles.*' => 'nullable|file|max:10240',
                'blacklisted_referral_source_ids' => 'nullable|array',
                'blacklisted_referral_source_ids.*' => 'nullable|integer|exists:law_firm,id',
            ]);

            // Processing the validated data and saving it to the database
            $provider = new Provider([
                'first_name' => $validatedData['first_name'],
                'middle_name' => $validatedData['middle_name'],
                'last_name' => $validatedData['last_name'],
                'status' => $validatedData['status'],
                'pay_status' => $validatedData['pay_status'],
                'provider_type' => $validatedData['provider_type'],
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
                'language' => $validatedData['language'],
                'provider_communication_note' => $validatedData['provider_communication_note'],
                'telemedicine' => $validatedData['telemedicine'],
            ]);

            $fileFields = ['headshot', 'lien', 'cv', 'signed_contract', 'w_9'];
            foreach ($fileFields as $field) {
                if ($request->hasFile($field)) {
                    $path = FileUploadHandler::handleFileUpload($request->file($field), 'provider_files', $request->$field);
                    $provider[$field] = $path;
                }
            }


            $provider->save();

            // Convert the array of files to an array of paths
            if (isset($request['complianceFiles'])) {
                $paths = [];
                foreach ($request['complianceFiles'] as $file) {
                    $path = FileUploadHandler::handleFileUpload($file, 'provider_files', $provider->compliances()->where('file', operator: $file->getClientOriginalName())->first()->file ?? null);
                    $paths[] = $path;
                }
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'compliances',
                    $paths ?? [],
                    'provider_id',
                    'file'
                );
            }
            if (isset($request['otherDocumentFiles'])) {
                $paths = [];
                foreach ($request['otherDocumentFiles'] as $file) {
                    $path = FileUploadHandler::handleFileUpload($file, 'provider_files', $provider->otherDocuments()->where('other_documents_file', operator: $file->getClientOriginalName())->first()->file ?? null);
                    $paths[] = $path;
                }
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'otherDocuments',
                    $paths ?? [],
                    'provider_id',
                    'other_documents_file'
                );
            }

            if (isset($request['providercollectionFormFiles'])) {
                $paths = [];
                foreach ($request['providercollectionFormFiles'] as $file) {
                    $path = FileUploadHandler::handleFileUpload($file, 'provider_files', $provider->providerCollections()->where('provider_collection_form_file', operator: $file->getClientOriginalName())->first()->file ?? null);
                    $paths[] = $path;
                }
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'providerCollections',
                    $paths ?? [],
                    'provider_id',
                    'provider_collection_form_file'
                );
            }

            // Handle related data
            if ($request['provider_type'] == 'Specialist') {
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'specialties',
                    $validatedData['specialty_name'] ?? [],
                    'provider_id',
                    'name'
                );
            }

            if ($request['provider_type'] == 'Therapist') {
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'therapiesProvided',
                    $validatedData['therapies_provided'] ?? [],
                    'provider_id',
                    'name'
                );
            }

            if (isset($request['blacklisted_referral_source_ids'])) {

                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'blacklistedReferralSource',
                    $request['blacklisted_referral_source_ids'] ?? [],
                    'provider_id',
                    'referral_source_id'
                );
            }

            return response()->json(['message' => 'Provider information saved successfully.', 'provider' => $provider]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $provider = Provider::findOrFail($id);
        return response()->json($provider);
    }

    public function edit($id)
    {
        $provider = Provider::findOrFail($id);
        return view('app', compact('provider'));
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'first_name' => 'nullable|string|max:50',
                'middle_name' => 'nullable|string|max:50',
                'last_name' => 'nullable|string|max:50',
                'status' => 'nullable|in:1,0',
                'pay_status' => 'nullable|string|max:50',
                'provider_type' => 'nullable|string|max:50',
                'specialty_name' => 'nullable|array',
                'specialty_name.*' => 'nullable|string|max:100',
                'therapies_provided' => 'nullable|array',
                'therapies_provided.*' => 'nullable|string|max:100',
                'email' => 'nullable|string|email|max:100',
                'phone' => 'nullable|string|max:50',
                'language' => 'nullable|string|max:50',
                'provider_communication_note' => 'nullable|string',
                'telemedicine' => 'nullable|string',
                // 'headshotFile' => 'sometimes|file|max:10240',
                // 'lienFile' => 'sometimes|file|max:10240',
                // 'cvFile' => 'sometimes|file|max:10240',
                // 'signedcontractFile' => 'sometimes|file|max:10240',
                // 'w9File' => 'sometimes|file|max:10240',
                // 'providercollectionFormFiles' => 'nullable|array',
                // 'providercollectionFormFiles.*' => 'nullable|file|max:10240',
                // 'otherdocumentsFiles' => 'nullable|array',
                // 'otherdocumentsFiles.*' => 'nullable|file|max:10240',
                // 'blacklisted_referral_source_ids' => 'nullable|array',
                // 'blacklisted_referral_source_ids.*' => 'nullable|integer|exists:law_firm,id',
            ]);

            $provider = Provider::findOrFail($id);

            // Update the provider data
            $provider->fill([
                'first_name' => $validatedData['first_name'],
                'middle_name' => $validatedData['middle_name'],
                'last_name' => $validatedData['last_name'],
                'status' => $validatedData['status'],
                'pay_status' => $validatedData['pay_status'],
                'provider_type' => $validatedData['provider_type'],
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
                'language' => $validatedData['language'],
                'provider_communication_note' => $validatedData['provider_communication_note'],
                'telemedicine' => $validatedData['telemedicine'],
            ]);

            $fileFields = ['headshot', 'lien', 'cv', 'signed_contract', 'w_9'];
            foreach ($fileFields as $field) {
                if ($request->hasFile($field)) {
                    $path = FileUploadHandler::handleFileUpload($request->file($field), 'provider_files', $request->$field);
                    $provider[$field] = $path;
                } else {
                    $provider[$field] = '';
                }
            }
            // Save all changes to the database
            $provider->save();

            if ($request->hasFile('complianceFiles')) {
                $paths = [];
                foreach ($request->file('complianceFiles') as $file) {
                    try {
                        $oldFile = $provider->compliances->where('file', $file->getClientOriginalName())->first();
                        $oldPath = $oldFile ? $oldFile->file : null;

                        $path = FileUploadHandler::handleFileUpload($file, 'provider_files', $oldPath);
                        if ($path) {
                            $paths[] = $path;
                        }
                    } catch (\Exception $e) {
                        Log::error("Error uploading compliance file: " . $e->getMessage());
                        // You might want to add some error handling here
                    }
                }

                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'compliances',
                    $paths,
                    'provider_id',
                    'file'
                );
            } else { // Remove the file
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'compliances',
                    '',
                    '',
                    '',
                    1 // delete record
                );
            }

            // Handling Other Document Files
            if ($request->hasFile('otherDocumentFiles')) {
                $paths = [];
                foreach ($request->file('otherDocumentFiles') as $file) {
                    try {
                        $oldFile = $provider->otherDocuments->where('other_documents_file', $file->getClientOriginalName())->first();
                        $oldPath = $oldFile ? $oldFile->other_documents_file : null;

                        $path = FileUploadHandler::handleFileUpload($file, 'provider_files', $oldPath);
                        if ($path) {
                            $paths[] = $path;
                        }
                    } catch (\Exception $e) {
                        Log::error("Error uploading other document file: " . $e->getMessage());
                        // You might want to add some error handling here
                    }
                }

                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'otherDocuments',
                    $paths,
                    'provider_id',
                    'other_documents_file'
                );
            } else { // Remove the file
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'otherDocuments',
                    '',
                    '',
                    '',
                    1 // delete record
                );
            }

            if ($request->hasFile('providercollectionFormFiles')) {
                $paths = [];
                foreach ($request->file('providercollectionFormFiles') as $index => $file) {
                    try {
                        $oldFile = $provider->providerCollections->where('provider_collection_form_file', $file->getClientOriginalName())->first();
                        $oldPath = $oldFile ? $oldFile->provider_collection_form_file : null;

                        $path = FileUploadHandler::handleFileUpload($file, 'provider_files', $oldPath);
                        if ($path) {
                            $paths[] = $path;
                        }
                    } catch (\Exception $e) {
                        Log::error("Error uploading file: " . $e->getMessage());
                        // You might want to add some error handling here, e.g., adding to an errors array
                    }
                }

                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'providerCollections',
                    $paths,
                    'provider_id',
                    'provider_collection_form_file'
                );
            } else { // Remove the file
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'providerCollections',
                    '',
                    '',
                    '',
                    1 // delete record
                );
            }

            // Handle related data
            if ($request['provider_type'] == 'Specialist') {
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'specialties',
                    $validatedData['specialty_name'] ?? [],
                    'provider_id',
                    'name'
                );
            }

            if ($request['provider_type'] == 'Therapist') {
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'therapiesProvided',
                    $validatedData['therapies_provided'] ?? [],
                    'provider_id',
                    'name'
                );
            }



            if (isset($request['blacklisted_referral_source_ids'])) {
                RelatedRecordsHandler::updateRelatedRecords(
                    $provider,
                    'blacklistedReferralSource',
                    $request['blacklisted_referral_source_ids'] ?? [],
                    'provider_id',
                    'referral_source_id'
                );
            }
            return response()->json(['message' => 'Specialist information updated successfully.', 'specialist' => $provider]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $provider = Provider::where('id', $id)
                ->firstOrFail();

            $provider->deleted = 1;
            $provider->save();

            return response()->json(['message' => 'Provider deactivated successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Provider not found or already deactivated'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while deactivating the Provider.', 'error' => $e->getMessage()], 500);
        }
    }
}
