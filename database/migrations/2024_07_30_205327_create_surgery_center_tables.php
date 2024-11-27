<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('surgery_centers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('full_address');
            $table->string('latitude', 100)->nullable();
            $table->string('longitude', 100)->nullable();
            $table->string('street_address');
            $table->string('city', 100);
            $table->string('state', 50)->default('California');
            $table->string('zip_code', 20);
            $table->string('phone', 20);
            $table->string('email');
            $table->string('baa_file')->nullable();
            $table->string('w9_file')->nullable();
            $table->string('facility_lien_file')->nullable();
            $table->string('photo_file')->nullable();
            $table->json('procedures_offered')->nullable();
            $table->char('status', 1)->default('1')->comment('1 - Active | 0 - Inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surgery_centers');
    }
};
