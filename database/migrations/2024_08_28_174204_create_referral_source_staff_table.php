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
        Schema::create('referral_source_staff', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('referral_source_id');
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->string('title')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('status', 1)->default('1')->nullable(); // Set default value to 1
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referral_source_staff');
    }
};
