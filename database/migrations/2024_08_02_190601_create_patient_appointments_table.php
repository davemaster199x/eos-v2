<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('patient_appointments', function (Blueprint $table) {
            $table->id();
            $table->string('appt_id')->unique();
            $table->unsignedBigInteger('patient_id');
            $table->unsignedBigInteger('provider_id');
            $table->string('injection_type')->nullable();
            $table->unsignedBigInteger('provider_office_id')->nullable();
            $table->unsignedBigInteger('surgery_center_id')->nullable();
            $table->string('visit_type');
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->string('lien_file')->nullable();
            $table->text('special_notes')->nullable();
            $table->string('appointment_status')->default('Pending');
            $table->timestamps();

            $table->foreign('patient_id')->references('id')->on('patient_intake');
            $table->foreign('provider_id')->references('id')->on('providers');
            // $table->foreign('provider_office_id')->references('id')->on('provider_offices');
            $table->foreign('surgery_center_id')->references('id')->on('surgery_centers');
        });

        Schema::create(
            'pa_items_needed',
            function (Blueprint $table) {
                $table->id();
                $table->foreignId('patient_appointment_id')->constrained('patient_appointments')->onDelete('cascade');
                $table->string('name');
                $table->string('status')->default('1');
                $table->timestamps();
            }
        );

        Schema::create('pa_appointment_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_appointment_id')->constrained('patient_appointments')->onDelete('cascade');
            $table->string('name');
            $table->string('status')->default('1');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('patient_appointments');
        Schema::dropIfExists('pa_items_needed');
        Schema::dropIfExists('pa_appointment_types');
    }
};
