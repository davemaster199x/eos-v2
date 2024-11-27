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
        Schema::create('specialist_offices', function (Blueprint $table) {
            $table->id();
            $table->integer('specialist_id')->nullable()->comment('id - specialist table');
            $table->string('full_address', 100)->nullable();
            $table->string('street_address', 100)->nullable();
            $table->string('latitude', 100)->nullable();
            $table->string('longitude', 100)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('state', 50)->nullable();
            $table->string('zip', 50)->nullable();
            $table->string('office_name', 100)->nullable();
            $table->text('office_notes')->nullable();
            $table->string('phone', 100)->nullable();
            $table->string('image_of_office', 255)->nullable();
            $table->string('status', 1)->default('1');
            $table->json('specialties_offered')->nullable();
            $table->timestamps();
        });

        Schema::create('sp_specialties_offered_details', function (Blueprint $table) {
            $table->id();
            $table->integer('specialist_office_id')->nullable();
            $table->string('specialties_offered', 100)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sp_specialties_offered_details');
        Schema::dropIfExists('specialist_offices');
    }
};
