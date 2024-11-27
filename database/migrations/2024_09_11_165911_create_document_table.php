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
        Schema::create('document', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('patient_intake_id')->nullable();
            $table->text('document_type')->nullable();
            $table->unsignedBigInteger('nearest_facility')->nullable()->comment('Provider Offices');
            $table->unsignedBigInteger('nearest_specialist')->nullable()->comment('Provider Offices');
            $table->integer('bill_amount')->nullable();
            $table->string('notes')->nullable();
            $table->string('status', 1)->default('1');
            $table->integer('deleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document');
    }
};
