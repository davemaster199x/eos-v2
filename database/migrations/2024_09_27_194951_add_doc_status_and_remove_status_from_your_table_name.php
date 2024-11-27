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
        Schema::table('document', function (Blueprint $table) {
            $table->string('doc_status')->default('Pending')->after('id'); // Add new column
            $table->dropColumn('status'); // Remove old column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('document', function (Blueprint $table) {
            $table->dropColumn('doc_status'); // Remove new column
            $table->string('status')->after('id'); // Add old column back
        });
    }
};