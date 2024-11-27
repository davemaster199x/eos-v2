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
        Schema::create('appointment_request', function (Blueprint $table) {
            $table->id();
            $table->string('high_priority', 10)->nullable();
            $table->integer('patient_intake_id')->nullable();
            $table->string('provider_type')->nullable();
            $table->integer('provider_id')->nullable()->comment('Provider Requested');
            $table->string('appointment_type', 50)->nullable();
            $table->string('injection_type', 50)->nullable();
            $table->text('in_office')->nullable()->comment('Injection Type');
            $table->text('at_surgery_center')->nullable()->comment('Injection Type');
            $table->string('visit_type', 50)->nullable();
            $table->integer('provider_office_id')->nullable();
            $table->integer('surgery_center_id')->nullable();
            $table->string('patient_medical_records', 255)->nullable();
            $table->text('notes')->nullable();
            $table->string('request_status', 50)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointment_request');
    }
};
