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
        Schema::table('provider_staff', function (Blueprint $table) {
            // Drop the name column
            $table->dropColumn('name');

            // Add first_name, middle_name, and last_name columns
            $table->string('first_name', 100)->nullable()->after('title');
            $table->string('middle_name', 100)->nullable()->after('first_name');
            $table->string('last_name', 100)->nullable()->after('middle_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('provider_staff', function (Blueprint $table) {
            // Drop first_name, middle_name, and last_name columns
            $table->dropColumn(['first_name', 'middle_name', 'last_name']);

            // Re-add the name column
            $table->string('name', 100)->nullable()->default(null)->after('title');
        });
    }
};
