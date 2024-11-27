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
        Schema::table('mri_appointment', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->string('mri_appt_status')->after('notes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mri_appointment', function (Blueprint $table) {
            $table->dropColumn('mri_appt_status');
            $table->integer('status')->after('notes');
        });
    }
};
