<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings_models', function (Blueprint $table) {
            $table->id();
            $table->string('space_url');
            $table->string('project_id');
            $table->string('token');
            $table->string('signalwire_number');
            $table->string('forwarding_number');
            $table->string('business_name')->default('Perfect Painters');
            $table->string('forwarding_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings_models');
    }
};
