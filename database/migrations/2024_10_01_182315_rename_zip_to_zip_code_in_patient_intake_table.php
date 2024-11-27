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
        Schema::table('patient_intake', function (Blueprint $table) {
            $table->string('zip_code')->nullable()->after('state');
            $table->dropColumn('zip');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patient_intake', function (Blueprint $table) {
            $table->string('zip')->nullable()->after('state');
            $table->dropColumn('zip_code');
        });
    }
};
