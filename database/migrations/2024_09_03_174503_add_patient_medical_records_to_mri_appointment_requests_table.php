<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('mri_appointment_requests', function (Blueprint $table) {
            // Add the patient_medical_records field
            $table->string('patient_medical_records')->nullable()->after('facility_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('mri_appointment_requests', function (Blueprint $table) {
            // Drop the patient_medical_records field
            $table->dropColumn('patient_medical_records');
        });
    }
};
