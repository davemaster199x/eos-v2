<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('pt_chiro_staff', function (Blueprint $table) {
            $table->id();
            $table->string('pt_chiro_facility_staff_id')->unique();
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('title');
            $table->string('email')->unique();
            $table->string('phone');
            $table->char('status', 1)->default('1')->comment('1 - Active | 0 - Inactive');
            $table->timestamps();
        });

        Schema::create('pt_chiro_facility_staff', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pt_chiro_staff_id');
            $table->unsignedBigInteger('pt_chiro_facility_id');
            $table->timestamps();

            $table->foreign('pt_chiro_staff_id')->references('id')->on('pt_chiro_staff')->onDelete('cascade');
            $table->foreign('pt_chiro_facility_id')->references('id')->on('pt_chiro_facilities')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pt_chiro_facility_staff');
        Schema::dropIfExists('pt_chiro_staff');
    }
};