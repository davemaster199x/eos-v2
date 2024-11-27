<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('pt_chiro_appointments', function (Blueprint $table) {
            $table->id();
            $table->string('pt_chiro_appt_id')->unique();
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('facility_id');
            $table->json('appointment_type');
            $table->enum('visit_type', ['In Person', 'Telemedicine']);
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->text('special_notes')->nullable();
            $table->enum('appointment_status', ['Pending', 'Cancelled', 'Rescheduled', 'Completed', 'No-Show'])->default('Pending');
            $table->timestamps();

            $table->foreign('patient_id')->references('id')->on('patient_intake')->onDelete('cascade');
            $table->foreign('facility_id')->references('id')->on('pt_chiro_facilities')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pt_chiro_appointments');
    }
};