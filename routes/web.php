<?php

use Illuminate\Support\Facades\Redirect;

use App\Http\Controllers\AppController;
use App\Http\Controllers\Elite\Forms\LawFirmStaffController;
use App\Http\Controllers\Elite\Forms\MapController;
use App\Http\Controllers\Elite\Forms\PatientController;
use App\Http\Controllers\Elite\Forms\PatientAppointmentController;
use App\Http\Controllers\Elite\Forms\PTChiroFacilityController;
use App\Http\Controllers\Elite\Forms\SurgeryCenterController;
use App\Http\Controllers\Elite\Forms\SurgeryCenterSpecialistController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Elite\Forms\DocumentController;
use App\Http\Controllers\Elite\Forms\AppointmentRequestController;
use App\Http\Controllers\Elite\Forms\LawFirmController;
use App\Http\Controllers\Elite\Forms\MriAppointmentController;
use App\Http\Controllers\Elite\Forms\MRIAppointmentRequestController;
use App\Http\Controllers\Elite\Forms\MriFacilityController;
use App\Http\Controllers\Elite\Forms\MriStaffController;
use App\Http\Controllers\Elite\Forms\ProviderController;
use App\Http\Controllers\Elite\Forms\ProviderOfficeController;
use App\Http\Controllers\Elite\Forms\ProviderStaffController;
use App\Http\Controllers\Elite\Forms\PTChiroAppointmentRequestController;
use App\Http\Controllers\Elite\Forms\SurgeryCenterProviderController;
use App\Http\Controllers\Elite\Forms\ReferralSourceController;
use App\Http\Controllers\Elite\Forms\ReferralSourceStaffController;
use App\Http\Controllers\Elite\Forms\PatientNoteController;
use App\Http\Controllers\SettingController;


// Route::get('/api/addressSuggestions', [SettingController::class, 'addressSuggestions']);

// Route::get('/config', function () {
//   return response()->json([
//     'mapbox' => env('MAPBOX_API_KEY'),
//   ]);
// });
/**
 * Resource Routes for LawFirmController
 * 
 * This route definition provides standard CRUD endpoints for managing Law Firms:
 * 
 * - GET `/law-firms`             : List all law firms (index)
 * - GET `/law-firms/create`      : Show the form to create a new law firm (create)
 * - POST `/law-firms`            : Store a newly created law firm (store)
 * - GET `/law-firms/{id}`        : Display a specific law firm (show)
 * - GET `/law-firms/{id}/edit`   : Show the form to edit a specific law firm (edit)
 * - PUT/PATCH `/law-firms/{id}`  : Update a specific law firm (update)
 * - DELETE `/law-firms/{id}`     : Delete a specific law firm (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/law-firms`).
 */

// Route::resource('law-firms', LawFirmController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('law-firms.index');
//   });

/**
 * Resource Routes for LawFirmStaffController
 * 
 * This route definition provides standard CRUD endpoints for managing Law Firm Staff:
 * 
 * - GET `/law-firm-staffs`            : List all law firm staff (index)
 * - GET `/law-firm-staffs/create`     : Show the form to create a new staff member (create)
 * - POST `/law-firm-staffs`           : Store a newly created staff member (store)
 * - GET `/law-firm-staffs/{id}`       : Display a specific staff member (show)
 * - GET `/law-firm-staffs/{id}/edit`  : Show the form to edit a specific staff member (edit)
 * - PUT/PATCH `/law-firm-staffs/{id}` : Update a specific staff member (update)
 * - DELETE `/law-firm-staffs/{id}`    : Delete a specific staff member (destroy)
 * - GET `/law-firm-staffs/by-law-firm/{id}`   : Retrieve staff members for a specific law firm (getLawFirmStaffsByLawFirmId)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/law-firm-staff`).
 */

// Route::get('law-firm-staffs/by-law-firm/{id}', [LawFirmStaffController::class, 'getLawFirmStaffsByLawFirmId']);
// Route::resource('law-firm-staffs', LawFirmStaffController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('law-firm-staffs.index');
//   });


