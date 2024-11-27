<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

class MigrateNew extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:new';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run only new migrations that have not been executed yet';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Get the list of all migration files
        $migrations = collect(glob(database_path('migrations') . '/*.php'))->map(function ($path) {
            return basename($path, '.php');
        });

        // Get the list of already run migrations from the database
        $ranMigrations = DB::table('migrations')->pluck('migration');

        // Filter out the migrations that have already been run
        $newMigrations = $migrations->diff($ranMigrations);

        if ($newMigrations->isEmpty()) {
            $this->info('No new migrations to run.');
        } else {
            $this->info('Running new migrations:');

            // Run each new migration
            foreach ($newMigrations as $migration) {
                $this->info("Running migration: $migration");
                Artisan::call('migrate', ['--path' => 'database/migrations/' . $migration . '.php']);
            }

            $this->info('All new migrations have been run.');
        }

        return 0;
    }
}
