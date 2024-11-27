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
        Schema::table('patient_appointments', function (Blueprint $table) {
            $table->unsignedTinyInteger('deleted')->default(0)->after('appointment_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patient_appointments', function (Blueprint $table) {
            $table->dropColumn('deleted');
        });
    }
};
