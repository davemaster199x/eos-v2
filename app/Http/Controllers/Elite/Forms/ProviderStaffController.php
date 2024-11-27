<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\ProviderStaff\ProviderStaff;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProviderStaffController extends Controller
{
  public function index(Request $request)
  {
    $limit = $request->query('limit');
    $query = ProviderStaff::where('deleted', 0)
      ->with(['pointOfContactDetails', 'designatedOfficeDetails.designated_office', 'providerDetails.provider']);
    $query->orderBy('first_name');
    $providerStaffs = $query->get();
    if (isset($limit) && $limit > 0) {
      $providerStaffs = $query->paginate($limit);
    }
    return response()->json($providerStaffs);
  }

  public function create()
  {
    return view('app');
  }


  public function store(Request $request)
  {
    try {
      $validatedData = $request->validate([
        'provider_type'         => 'nullable|string|max:50',
        'title'                 => 'nullable|string|max:200',
        'first_name'            => 'nullable|string|max:100',
        'middle_name'           => 'nullable|string|max:100',
        'last_name'             => 'nullable|string|max:100',
        'staff_language'        => 'nullable|string|max:50',
        'email'                 => 'nullable|string|email|max:50',
        'phone'                 => 'nullable|string|max:50',
        'point_of_contacts'     => 'nullable|array',
        'point_of_contacts.*'   => 'nullable|string|max:50',
        'provider_id'           => 'nullable|array',
        'provider_id.*'         => 'nullable|integer|exists:providers,id',
        'designated_office'     => 'nullable|array',
        'designated_office.*'   => 'nullable|integer|exists:provider_offices,id',
        'status'                => 'nullable|in:1,0',
      ]);

      $providerStaff = ProviderStaff::create([
        'provider_type'         => $validatedData['provider_type'],
        'title'                 => $validatedData['title'],
        'first_name'            => $validatedData['first_name'],
        'middle_name'           => $validatedData['middle_name'],
        'last_name'             => $validatedData['last_name'],
        'staff_language'        => $validatedData['staff_language'],
        'email'                 => $validatedData['email'],
        'phone'                 => $validatedData['phone'],
        'status'                => $validatedData['status'],
      ]);

      // Attach providers and offices
      if (isset($validatedData['provider_id'])) {
        foreach ($validatedData['provider_id'] as $provider) {
          $providerStaff->providerDetails()->create([
            'provider_id' => $provider,
          ]);
        }
      }

      if (isset($validatedData['designated_office'])) {
        foreach ($validatedData['designated_office'] as $office) {
          $providerStaff->designatedOfficeDetails()->create([
            'designated_office' => $office,
            'provider_staff_id' => $providerStaff->id

          ]);
        }
      }


      if (isset($validatedData['point_of_contacts'])) {
        foreach ($validatedData['point_of_contacts'] as $pointOfContact) {
          $providerStaff->pointOfContactDetails()->create([
            'point_of_contact' => $pointOfContact,
          ]);
        }
      }

      return response()->json(['message' => 'Provider Staff information saved successfully.', 'provider_staff' => $providerStaff]);
    } catch (ValidationException $e) {
      return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
    }
  }

  public function show($id)
  {
    try {
      $providerStaff = ProviderStaff::with(['pointOfContactDetails', 'designatedOfficeDetails'])->findOrFail($id);
      return response()->json($providerStaff);
    } catch (\Exception $e) {
      return response()->json(['message' => 'Provider Staff not found', 'error' => $e->getMessage()], 404);
    }
  }

  public function edit($id)
  {
    try {
      $providerStaff = ProviderStaff::findOrFail($id);
      return view('app', compact('providerStaff'));
    } catch (\Exception $e) {
      return response()->json(['message' => 'Provider Staff not found', 'error' => $e->getMessage()], 404);
    }
  }

  public function update(Request $request, $id)
  {
    try {
      $providerStaff = ProviderStaff::findOrFail($id);

      $validatedData = $request->validate([
        'provider_type'         => 'nullable|string|max:50',
        'title'                 => 'nullable|string|max:200',
        'first_name'            => 'nullable|string|max:100',
        'middle_name'           => 'nullable|string|max:100',
        'last_name'             => 'nullable|string|max:100',
        'staff_language'        => 'nullable|string|max:50',
        'email'                 => 'nullable|string|email|max:50',
        'phone'                 => 'nullable|string|max:50',
        'point_of_contacts'     => 'nullable|array',
        'point_of_contacts.*'   => 'nullable|string|max:50',
        'provider_id'           => 'nullable|array',
        'provider_id.*'         => 'nullable|integer|exists:providers,id',
        'designated_office'     => 'nullable|array',
        'designated_office.*'   => 'nullable|integer|exists:provider_offices,id',
        'status'                => 'nullable|in:1,0',
      ]);

      $providerStaff->update([
        'provider_type'         => $validatedData['provider_type'],
        'title'                 => $validatedData['title'],
        'first_name'            => $validatedData['first_name'],
        'middle_name'           => $validatedData['middle_name'],
        'last_name'             => $validatedData['last_name'],
        'staff_language'        => $validatedData['staff_language'],
        'email'                 => $validatedData['email'],
        'phone'                 => $validatedData['phone'],
        'status'                => $validatedData['status'],
      ]);

      if (isset($validatedData['provider_id'])) {
        $providerStaff->providerDetails()->delete();
        foreach ($validatedData['provider_id'] as $provider) {
          $providerStaff->providerDetails()->create([
            'provider_id' => $provider,
          ]);
        }
      }

      if (isset($validatedData['point_of_contacts'])) {
        $providerStaff->pointOfContactDetails()->delete();
        foreach ($validatedData['point_of_contacts'] as $pointOfContact) {
          $providerStaff->pointOfContactDetails()->create([
            'point_of_contact' => $pointOfContact,
          ]);
        }
      }

      if (!empty($validatedData['designated_office'])) {
        $providerStaff->designatedOfficeDetails()->delete();
        foreach ($validatedData['designated_office'] as $designatedOffice) {
          $providerStaff->designatedOfficeDetails()->create([
            'designated_office' => $designatedOffice,
          ]);
        }
      }

      return response()->json(['message' => 'Provider Staff information updated successfully.', 'provider_staff' => $providerStaff]);
    } catch (ValidationException $e) {
      return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
    } catch (\Exception $e) {
      return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
    }
  }

  public function destroy($id)
  {
    try {
      $providerStaff = ProviderStaff::where('id', $id)
        ->firstOrFail();
      $providerStaff->deleted = 1;
      $providerStaff->save();

      return response()->json(['message' => 'Provider Staff deleted successfully']);
    } catch (\Exception $e) {
      return response()->json(['message' => 'An error occurred while deleting the Provider Staff.', 'error' => $e->getMessage()], 500);
    }
  }
}
