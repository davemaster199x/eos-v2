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
        if (!Schema::hasColumn('referral_source', 'zip_code')) {
            Schema::table('referral_source', function (Blueprint $table) {
                $table->string('zip_code', 10)->nullable()->after('zip');
            });

            // Copy data only if both columns exist
            if (Schema::hasColumn('referral_source', 'zip') && Schema::hasColumn('referral_source', 'zip_code')) {
                DB::statement('UPDATE referral_source SET zip_code = zip WHERE zip_code IS NULL');
            }

            Schema::table('referral_source', function (Blueprint $table) {
                $table->dropColumn('zip');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (!Schema::hasColumn('referral_source', 'zip')) {
            Schema::table('referral_source', function (Blueprint $table) {
                $table->string('zip', 10)->nullable()->after('zip_code');
            });

            // Copy data only if both columns exist
            if (Schema::hasColumn('referral_source', 'zip') && Schema::hasColumn('referral_source', 'zip_code')) {
                DB::statement('UPDATE referral_source SET zip = zip_code WHERE zip IS NULL');
            }

            Schema::table('referral_source', function (Blueprint $table) {
                $table->dropColumn('zip_code');
            });
        }
    }
};
