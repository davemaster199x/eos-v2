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
        Schema::create('referral_source', function (Blueprint $table) {
            $table->id(); // id column
            $table->string('referral_source_name', 255)->nullable();
            $table->string('business_type', 50)->nullable(); // business_type column
            $table->string('logo', 255)->nullable(); // logo column
            $table->string('full_address', 255)->nullable(); // full_address column
            $table->string('street_address', 100)->nullable(); // street_address column
            $table->string('city', 50)->nullable(); // city column
            $table->string('state', 50)->nullable(); // state column
            $table->string('zip', 10)->nullable(); // zip_code column
            $table->string('phone', 100)->nullable(); // phone column
            $table->string('email', 50)->nullable(); // email column
            $table->char('status', 1)->default('1'); // status column, default '1'
            $table->timestamps(); // created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referral_source');
    }
};
