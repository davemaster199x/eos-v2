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
        Schema::create('mri_facility', function (Blueprint $table) {
            $table->id();
            $table->string('facility_name', 100)->nullable();
            $table->string('full_address', 255)->nullable();
            $table->string('latitude', 100)->nullable();
            $table->string('longitude', 100)->nullable();
            $table->string('street_name', 100)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('state', 50)->nullable();
            $table->string('zip_code', 50)->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('image_of_office', 255)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mri_facility');
    }
};