/**
 * Resource Routes for PatientController
 * 
 * Endpoints:
 * - GET `/patients`                       : List all patients (index)
 * - GET `/patients/create`                : Show the form to create a new patient (create)
 * - POST `/patients`                      : Store a newly created patient (store)
 * - GET `/patients/{id}`                  : Display a specific patient (show)
 * - GET `/patients/{id}/edit`             : Show the form to edit a specific patient (edit)
 * - PUT/PATCH `/patients/{id}`            : Update a specific patient (update)
 * - DELETE `/patients/{id}`               : Delete a specific patient (destroy)
 * - GET `/patients/{id}/medical-records`  : Retrieve medical records for a specific patient (getMedicalRecords)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/patients`).
 */
// Route::get('patients/{id}/medical-records', [PatientController::class, 'getMedicalRecords']);
// Route::resource('patients', PatientController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('patients.index');
//   });

/**
 * Resource Routes for PatientAppointmentController
 * 
 * Endpoints:
 * - GET `/patient-appointments`                           : List all patient appointments (index)
 * - GET `/patient-appointments/create`                    : Show the form to create a new appointment (create)
 * - POST `/patient-appointments`                          : Store a newly created appointment (store)
 * - GET `/patient-appointments/{id}`                      : Display a specific appointment (show)
 * - GET `/patient-appointments/{id}/edit`                 : Show the form to edit a specific appointment (edit)
 * - PUT/PATCH `/patient-appointments/{id}`                : Update a specific appointment (update)
 * - DELETE `/patient-appointments/{id}`                   : Delete a specific appointment (destroy)
 * - GET `/patient-appointments/specialist-offices/{id}`   : Retrieve offices for a specific specialist (getSpecialistOffices)
 * - GET `/patient-appointments/surgery-centers/{id}`      : Retrieve surgery centers for a specific specialist (getSurgeryCenters)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/patient-appointments`).
 */
// Route::get('patient-appointments/offices/{id}', [PatientAppointmentController::class, 'getProviderOffices']);
// Route::get('patient-appointments/surgery-centers/{id}', [PatientAppointmentController::class, 'getSurgeryCenters']);
// Route::resource('patient-appointments', PatientAppointmentController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('patient-appointments.index');
//   });

/**
 * Resource Routes for AppointmentRequestController
 * 
 * Endpoints:
 * - GET `/appointment-requests`            : List all appointment requests (index)
 * - GET `/appointment-requests/create`     : Show the form to create a new appointment request (create)
 * - POST `/appointment-requests`           : Store a newly created appointment request (store)
 * - GET `/appointment-requests/{id}`       : Display a specific appointment request (show)
 * - GET `/appointment-requests/{id}/edit`  : Show the form to edit a specific appointment request (edit)
 * - PUT/PATCH `/appointment-requests/{id}` : Update a specific appointment request (update)
 * - DELETE `/appointment-requests/{id}`    : Delete a specific appointment request (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/appointment-requests`).
 */

// Route::resource('appointment-requests', AppointmentRequestController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('appointment-requests.index');
//   });


/**
 * Resource Routes for ProviderController
 * 
 * Endpoints:
 * - GET `/providers`           : List all providers (index)
 * - GET `/providers/create`    : Show the form to create a new provider (create)
 * - POST `/providers`          : Store a newly created provider (store)
 * - GET `/providers/{id}`      : Display a specific provider (show)
 * - GET `/providers/{id}/edit` : Show the form to edit a specific provider (edit)
 * - PUT/PATCH `/providers/{id}`: Update a specific provider (update)
 * - DELETE `/providers/{id}`   : Delete a specific provider (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/providers`).
 */

// Route::resource('providers', ProviderController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('providers.index');
//   });
// // Provider
// Route::get('/provider/create', [ProviderController::class, 'create'])->name('provider.create');
// Route::post('/provider/store', [ProviderController::class, 'store'])->name('provider.store');
// Route::get('/api/get-provider', [ProviderController::class, 'index'])->name('api.get-provider');
// Route::get('/api/get-facilities-by-provider', [ProviderController::class, 'getFacilitiesByProvider'])->name('api.get-facilities-by-provider');

