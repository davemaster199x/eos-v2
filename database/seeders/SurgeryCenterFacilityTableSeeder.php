<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\EliteModel\SurgeryCenter\SurgeryCenter;

class SurgeryCenterFacilityTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    // Seed the surgery_centers table
    $surgeryCenters = [
      [
        'name' => 'Pacific Surgery Center',
        'provider_id' => 1,
        'full_address' => '123 Ocean Ave, Santa Monica, CA 90401',
        'latitude' => '34.0195',
        'longitude' => '-118.4912',
        'street_address' => '123 Ocean Ave',
        'city' => 'Santa Monica',
        'state' => 'California',
        'zip_code' => '90401',
        'phone' => '555-1234',
        'email' => 'info@pacificsurgery.com',
        'baa_file' => 'pacific_baa.pdf',
        'w9_file' => 'pacific_w9.pdf',
        'facility_lien_file' => 'pacific_lien.pdf',
        'photo_file' => 'pacific_photo.jpg',
        'status' => '1',
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'name' => 'Sunrise Surgery Center',
        'provider_id' => 2,
        'full_address' => '456 Sunrise Blvd, Los Angeles, CA 90001',
        'latitude' => '34.0522',
        'longitude' => '-118.2437',
        'street_address' => '456 Sunrise Blvd',
        'city' => 'Los Angeles',
        'state' => 'California',
        'zip_code' => '90001',
        'phone' => '555-5678',
        'email' => 'contact@sunrisesurgery.com',
        'baa_file' => 'sunrise_baa.pdf',
        'w9_file' => 'sunrise_w9.pdf',
        'facility_lien_file' => 'sunrise_lien.pdf',
        'photo_file' => 'sunrise_photo.jpg',
        'status' => '1',
        'created_at' => now(),
        'updated_at' => now(),
      ],
    ];

    // Insert data into surgery_centers table
    DB::table('surgery_centers')->insert($surgeryCenters);

    // Seed the sc_procedures_offered_detail table
    $proceduresOfferedDetails = [
      [
        'surgery_center_id' => 1,
        'name' => 'Orthopedic Surgery',
        'status' => '1',
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'surgery_center_id' => 1,
        'name' => 'Neurosurgery',
        'status' => '1',
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'surgery_center_id' => 2,
        'name' => 'Cardiac Surgery',
        'status' => '1',
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'surgery_center_id' => 2,
        'name' => 'Plastic Surgery',
        'status' => '1',
        'created_at' => now(),
        'updated_at' => now(),
      ],
    ];

    // Insert data into sc_procedures_offered_detail table
    DB::table('sc_procedures_offered_detail')->insert($proceduresOfferedDetails);
  }
}
