<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('pt_chiro_facilities', function (Blueprint $table) {
            $table->id();
            $table->string('facility_id')->unique();
            $table->string('name');
            $table->string('full_address');
            $table->string('latitude', 100)->nullable();
            $table->string('longitude', 100)->nullable();
            $table->string('street_address');
            $table->string('city', 100);
            $table->string('state', 50)->default('California');
            $table->string('zip_code', 20);
            $table->string('phone', 20);
            $table->string('image')->nullable();
            $table->json('therapies_provided');
            $table->char('status', 1)->default('1')->comment('1 - Active | 0 - Inactive');
            $table->enum('pay_status', ['Is Paying', 'On Hold', 'Not in Network', 'For Retention', 'Is Not Paying']);
            $table->text('notes')->nullable();
            $table->string('cv_file')->nullable();
            $table->string('lien_file')->nullable();
            $table->string('provider_collection_form_file')->nullable();
            $table->string('contract_file')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pt_chiro_facilities');
    }
};
