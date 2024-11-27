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
        Schema::table('surgery_centers', function (Blueprint $table) {
            // Drop the foreign key constraint
            $table->dropForeign(['provider_id']);
            
            // Drop the provider_id column
            $table->dropColumn('provider_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('surgery_centers', function (Blueprint $table) {
            // Recreate the provider_id column
            $table->bigInteger('provider_id')->unsigned()->after('updated_at');
            
            // Recreate the foreign key constraint
            $table->foreign('provider_id')->references('id')->on('providers');
        });
    }
};
