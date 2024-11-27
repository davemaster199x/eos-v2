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
            $table->string('office_name', 100)->nullable()->change();
            $table->string('full_address')->nullable()->change();
            $table->string('street_address')->nullable()->change();
            $table->string('city', 100)->nullable()->change();
            $table->string('state', 50)->nullable()->change();
            $table->string('zip_code', 20)->nullable()->change();
            $table->string('phone', 20)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('provider_offices', function (Blueprint $table) {
            $table->string('office_name', 100)->nullable(false)->change();
            $table->string('full_address')->nullable(false)->change();
            $table->string('street_address')->nullable(false)->change();
            $table->string('city', 100)->nullable(false)->change();
            $table->state('state', 50)->nullable(false)->change();
            $table->string('zip_code', 20)->nullable(false)->change();
            $table->string('phone', 20)->nullable(false)->change();
        });
    }
};
