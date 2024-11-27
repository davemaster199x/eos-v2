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
        Schema::create('specialist_staff', function (Blueprint $table) {
            $table->id();
            $table->text('title')->nullable();
            $table->string('name', 100)->nullable();
            $table->string('staff_language', 50)->nullable();
            $table->string('email', 50)->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('ss_designated_office_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('specialist_staff_id')->nullable()->constrained('specialist_staff');
            $table->string('designated_office', 100)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('ss_point_of_contact_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('specialist_staff_id')->nullable()->constrained('specialist_staff');
            $table->string('point_of_contact', 50)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('ss_specialist_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('specialist_staff_id')->nullable()->constrained('specialist_staff');
            $table->string('specialist_name', 100)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('ss_specialist_details');
        Schema::dropIfExists('ss_point_of_contact_details');
        Schema::dropIfExists('ss_designated_office_details');
        Schema::dropIfExists('specialist_staff');
    }
};
