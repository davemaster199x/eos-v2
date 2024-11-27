<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;

// Elite Controllers
use App\Http\Controllers\Elite\Forms\LawFirmController;
use App\Http\Controllers\Elite\Forms\LawFirmStaffController;
use App\Http\Controllers\Elite\Forms\PatientController;
use App\Http\Controllers\Elite\Forms\PatientAppointmentController;
use App\Http\Controllers\Elite\Forms\SpecialistController;
use App\Http\Controllers\Elite\Forms\SpecialistOfficeController;
use App\Http\Controllers\Elite\Forms\SpecialistStaffController;
use App\Http\Controllers\Elite\Forms\SurgeryCenterController;
use App\Http\Controllers\Elite\Forms\PTChiroFacilityController;
use App\Http\Controllers\Elite\Forms\PTChiroStaffController;
use App\Http\Controllers\Elite\Forms\PTChiroAppointmentController;
use App\Http\Controllers\Elite\Forms\PTChiroAppointmentRequestController;
use App\Http\Controllers\Elite\Forms\MriFacilityController;
use App\Http\Controllers\Elite\Forms\MriStaffController;
use App\Http\Controllers\Elite\Forms\MRIAppointmentRequestController;
use App\Http\Controllers\Elite\Forms\AppointmentRequestController;

use App\Http\Controllers\Elite\Forms\MapController;
use App\Http\Controllers\Elite\Forms\SurgeryCenterSpecialistController;

use App\Http\Controllers\Elite\ActivePatientsController;
// End Elite Controllers

