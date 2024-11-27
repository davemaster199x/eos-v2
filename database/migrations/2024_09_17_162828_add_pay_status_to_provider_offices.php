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
        Schema::table('provider_offices', function (Blueprint $table) {
            $table->string('pay_status')->default('Is Paying')->after('status')
                ->comment('Payment status for the office. For Therapists: Is Paying, On Hold, Not in Network, For Retention, Is Not Paying');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('provider_offices', function (Blueprint $table) {
            $table->dropColumn('pay_status');
        });
    }
};
