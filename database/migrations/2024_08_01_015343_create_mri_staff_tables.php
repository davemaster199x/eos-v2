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
        Schema::create('mri_staff', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->nullable();
            $table->text('title')->nullable();
            $table->string('email', 100)->nullable();
            $table->string('phone', 100)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('mri_staff_assigned_facility', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mri_staff_id');
            $table->foreignId('mri_facility_id')->nullable()->constrained('mri_facility');
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('mri_staff_assigned_facility');
        Schema::dropIfExists('mri_staff');
    }
};
