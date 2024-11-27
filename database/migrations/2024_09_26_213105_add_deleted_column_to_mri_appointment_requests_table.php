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
        Schema::table('mri_appointment_requests', function (Blueprint $table) {
            $table->unsignedTinyInteger('deleted')->default(0)->after('request_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mri_appointment_requests', function (Blueprint $table) {
            $table->dropColumn('deleted');
        });
    }
};
