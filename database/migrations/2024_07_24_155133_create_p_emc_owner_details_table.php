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
        Schema::create('p_emc_owner_details', function (Blueprint $table) {
            $table->id();
            $table->integer('patient_intake_id')->nullable();
            $table->string('emc_owner_name', 100)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('p_emc_owner_details');
    }
};