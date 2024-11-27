<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('patient_intake', function (Blueprint $table) {
            // Add the new column referral_source_id
            $table->integer('referral_source_id')->nullable()->after('law_firm_id');
        });

        // Copy data from law_firm_staff_id to referral_source_staff_id
        DB::statement('UPDATE patient_intake SET referral_source_id = law_firm_staff_id');

        Schema::table('patient_intake', function (Blueprint $table) {
            // Drop the old column law_firm_staff_id
            $table->dropColumn('law_firm_staff_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patient_intake', function (Blueprint $table) {
            // Add back the old column law_firm_staff_id
            $table->integer('law_firm_staff_id')->nullable()->comment('Case Manager')->after('law_firm_id');
        });

        // Copy data back from referral_source_staff_id to law_firm_staff_id
        DB::statement('UPDATE patient_intake SET law_firm_id = referral_source_id');

        Schema::table('patient_intake', function (Blueprint $table) {
            // Drop the new column referral_source_staff_id
            $table->dropColumn('referral_source_staff_id');

            // Drop the referral_source_id column
            $table->dropColumn('referral_source_id');
        });
    }
};
