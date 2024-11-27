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
        Schema::create('mri_appointment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patient_intake');
            $table->foreignId('mri_facility_id')->constrained('mri_facility');
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->string('visit_type');
            $table->text('notes')->nullable();
            $table->enum('status', ['1', '0'])->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mri_appointment');
    }
};
