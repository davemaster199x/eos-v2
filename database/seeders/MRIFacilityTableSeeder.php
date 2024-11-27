<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MRIFacilityTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Seed the mri_facility table
    $mriFacilities = [
      [
        'facility_name' => 'Downtown MRI Center',
        'full_address' => '123 Main St, Los Angeles, CA 90012',
        'latitude' => '34.0522',
        'longitude' => '-118.2437',
        'street_name' => '123 Main St',
        'city' => 'Los Angeles',
        'state' => 'California',
        'zip_code' => '90012',
        'phone' => '555-1234',
        'image_of_office' => 'downtown_mri.jpg',
        'status' => '1',
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'facility_name' => 'Westside Imaging',
        'full_address' => '456 Elm St, Beverly Hills, CA 90210',
        'latitude' => '34.0736',
        'longitude' => '-118.4004',
        'street_name' => '456 Elm St',
        'city' => 'Beverly Hills',
        'state' => 'California',
        'zip_code' => '90210',
        'phone' => '555-5678',
        'image_of_office' => 'westside_imaging.jpg',
        'status' => '1',
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'facility_name' => 'Eastside Diagnostic',
        'full_address' => '789 Oak St, Pasadena, CA 91101',
        'latitude' => '34.1478',
        'longitude' => '-118.1445',
        'street_name' => '789 Oak St',
        'city' => 'Pasadena',
        'state' => 'California',
        'zip_code' => '91101',
        'phone' => '555-9012',
        'image_of_office' => 'eastside_diagnostic.jpg',
        'status' => '1',
        'created_at' => now(),
        'updated_at' => now(),
      ],
    ];

    // Insert data into mri_facility table
    DB::table('mri_facility')->insert($mriFacilities);
  }
}
