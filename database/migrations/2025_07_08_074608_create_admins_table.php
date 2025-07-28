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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();                             // Primary key
            $table->string('name');                  // Admin name
            $table->string('teacher_id')->unique();  // Unique teacher ID
            $table->string('email')->unique();       // Unique email
            $table->string('password');              // Password
            $table->timestamps();                    // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
};
