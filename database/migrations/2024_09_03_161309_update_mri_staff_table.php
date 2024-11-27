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
        Schema::table('mri_staff', function (Blueprint $table) {
            // Add new columns
            $table->string('first_name', 255)->nullable()->after('id');
            $table->string('middle_name', 255)->nullable()->after('first_name');
            $table->string('last_name', 255)->nullable()->after('middle_name');

            // Drop the old `name` column
            $table->dropColumn('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('mri_staff', function (Blueprint $table) {
            // Re-add the `name` column
            $table->string('name', 255)->nullable()->after('id');

            // Optionally: Recombine `first_name`, `middle_name`, `last_name` into `name`
            DB::statement('
                UPDATE `mri_staff`
                SET `name` = CONCAT_WS(" ", `first_name`, `middle_name`, `last_name`)
            ');

            // Drop the new columns
            $table->dropColumn(['first_name', 'middle_name', 'last_name']);
        });
    }
};
