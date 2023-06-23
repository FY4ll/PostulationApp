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
        Schema::create('postulations_preavis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('postulation_id');
            $table->unsignedBigInteger('colab_id');
            $table->char('resultat');
            $table->longText('commentaire');
            $table->timestamps();

            $table->foreign('postulation_id')->references('id')->on('postulations')->onDelete('cascade');
            $table->foreign('colab_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('postulation_preavis', function (Blueprint $table) {
            $table->dropForeign(['postulation_id']);
            $table->dropForeign(['colab_id']);
        });

        Schema::dropIfExists('postulation_preavis');
    }
};
