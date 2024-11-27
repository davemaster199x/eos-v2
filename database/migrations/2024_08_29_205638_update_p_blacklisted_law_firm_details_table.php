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
        // Drop the old table
        Schema::dropIfExists('p_blacklisted_law_firm_details');

        // Create the new table with the updated name and structure
        Schema::create('p_blacklisted_referral_source_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_id')->constrained('providers')->onDelete('cascade');
            $table->foreignId('referral_source_id')->constrained('referral_source');
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the new table
        Schema::dropIfExists('p_blacklisted_referral_source_details');

        // Recreate the old table with the original structure
        Schema::create('p_blacklisted_law_firm_details', function (Blueprint $table) {
            $table->id();
            $table->integer('provider_id')->nullable();
            $table->string('law_firm_id', 255)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });
    }
};
