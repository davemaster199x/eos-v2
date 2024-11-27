<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('provider_offices', function (Blueprint $table) {
            // Add office schedule columns after 'status'
            $table->string('email', 255)->nullable()->after('phone');
            $table->string('monday_schedule', 255)->nullable()->after('status');
            $table->string('tuesday_schedule', 255)->nullable()->after('monday_schedule');
            $table->string('wednesday_schedule', 255)->nullable()->after('tuesday_schedule');
            $table->string('thursday_schedule', 255)->nullable()->after('wednesday_schedule');
            $table->string('friday_schedule', 255)->nullable()->after('thursday_schedule');
            $table->string('saturday_schedule', 255)->nullable()->after('friday_schedule');
            $table->string('sunday_schedule', 255)->nullable()->after('saturday_schedule');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('provider_offices', function (Blueprint $table) {
            // Drop the office schedule columns if rolled back
            $table->dropColumn([
                'email',
                'monday_schedule',
                'tuesday_schedule',
                'wednesday_schedule',
                'thursday_schedule',
                'friday_schedule',
                'saturday_schedule',
                'sunday_schedule',
            ]);
        });
    }
};
