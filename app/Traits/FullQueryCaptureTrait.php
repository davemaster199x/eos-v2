<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait FullQueryCaptureTrait
{
    protected $lastFullQuery;

    public function getLastFullQuery()
    {
        return $this->lastFullQuery;
    }

    protected function captureFullQuery($builder)
    {
        // Enable query log
        DB::enableQueryLog();

        // Execute the query
        $builder->get();

        // Get the last query from the log
        $queryLog = DB::getQueryLog();
        $lastQuery = end($queryLog);

        if ($lastQuery) {
            $sql = $lastQuery['query'];
            $bindings = $lastQuery['bindings'];

            // Replace placeholders with actual values
            foreach ($bindings as $binding) {
                $value = is_numeric($binding) ? $binding : "'" . addslashes($binding) . "'";
                $sql = preg_replace('/\?/', $value, $sql, 1);
            }

            $this->lastFullQuery = $sql;
        }

        // Disable query log to prevent memory issues
        DB::disableQueryLog();
    }
}