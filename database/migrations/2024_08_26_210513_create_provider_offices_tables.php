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
        Schema::create('provider_offices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained('providers');
            $table->string('office_name', 100);
            $table->text('notes')->nullable();
            $table->string('provider_type', 100)->default('Therapist');
            $table->string('full_address');
            $table->string('latitude', 100)->nullable();
            $table->string('longitude', 100)->nullable();
            $table->string('street_address');
            $table->string('city', 100);
            $table->string('state', 50)->default('California');
            $table->string('zip_code', 20);
            $table->string('phone', 20);
            $table->string('photo_file')->nullable();
            $table->char('status', 1)->default('1')->comment('1 - Active | 0 - Inactive');
            $table->timestamps();
        });

        Schema::create('po_specialty_details', function (Blueprint $table) {
            $table->id();
            $table->integer('provider_office_id')->nullable();
            $table->string('name', 100)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('po_therapies_provided', function (Blueprint $table) {
            $table->id();
            $table->integer('provider_office_id')->nullable();
            $table->string('name', 100)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provider_offices');
        Schema::dropIfExists('po_specialty_details');
        Schema::dropIfExists('po_therapies_provided');
    }
};