use App\Http\Controllers\SettingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Authentication Routes
Route::get('/', [LoginController::class, 'showLoginForm'])->name('login');
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    // Route::get('/elite/dashboard', 'EliteDashboardController@index')->name('elite.dashboard');
    // Route::get('/uploads/dashboard', 'UploadsDashboardController@index')->name('uploads.dashboard');
    // Route::get('/referrals/dashboard', 'ReferralsDashboardController@index')->name('referrals.dashboard');

    // Settings
    Route::get('/api/firm/address-suggestions', [SettingController::class, 'addressSuggestions'])->name('firm.addressSuggestions');

    Route::get('/elite/dashboard', function () {
        return view('elite.dashboard');
    });

    Route::get('/referrals/dashboard', function () {
        return view('elite.dashboard');
    });

    Route::get('/uploads/dashboard', function () {
        return view('elite.dashboard');
    });

    // Patients
    Route::get('/patient/create', [PatientController::class, 'create'])->name('patient.create');
    Route::post('/patient/store', [PatientController::class, 'store'])->name('patient.store');
    Route::get('/api/get-patient', [PatientController::class, 'get_patient'])->name('api.get-patient');

    // Patient Appointment
    Route::prefix('patient-appointment')->name('patient-appointment.')->group(function () {
        Route::get('/', [PatientAppointmentController::class, 'index'])->name('index');
        Route::get('/create', [PatientAppointmentController::class, 'create'])->name('create');
        Route::post('/store', [PatientAppointmentController::class, 'store'])->name('store');
    });

    // Active Patients
    Route::get('/active-patients', [ActivePatientsController::class, 'active_patients'])->name('active-patients');
    Route::get('/api/active-patients', [ActivePatientsController::class, 'getActivePatients']);

    // Law Firm
    Route::get('/law-firm/create', [LawFirmController::class, 'create'])->name('law-firm.create');
    Route::get('/api/law-firms', [LawFirmController::class, 'get_law_firm'])->name('api.law-firms');
    Route::post('/firm/store', [LawFirmController::class, 'store'])->name('firm.store');


    // Law Firm Staff
    Route::get('/law-firm-staff/create', [LawFirmStaffController::class, 'create'])->name('law-firm-staff.create');
    Route::post('/law-firm-staff/store', [LawFirmStaffController::class, 'store'])->name('law-firm-staff.store');
    Route::get('/api/law-firm-staff/{law_firm_id}', [LawFirmStaffController::class, 'get_law_firm_staff'])->name('api.law-firm-staff');

    // Specialist
    Route::get('/specialist/create', [SpecialistController::class, 'create'])->name('specialist.create');
    Route::post('/specialist/store', [SpecialistController::class, 'store'])->name('specialist.store');
    Route::get('/api/get-specialist', [SpecialistController::class, 'get_specialist'])->name('api.get-specialist');

    // Specialist Office
    Route::get('/specialist-office/create', [SpecialistOfficeController::class, 'create'])->name('specialist-office.create');
    Route::post('/specialist-office/store', [SpecialistOfficeController::class, 'store'])->name('specialist-office.store');
    Route::get('/api/get-specialist-office', [SpecialistOfficeController::class, 'get_specialist_office'])->name('api.get-specialist-office');
    Route::get('/api/get-specialist-office/{specialistId}', [SpecialistOfficeController::class, 'get_specialist_office']);

    // Specialist Staff
    Route::get('/specialist-staff/create', [SpecialistStaffController::class, 'create'])->name('specialist-staff.create');
    Route::post('/specialist-staff/store', [SpecialistStaffController::class, 'store'])->name('specialist-staff.store');

    // Surgery Center
    Route::get('/surgery-center/create', [SurgeryCenterController::class, 'create'])->name('surgery-center.create');
    Route::post('/surgery-center/store', [SurgeryCenterController::class, 'store'])->name('surgery-center.store');
    Route::get('/api/surgery-centers/{specialistId}', [SurgeryCenterSpecialistController::class, 'getSurgeryCentersBySpecialist']);

    // PT/Chiro Facility
    Route::prefix('pt-chiro-facility')->name('pt-chiro-facility.')->group(function () {
        Route::get('/', [PTChiroFacilityController::class, 'index'])->name('index');
        Route::get('/create', [PTChiroFacilityController::class, 'create'])->name('create');
        Route::post('/', [PTChiroFacilityController::class, 'store'])->name('store');
        Route::get('/{facility}', [PTChiroFacilityController::class, 'show'])->name('show');
        Route::put('/{facility}', [PTChiroFacilityController::class, 'update'])->name('update');
        Route::delete('/{facility}', [PTChiroFacilityController::class, 'destroy'])->name('destroy');
    });

    // PT/Chiro Staff
    Route::get('/pt-chiro-staff/create', [PTChiroStaffController::class, 'create'])->name('pt-chiro-staff.create');
    Route::post('/pt-chiro-staff/store', [PTChiroStaffController::class, 'store'])->name('pt-chiro-staff.store');

    // PT/Chiro Appointment
    Route::get('/pt-chiro-appointment/create', [PTChiroAppointmentController::class, 'create'])->name('pt-chiro-appointment.create');
    Route::post('/pt-chiro-appointment/store', [PTChiroAppointmentController::class, 'store'])->name('pt-chiro-appointment.store');

    // PT/Chiro Appointment Request
    Route::prefix('pt-chiro-appointment-request')->name('pt-chiro-appointment-request.')->group(function () {
        Route::get('/create', [PTChiroAppointmentRequestController::class, 'create'])->name('create');
        Route::post('/store', [PTChiroAppointmentRequestController::class, 'store'])->name('store');
    });

    // Mri Facility
    Route::get('/mri-facility/create', [MriFacilityController::class, 'create'])->name('mri-facility.create');
    Route::post('/mri-facility/store', [MriFacilityController::class, 'store'])->name('mri-facility.store');
    Route::get('/api/mri-facility', [MriFacilityController::class, 'get_mri_facility'])->name('api.mri-facility');

    // Mri Staff
    Route::get('/mri-staff/create', [MriStaffController::class, 'create'])->name('mri-staff.create');
    Route::post('/mri-staff/store', [MriStaffController::class, 'store'])->name('mri-staff.store');

    // MRI Appointment Request
    Route::get('/mri-appointment-request/create', [MRIAppointmentRequestController::class, 'create'])->name('mri-appointment-request.create');
    Route::post('/mri-appointment-request/store', [MRIAppointmentRequestController::class, 'store'])->name('mri-appointment-request.store');

    // Appointment Request
    Route::get('/appointment-request/create', [AppointmentRequestController::class, 'create'])->name('appointment-request.create');
    Route::post('/appointment-request/store', [AppointmentRequestController::class, 'store'])->name('appointment-request.store');

    // Medical Records
    Route::get('/api/medical-records/{patientId}', [PatientController::class, 'getMedicalRecords']);

    // Map
    Route::get('/map', function () {
        return view('map/map');
    });
    Route::get('/maps', [MapController::class, 'getFacilities'])->name('maps');

    // Specialist View
    Route::get('/specialist', function () {
        return view('elite/specialist');
    });
});