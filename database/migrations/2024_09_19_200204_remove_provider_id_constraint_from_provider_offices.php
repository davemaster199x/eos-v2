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
        Schema::table('provider_offices', function (Blueprint $table) {
            $table->dropForeign(['provider_id']);

            // Change the column to allow null values
            $table->unsignedBigInteger('provider_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('provider_offices', function (Blueprint $table) {
            // Re-add the foreign key constraint
            $table->foreign('provider_id')->references('id')->on('providers')->onDelete('cascade');

            // Make the column non-nullable again
            $table->unsignedBigInteger('provider_id')->nullable(false)->change();
        });
    }
};
