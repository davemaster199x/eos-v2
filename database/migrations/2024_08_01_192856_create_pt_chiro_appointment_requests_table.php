<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('pt_chiro_appointment_requests', function (Blueprint $table) {
            $table->id();
            $table->string('pt_chiro_appt_req_id')->unique();
            $table->foreignId('patient_id')->constrained('patient_intake');
            $table->foreignId('facility_id')->constrained('pt_chiro_facilities');
            $table->json('appointment_types');
            $table->text('notes')->nullable();
            $table->enum('request_status', ['Pending', 'Confirmed', 'Rejected'])->default('Pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pt_chiro_appointment_requests');
    }
};
