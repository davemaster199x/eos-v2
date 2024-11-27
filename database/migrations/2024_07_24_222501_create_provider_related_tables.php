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
        Schema::create('p_blacklisted_law_firm_details', function (Blueprint $table) {
            $table->id();
            $table->integer('provider_id')->nullable();
            $table->string('law_firm_id', 255)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('p_other_documents_form_details', function (Blueprint $table) {
            $table->id();
            $table->integer('provider_id')->nullable();
            $table->string('other_documents_file', 255)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('p_provider_collection_form_details', function (Blueprint $table) {
            $table->id();
            $table->integer('provider_id')->nullable();
            $table->string('provider_collection_form_file', 255)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('p_specialty_details', function (Blueprint $table) {
            $table->id();
            $table->integer('provider_id')->nullable();
            $table->string('name', 100)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('p_therapies_provided', function (Blueprint $table) {
            $table->id();
            $table->integer('provider_id')->nullable();
            $table->string('name', 100)->nullable();
            $table->string('status', 1)->default('1');
            $table->timestamps();
        });

        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 100)->nullable();
            $table->string('middle_name', 50)->nullable();
            $table->string('last_name', 100)->nullable();
            $table->string('status', 1)->default('1')->comment('1 - Active | 0 - Inactive');
            $table->string('pay_status', 50)->default('Is Paying');
            $table->string('provider_type', 20)->nullable();
            $table->string('language', 20)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('phone', 100)->nullable();
            $table->text('provider_communication_note')->nullable();
            $table->string('headshot', 255)->nullable();
            $table->string('lien', 255)->nullable();
            $table->string('cv', 255)->nullable();
            $table->string('signed_contract', 255)->nullable();
            $table->string('w_9', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('p_blacklisted_law_firm_details');
        Schema::dropIfExists('p_other_documents_form_details');
        Schema::dropIfExists('p_provider_collection_form_details');
        Schema::dropIfExists('p_specialty_details');
        Schema::dropIfExists('providers');
    }
};
