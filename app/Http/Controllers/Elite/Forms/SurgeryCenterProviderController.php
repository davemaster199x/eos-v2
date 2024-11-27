<?php

namespace App\Http\Controllers\Elite\Forms;

use App\Http\Controllers\Controller;
use App\Models\EliteModel\SurgeryCenter\SurgeryCenter;
use App\Models\EliteModel\SurgeryCenter\SurgeryCenterProvider;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SurgeryCenterProviderController extends Controller
{
    public function index()
    {
        $surgeryCenterProviders = SurgeryCenterProvider::all();
        return response()->json($surgeryCenterProviders);
    }

    public function create()
    {
        return view('app');
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'surgery_center_id' => 'nullable|exists:surgery_centers,id',
                'provider_id' => 'nullable|exists:providers,id',
                'status' => 'nullable|in:1,0',
            ]);

            $surgeryCenterProvider = SurgeryCenterProvider::create($validatedData);

            return response()->json([
                'message' => 'Surgery Center Provider association created successfully.',
                'data' => $surgeryCenterProvider
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $surgeryCenterProvider = SurgeryCenterProvider::findOrFail($id);
        return response()->json($surgeryCenterProvider);
    }

    public function edit($id)
    {
        $surgeryCenterProvider = SurgeryCenterProvider::findOrFail($id);
        return view('app', compact('surgeryCenterProvider'));
    }

    public function update(Request $request, SurgeryCenterProvider $surgeryCenterProvider)
    {
        try {
            $validatedData = $request->validate([
                'surgery_center_id' => 'nullable|exists:surgery_centers,id',
                'provider_id' => 'nullable|exists:providers,id',
                'status' => 'nullable|in:1,0',
            ]);

            $surgeryCenterProvider->update($validatedData);

            return response()->json([
                'message' => 'Surgery Center Specialist association updated successfully.',
                'data' => $surgeryCenterProvider
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error occurred.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy(SurgeryCenterProvider $surgeryCenterProvider)
    {
        $surgeryCenterProvider->delete();

        return response()->json([
            'message' => 'Surgery Center Provider association deleted successfully.'
        ]);
    }

    public function getSurgeryCentersByProviderId($providerId)
    {
        $surgeryCenters = SurgeryCenter::whereHas('providers', function ($query) use ($providerId) {
            $query->where('provider_id', $providerId);
        })->get();

        return response()->json($surgeryCenters);
    }
}