/**
 * Resource Routes for ProviderOfficeController
 * 
 * Endpoints:
 * - GET `/provider-offices`                           : List all provider offices (index)
 * - GET `/provider-offices/create`                    : Show the form to create a new provider office (create)
 * - POST `/provider-offices`                          : Store a newly created provider office (store)
 * - GET `/provider-offices/{id}`                      : Display a specific provider office (show)
 * - GET `/provider-offices/{id}/edit`                 : Show the form to edit a specific provider office (edit)
 * - PUT/PATCH `/provider-offices/{id}`                : Update a specific provider office (update)
 * - DELETE `/provider-offices/{id}`                   : Delete a specific provider office (destroy)
 * - GET `/provider-offices/by-provider`               : List all provider offices by provider (getProviderOfficesByProvider)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/provider-offices`).
 */

// Route::resource('provider-offices', ProviderOfficeController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('provider-offices.index');
//   });

/**
 * Resource Routes for ProviderStaffController
 * 
 * Endpoints:
 * - GET `/provider-staff`                           : List all provider staff (index)
 * - GET `/provider-staff/create`                    : Show the form to create a new provider staff (create)
 * - POST `/provider-staff`                          : Store a newly created provider staff (store)
 * - GET `/provider-staff/{id}`                      : Display a specific provider staff (show)
 * - GET `/provider-staff/{id}/edit`                 : Show the form to edit a specific provider staff (edit)
 * - PUT/PATCH `/provider-staff/{id}`                : Update a specific provider staff (update)
 * - DELETE `/provider-staff/{id}`                   : Delete a specific provider staff (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/provider-staff`).
 */

// Route::resource('provider-staff', ProviderStaffController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('provider-staff.index');
//   });

/**
 * Resource Routes for SurgeryCenterController
 * 
 * Endpoints:
 * - GET `/surgery-centers`                           : List all surgery centers (index)
 * - GET `/surgery-centers/create`                    : Show the form to create a new surgery center (create)
 * - POST `/surgery-centers`                          : Store a newly created surgery center (store)
 * - GET `/surgery-centers/{id}`                      : Display a specific surgery center (show)
 * - GET `/surgery-centers/{id}/edit`                 : Show the form to edit a specific surgery center (edit)
 * - PUT/PATCH `/surgery-centers/{id}`                : Update a specific surgery center (update)
 * - DELETE `/surgery-centers/{id}`                   : Delete a specific surgery center (destroy)
 * - GET `/surgery-centers/by-provider/{id}`          : Retrieve surgery centers associated with a specific specialist (getSurgeryCentersForSpecialist)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/surgery-centers`).
 */

// Surgery Center
// Route::get('/surgery-center/create', [SurgeryCenterController::class, 'create'])->name('surgery-center.create');
// Route::post('/surgery-center/store', [SurgeryCenterController::class, 'store'])->name('surgery-center.store');
// Route::get('/api/surgery-centers/{specialistId}', [SurgeryCenterSpecialistController::class, 'getSurgeryCentersBySpecialist']);

// Route::get('/surgery-centers/by-provider/{id}', [SurgeryCenterController::class, 'getSurgeryCentersByProvider'])->name('surgery-centers.provider');
// Route::resource('surgery-centers', SurgeryCenterController::class)
//   ->missing(
//     function (Request $request) {
//       return Redirect::route('surgery-centers.index');
//     }
//   );

/**
 * Resource Routes for MriAppointmentController
 * 
 * Endpoints:
 * - GET `/mri-appointments`                           : List all MRI appointments (index)
 * - GET `/mri-appointments/create`                    : Show the form to create a new MRI appointment (create)
 * - POST `/mri-appointments`                          : Store a newly created MRI appointment (store)
 * - GET `/mri-appointments/{id}`                      : Display a specific MRI appointment (show)
 * - GET `/mri-appointments/{id}/edit`                 : Show the form to edit a specific MRI appointment (edit)
 * - PUT/PATCH `/mri-appointments/{id}`                : Update a specific MRI appointment (update)
 * - DELETE `/mri-appointments/{id}`                   : Delete a specific MRI appointment (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/mri-appointments`).
 */

// Route::resource('mri-appointments', MriAppointmentController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('mri-appointments.index');
//   });

