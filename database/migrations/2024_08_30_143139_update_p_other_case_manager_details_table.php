<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Step 1: Add the new column
        Schema::table('p_other_case_manager_details', function (Blueprint $table) {
            if (!Schema::hasColumn('p_other_case_manager_details', 'other_referral_source_staff_id')) {
                $table->integer('other_referral_source_staff_id')->nullable()->comment('Case Manager')->after('patient_intake_id');
            }
        });

        // Step 2: Ensure that both columns exist before copying data
        if (
            Schema::hasColumn('p_other_case_manager_details', 'other_law_firm_staff_id') &&
            Schema::hasColumn('p_other_case_manager_details', 'other_referral_source_staff_id')
        ) {
            DB::statement('UPDATE p_other_case_manager_details SET other_referral_source_staff_id = other_law_firm_staff_id');
        }

        // Step 3: Drop the old column if it exists
        Schema::table('p_other_case_manager_details', function (Blueprint $table) {
            if (Schema::hasColumn('patient_intake', 'other_law_firm_staff_id')) {
                $table->dropColumn('other_law_firm_staff_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Step 1: Add the old column back
        Schema::table('p_other_case_manager_details', function (Blueprint $table) {
            $table->integer('other_law_firm_staff_id')->nullable()->comment('Case Manager')->after('patient_intake_id');
        });

        // Step 2: Copy data back if columns exist
        DB::statement('UPDATE p_other_case_manager_details SET other_law_firm_staff_id = other_referral_source_staff_id');

        // Step 3: Drop the new column if it exists
        Schema::table('p_other_case_manager_details', function (Blueprint $table) {
            if (Schema::hasColumn('patient_intake', 'other_referral_source_staff_id')) {
                $table->dropColumn('other_referral_source_staff_id');
            }
        });
    }
};
