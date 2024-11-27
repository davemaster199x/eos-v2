<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patient_intake', function (Blueprint $table) {
            $table->id();
            $table->integer('law_firm_id')->nullable();
            $table->string('is_vip', 1)->nullable();
            $table->integer('law_firm_staff_id')->nullable()->comment('Case Manager');
            $table->string('first_name', 50)->nullable();
            $table->string('middle_name', 50)->nullable();
            $table->string('last_name', 50)->nullable();
            $table->string('preferred_language', 50)->nullable();
            $table->string('gender', 10)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->date('date_of_injury')->nullable();
            $table->string('phone', 100)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('full_address', 100)->nullable();
            $table->string('latitude', 100)->nullable();
            $table->string('longitude', 100)->nullable();
            $table->string('street_address', 100)->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('zip', 50)->nullable();
            $table->string('accident_type', 50)->nullable();
            $table->text('medical_note')->nullable();
            $table->string('status', 1)->default('1');
            $table->string('priority', 50)->default('Normal');
            $table->text('action_date_description')->nullable();
            $table->text('accident_details')->nullable();
            $table->text('summary_of_injuries')->nullable();
            $table->text('prior_treatments')->nullable();
            $table->text('appointment_preferrence')->nullable();
            $table->text('policy_details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_intake');
    }
};
