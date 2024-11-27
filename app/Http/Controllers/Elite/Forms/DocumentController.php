<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Models\EliteModel\Document\Document;
use App\Providers\Helpers\RelatedRecordsHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Providers\Helpers\FileUploadHandler;
use Illuminate\Validation\ValidationException;

class DocumentController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('app');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get the 'limit' query parameter from the request.
        // If it's not provided, $limit will be null.
        $limit = request('limit');

        // Build a query to get all documents.
        // The where clause is used to avoid soft-deleted records.
        $query = Document::where('deleted', 0)
            ->with([
                'patientIntake.medicalRecords',
                'nearestFacility',
                'nearestSpecialist',
                'recommendationRequested',
                'documents'
            ]);


        // Get the results of the query.
        // If $limit is set, get the paginated results.
        // Otherwise, get all the results at once.
        if (isset($limit) && $limit > 0) {
            $data = $query->paginate($limit);
        } else {
            $data = $query->get();
        }

        // Return the results as a JSON response.
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'patient_intake_id' => 'required|exists:patient_intake,id',
            'document_type' => 'required|string',
            'nearest_facility' => 'nullable|exists:provider_offices,id',
            'nearest_specialist' => 'nullable|exists:provider_offices,id',
            'bill_amount' => 'nullable|numeric',
            'notes' => 'nullable|string',
            'recommendation_requested' => 'nullable|array'

        ]);

        DB::beginTransaction();
        // dd($validatedData);
        try {
            $document = Document::create($validatedData);

            if (!empty($validatedData['recommendation_requested'])) {
                RelatedRecordsHandler::updateRelatedRecords($document, 'recommendationRequested', $validatedData['recommendation_requested'], 'document_id', 'recommendation_requested');
            }
            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $file) {
                    $path = $file->store('documents', 'public');
                    $document->documents()->create([
                        'document_id' => $document->id,
                        'document_file' => 'storage/' . $path
                    ]);
                }
            }

            DB::commit();
            return response()->json(['message' => $validatedData['document_type']]);
            // return response()->json($document->load('recommendationRequested'), 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $document = Document::with(['patientIntake', 'nearestFacility', 'nearestSpecialist', 'recommendationRequested'])->findOrFail($id);
        return response()->json($document);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $document = Document::findOrFail($id);
        return view('app', compact('document'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'patient_intake_id' => 'sometimes|required|exists:patient_intake,id',
            'document_type' => 'sometimes|required|string',
            'nearest_facility' => 'nullable|exists:provider_offices,id',
            'nearest_specialist' => 'nullable|exists:provider_offices,id',
            'bill_amount' => 'nullable|numeric',
            'notes' => 'nullable|string',
            'status' => 'sometimes|required|string',
            'recommendation_requested' => 'nullable|array'
        ]);

        DB::beginTransaction();

        try {
            $document = Document::findOrFail($id);



            if (!empty($validatedData['recommendation_requested'])) {
                RelatedRecordsHandler::updateRelatedRecords($document, 'recommendationRequested', $validatedData['recommendation_requested'], 'document_id', 'recommendation_requested');
            }

            if ($request->hasFile('documents')) {
                $paths = [];
                foreach ($request->file('documents') as $file) {
                    $oldFile = $document->documents()->where('document_file', $file->getClientOriginalName())->first();
                    $oldPath = $oldFile ? $oldFile->document_file : null;
                    $path = FileUploadHandler::handleFileUpload($file, 'documents', $oldPath);

                    if ($path) {
                        $paths[] = $path;
                    }
                };
                RelatedRecordsHandler::updateRelatedRecords(
                    $document,
                    'documents',
                    $paths,
                    'document_id',
                    'document_file'
                );
                $validatedData['documents'] = $paths;
            }
            $document->update($validatedData);

            DB::commit();
            return response()->json($document->load('recommendationRequested'));
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $document = Document::findOrFail($id);

        DB::beginTransaction();

        try {
            $document->deleted = 1;
            $document->save();
            DB::commit();
            return response()->json(['message' => 'Document deactivated successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to delete document'], 500);
        }
    }
}