/**
 * Resource Routes for MRIAppointmentRequestController
 * 
 * Endpoints:
 * - GET `/mri-appointment-requests`                           : List all MRI appointment requests (index)
 * - GET `/mri-appointment-requests/create`                    : Show the form to create a new MRI appointment request (create)
 * - POST `/mri-appointment-requests`                          : Store a newly created MRI appointment request (store)
 * - GET `/mri-appointment-requests/{id}`                      : Display a specific MRI appointment request (show)
 * - GET `/mri-appointment-requests/{id}/edit`                 : Show the form to edit a specific MRI appointment request (edit)
 * - PUT/PATCH `/mri-appointment-requests/{id}`                : Update a specific MRI appointment request (update)
 * - DELETE `/mri-appointment-requests/{id}`                   : Delete a specific MRI appointment request (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/mri-appointment-requests`).
 */

// Route::resource('mri-appointment-requests', MRIAppointmentRequestController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('mri-appointment-requests.index');
//   });

/**
 * Resource Routes for MriFacilityController
 * 
 * Endpoints:
 * - GET `/mri-facilities`                           : List all MRI facilities (index)
 * - GET `/mri-facilities/create`                    : Show the form to create a new MRI facility (create)
 * - POST `/mri-facilities`                          : Store a newly created MRI facility (store)
 * - GET `/mri-facilities/{id}`                      : Display a specific MRI facility (show)
 * - GET `/mri-facilities/{id}/edit`                 : Show the form to edit a specific MRI facility (edit)
 * - PUT/PATCH `/mri-facilities/{id}`                : Update a specific MRI facility (update)
 * - DELETE `/mri-facilities/{id}`                   : Delete a specific MRI facility (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/mri-facilities`).
 */

// Route::resource('mri-facilities', MriFacilityController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('mri-facilities.index');
//   });

/**
 * Resource Routes for MriStaffController
 * 
 * Endpoints:
 * - GET `/mri-staff`                            : List all MRI staff (index)
 * - GET `/mri-staff/create`                     : Show the form to create a new MRI staff (create)
 * - POST `/mri-staff`                           : Store a newly created MRI staff (store)
 * - GET `/mri-staff/{id}`                       : Display a specific MRI staff (show)
 * - GET `/mri-staff/{id}/edit`                  : Show the form to edit a specific MRI staff (edit)
 * - PUT/PATCH `/mri-staff/{id}`                 : Update a specific MRI staff (update)
 * - DELETE `/mri-staff/{id}`                    : Delete a specific MRI staff (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/mri-staff`).
 */

// Route::resource('mri-staffs', MriStaffController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('mri-staffs.index');
//   });

/**
 * Resource Routes for PTChiroAppointmentRequestController
 * 
 * Endpoints:
 * - GET `/pt-chiro-appointment-requests`                           : List all PT/Chiro appointment requests (index)
 * - GET `/pt-chiro-appointment-requests/create`                    : Show the form to create a new PT/Chiro appointment request (create)
 * - POST `/pt-chiro-appointment-requests`                          : Store a newly created PT/Chiro appointment request (store)
 * - GET `/pt-chiro-appointment-requests/{id}`                      : Display a specific PT/Chiro appointment request (show)
 * - GET `/pt-chiro-appointment-requests/{id}/edit`                 : Show the form to edit a specific PT/Chiro appointment request (edit)
 * - PUT/PATCH `/pt-chiro-appointment-requests/{id}`                : Update a specific PT/Chiro appointment request (update)
 * - DELETE `/pt-chiro-appointment-requests/{id}`                   : Delete a specific PT/Chiro appointment request (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/pt-chiro-appointment-requests`).
 */

// Route::resource('pt-chiro-appointment-requests', PTChiroAppointmentRequestController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('pt-chiro-appointment-requests.index');
//   });

