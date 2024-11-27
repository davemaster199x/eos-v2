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
        Schema::create('provider_staff', function (Blueprint $table) {
            $table->id();
            $table->text('provider_type')->nullable();
            $table->text('title')->nullable();
            $table->string('name', 100)->nullable();
            $table->string('staff_language', 50)->nullable();
            $table->string('email', 50)->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('ps_designated_office_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_staff_id')->nullable()->constrained('provider_staff');
            $table->foreignId('designated_office')->nullable()->constrained('provider_offices');
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('ps_point_of_contact_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_staff_id')->nullable()->constrained('provider_staff');
            $table->string('point_of_contact', 50)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('ps_provider_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_staff_id')->nullable()->constrained('provider_staff');
            $table->foreignId('provider_id')->nullable()->constrained('providers');
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('ps_provider_details');
        Schema::dropIfExists('ps_point_of_contact_details');
        Schema::dropIfExists('ps_designated_office_details');
        Schema::dropIfExists('provider_staff');
    }
};
