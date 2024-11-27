<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('mri_appointment_requests', function (Blueprint $table) {
            $table->id();
            $table->string('mri_appt_req_id')->unique();
            $table->foreignId('patient_id')->constrained('patient_intake');
            $table->foreignId('facility_id')->constrained('mri_facility');
            $table->text('notes')->nullable();
            $table->enum('request_status', ['Pending', 'Confirmed', 'Rejected'])->default('Pending');
            $table->enum('status', ['1', '0'])->default('1');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('mri_appointment_requests');
    }
};
