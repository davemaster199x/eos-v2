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
            $table->string('zip_code', 20)->nullable()->change();
            $table->string('full_address')->nullable()->change();
            $table->string('name')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('surgery_centers', function (Blueprint $table) {
            $table->string('zip_code', 20)->nullable(false)->change();
            $table->string('full_address')->nullable(false)->change();
            $table->string('name')->nullable(false)->change();
        });
    }
};
