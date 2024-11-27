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
            $table->string('in_office')->nullable()->after('injection_type');
            $table->string('at_surgery_center')->nullable()->after('in_office');
            $table->comment('Injection Type')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patient_appointments', function (Blueprint $table) {
            $table->dropColumn('in_office');
            $table->dropColumn('at_surgery_center');
            $table->comment('')->change(); // Remove the comment
        });
    }
};
