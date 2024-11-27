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
            $table->dropColumn('visit_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mri_appointment', function (Blueprint $table) {
            $table->string('visit_type', 255)->charset('utf8mb4')->collation('utf8mb4_unicode_ci')->nullable(false);
        });
    }
};
