<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class RefreshSpecificMigration extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:refresh-specific {migration}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Refresh a specific migration';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $migration = $this->argument('migration');

        // Remove the migration entry from the migrations table
        DB::table('migrations')->where('migration', $migration)->delete();

        // Run the specific migration
        $path = database_path('migrations/' . $migration . '.php');

        if (!file_exists($path)) {
            $this->error("Migration file not found.");
            return 1;
        }

        Artisan::call('migrate', [
            '--path' => 'database/migrations/' . $migration . '.php',
        ]);

        $this->info("Migration {$migration} has been refreshed.");
        return 0;
    }
}
