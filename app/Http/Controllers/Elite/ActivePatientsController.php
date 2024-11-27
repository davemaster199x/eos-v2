<?php

namespace App\Http\Controllers\Elite;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\patient\PatientIntake;

class ActivePatientsController extends Controller
{
    public function active_patients()
    {
        return view('elite.active_patients');
    }

    public function getActivePatients(Request $request)
    {
        $patients = PatientIntake::where('status', '1')
                                ->orderBy('created_at', 'desc')
                                ->get();

        return response()->json([
            'items' => $patients,
        ]);
    }
}
