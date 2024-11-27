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
        // Update the surgery_centers table
        Schema::table('surgery_centers', function (Blueprint $table) {
            // Add the provider_id foreign key
            $table->foreignId('provider_id')->constrained('providers')->after('id');

            // Remove the procedures_offered column
            $table->dropColumn('procedures_offered');
        });

        // Create the sc_procedures_offered_detail table
        Schema::create('sc_procedures_offered_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('surgery_center_id')->constrained('surgery_centers')->onDelete('cascade');
            $table->string('name');
            $table->char('status', 1)->default('1')->comment('1 - Active | 0 - Inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the sc_procedures_offered_detail table
        Schema::dropIfExists('sc_procedures_offered_detail');

        // Reverse the surgery_centers table changes
        Schema::table('surgery_centers', function (Blueprint $table) {
            // Drop the provider_id foreign key and column
            $table->dropForeign(['provider_id']);
            $table->dropColumn('provider_id');

            // Add the procedures_offered column back
            $table->json('procedures_offered')->nullable();
        });
    }
};