/**
 * Resource Routes for PTChiroFacilityController
 * 
 * Endpoints:
 * - GET `/pt-chiro-facilities`                           : List all PT/Chiro facilities (index)
 * - GET `/pt-chiro-facilities/create`                    : Show the form to create a new PT/Chiro facility (create)
 * - POST `/pt-chiro-facilities`                          : Store a newly created PT/Chiro facility (store)
 * - GET `/pt-chiro-facilities/{id}`                      : Display a specific PT/Chiro facility (show)
 * - GET `/pt-chiro-facilities/{id}/edit`                 : Show the form to edit a specific PT/Chiro facility (edit)
 * - PUT/PATCH `/pt-chiro-facilities/{id}`                : Update a specific PT/Chiro facility (update)
 * - DELETE `/pt-chiro-facilities/{id}`                   : Delete a specific PT/Chiro facility (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/pt-chiro-facilities`).
 */

// Route::resource('pt-chiro-facilities', PTChiroFacilityController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('pt-chiro-facilities.index');
//   });

/**
 * Resource Routes for ReferralSourceController
 * 
 * Endpoints:
 * - GET `/referral-source`                           : List all Referral Source (index)
 * - GET `/referral-source/create`                    : Show the form to create a new Referral Source (create)
 * - POST `/referral-source`                          : Store a newly created Referral Source (store)
 * - GET `/referral-source/{id}`                      : Display a specific Referral Source (show)
 * - GET `/referral-source/{id}/edit`                 : Show the form to edit a specific Referral Source (edit)
 * - PUT/PATCH `/referral-source/{id}`                : Update a specific Referral Source (update)
 * - DELETE `/referral-source/{id}`                   : Delete a specific Referral Source (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/referral-source`).
 */

// Route::resource('referral-source', ReferralSourceController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('referral-source.index');
//   });

/**
 * Resource Routes for ReferralSourceStaffController
 * 
 * Endpoints:
 * - GET `/referral-source-staff`                           : List all Referral Source Staff (index)
 * - GET `/referral-source-staff/create`                    : Show the form to create a new Referral Source Staff (create)
 * - POST `/referral-source-staff`                          : Store a newly created Referral Source Staff (store)
 * - GET `/referral-source-staff/{id}`                      : Display a specific Referral Source Staff (show)
 * - GET `/referral-source-staff/{id}/edit`                 : Show the form to edit a specific Referral Source Staff (edit)
 * - PUT/PATCH `/referral-source-staff/{id}`                : Update a specific Referral Source Staff (update)
 * - DELETE `/referral-source-staff/{id}`                   : Delete a specific Referral Source Staff (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/referral-source`).
 */

// Route::resource('referral-source-staff', ReferralSourceStaffController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('referral-source-staff.index');
//   });


/**
 * Resource Routes for DocumentController
 * 
 * Endpoints:
 * - GET `/documents`           : List all documents (index)
 * - GET `/documents/create`    : Show the form to create a new document (create)
 * - POST `/documents`          : Store a newly created document (store)
 * - GET `/documents/{id}`      : Display a specific document (show)
 * - GET `/documents/{id}/edit` : Show the form to edit a specific document (edit)
 * - PUT/PATCH `/documents/{id}`: Update a specific document (update)
 * - DELETE `/documents/{id}`   : Delete a specific document (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/documents`).
 */

// Route::resource('documents', DocumentController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('documents.index');
//   });


/**
 * Resource Routes for PatientNoteController
 * 
 * Endpoints:
 * - GET `/patient-note`                           : List all Patient Note (index)
 * - GET `/patient-note/create`                    : Show the form to create a new Patient Note (create)
 * - POST `/patient-note`                          : Store a newly created Patient Note (store)
 * - GET `/patient-note/{id}`                      : Display a specific Patient Note (show)
 * - GET `/patient-note/{id}/edit`                 : Show the form to edit a specific Patient Note (edit)
 * - PUT/PATCH `/patient-note/{id}`                : Update a specific Patient Note (update)
 * - DELETE `/patient-note/{id}`                   : Delete a specific Patient Note (destroy)
 * 
 * Custom Handling:
 * - If a resource is not found (e.g., a non-existent `id` is requested),
 *   the user will be redirected to the index route (`/patient-note`).
 */

// Route::resource('patient-note', PatientNoteController::class)
//   ->missing(function (Request $request) {
//     return Redirect::route('patient-note.index');
//   });


// Maps
// Route::get('/api/maps', [MapController::class, 'getFacilities'])->name('maps');


Route::get('/{any}', [AppController::class, 'index'])->where('any', '.*');
