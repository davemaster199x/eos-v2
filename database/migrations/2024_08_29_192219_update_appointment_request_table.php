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
        // Remove the appointment_type column from appointment_request table
        if (Schema::hasColumn('appointment_request', 'appointment_type')) {
            Schema::table('appointment_request', function (Blueprint $table) {
                $table->dropColumn('appointment_type');
            });
        }

        // Create the par_appointment_types table
        Schema::create('par_appointment_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_request_id')
                ->constrained('appointment_request')
                ->onDelete('cascade');
            $table->string('name');
            $table->string('status')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the par_appointment_types table
        Schema::dropIfExists('par_appointment_types');

        // Add the appointment_type column back to the appointment_request table
        Schema::table('appointment_request', function (Blueprint $table) {
            $table->string('appointment_type', 50)->nullable();
        });
    }
};
