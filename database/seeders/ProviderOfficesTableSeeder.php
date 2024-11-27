<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProviderOfficesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed the provider_offices table
        $providerOffices = [
            [
                'provider_id' => 1,
                'office_name' => 'Sunset Therapy Center',
                'notes' => 'Main office for therapy services.',
                'provider_type' => 'Therapist',
                'full_address' => '123 Sunset Blvd, Los Angeles, CA',
                'latitude' => '34.0522',
                'longitude' => '-118.2437',
                'street_address' => '123 Sunset Blvd',
                'city' => 'Los Angeles',
                'state' => 'California',
                'zip_code' => '90001',
                'phone' => '555-1234',
                'photo_file' => 'sunset_therapy.jpg',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_id' => 2,
                'office_name' => 'Downtown Therapy Clinic',
                'notes' => 'Therapy clinic in downtown area.',
                'provider_type' => 'Therapist',
                'full_address' => '456 Downtown St, San Francisco, CA',
                'latitude' => '37.7749',
                'longitude' => '-122.4194',
                'street_address' => '456 Downtown St',
                'city' => 'San Francisco',
                'state' => 'California',
                'zip_code' => '94102',
                'phone' => '555-5678',
                'photo_file' => 'downtown_therapy.jpg',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_id' => 3,
                'office_name' => 'Specialist Care Clinic',
                'notes' => 'Specialist services in the heart of the city.',
                'provider_type' => 'Specialist',
                'full_address' => '789 Park Ave, New York, NY',
                'latitude' => '40.7128',
                'longitude' => '-74.0060',
                'street_address' => '789 Park Ave',
                'city' => 'New York',
                'state' => 'New York',
                'zip_code' => '10001',
                'phone' => '555-7890',
                'photo_file' => 'specialist_care_clinic.jpg',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_id' => 4,
                'office_name' => 'Advanced Specialist Center',
                'notes' => 'Advanced care for specialized needs.',
                'provider_type' => 'Specialist',
                'full_address' => '101 Broadway, New York, NY',
                'latitude' => '40.7128',
                'longitude' => '-74.0060',
                'street_address' => '101 Broadway',
                'city' => 'New York',
                'state' => 'New York',
                'zip_code' => '10002',
                'phone' => '555-1010',
                'photo_file' => 'advanced_specialist_center.jpg',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Additional offices
            [
                'provider_id' => 5,
                'office_name' => 'Eastside Therapy Group',
                'notes' => 'Eastside branch offering various therapy services.',
                'provider_type' => 'Therapist',
                'full_address' => '789 Eastside Dr, San Diego, CA',
                'latitude' => '32.7157',
                'longitude' => '-117.1611',
                'street_address' => '789 Eastside Dr',
                'city' => 'San Diego',
                'state' => 'California',
                'zip_code' => '92101',
                'phone' => '555-2345',
                'photo_file' => 'eastside_therapy.jpg',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_id' => 6,
                'office_name' => 'Westside Specialist Clinic',
                'notes' => 'Specialized care with experienced professionals.',
                'provider_type' => 'Specialist',
                'full_address' => '456 Westside Ave, Los Angeles, CA',
                'latitude' => '34.0522',
                'longitude' => '-118.2437',
                'street_address' => '456 Westside Ave',
                'city' => 'Los Angeles',
                'state' => 'California',
                'zip_code' => '90001',
                'phone' => '555-3456',
                'photo_file' => 'westside_specialist.jpg',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_id' => 7,
                'office_name' => 'Northside Rehab Center',
                'notes' => 'Comprehensive rehabilitation services.',
                'provider_type' => 'Therapist',
                'full_address' => '123 Northside St, San Jose, CA',
                'latitude' => '37.3382',
                'longitude' => '-121.8863',
                'street_address' => '123 Northside St',
                'city' => 'San Jose',
                'state' => 'California',
                'zip_code' => '95112',
                'phone' => '555-4567',
                'photo_file' => 'northside_rehab.jpg',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_id' => 8,
                'office_name' => 'Central Medical Center',
                'notes' => 'Multi-specialty clinic with top doctors.',
                'provider_type' => 'Specialist',
                'full_address' => '789 Central Blvd, Sacramento, CA',
                'latitude' => '38.5816',
                'longitude' => '-121.4944',
                'street_address' => '789 Central Blvd',
                'city' => 'Sacramento',
                'state' => 'California',
                'zip_code' => '94203',
                'phone' => '555-5678',
                'photo_file' => 'central_medical.jpg',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into provider_offices table
        DB::table('provider_offices')->insert($providerOffices);

        // Seed the po_specialty_details table
        $specialtyDetails = [
            // Specialties for Specialist Care Clinic
            [
                'provider_office_id' => 3,
                'name' => 'Pain Management',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 3,
                'name' => 'Orthopedic Surgeon',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 3,
                'name' => 'Neurosurgeon',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 3,
                'name' => 'Neurologist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 3,
                'name' => 'Orthospine',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 3,
                'name' => 'Podiatrist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 3,
                'name' => 'Internal Medicine',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Specialties for Advanced Specialist Center
            [
                'provider_office_id' => 4,
                'name' => 'Pain Management',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 4,
                'name' => 'Orthopedic Surgeon',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 4,
                'name' => 'Neurosurgeon',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 4,
                'name' => 'Neurologist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 4,
                'name' => 'Orthospine',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 4,
                'name' => 'Podiatrist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 4,
                'name' => 'Internal Medicine',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Specialties for Westside Specialist Clinic
            [
                'provider_office_id' => 6,
                'name' => 'Pain Management',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 6,
                'name' => 'Orthopedic Surgeon',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 6,
                'name' => 'Neurosurgeon',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 6,
                'name' => 'Neurologist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 6,
                'name' => 'Orthospine',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 6,
                'name' => 'Podiatrist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 6,
                'name' => 'Internal Medicine',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Specialties for Central Medical Center
            [
                'provider_office_id' => 8,
                'name' => 'Pain Management',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Orthopedic Surgeon',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Neurosurgeon',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Neurologist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Orthospine',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Podiatrist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Internal Medicine',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into po_specialty_details table
        DB::table('po_specialty_details')->insert($specialtyDetails);

        // Seed the po_therapies_provided table
        $therapiesProvided = [
            // Therapies for Sunset Therapy Center
            [
                'provider_office_id' => 1,
                'name' => 'Physical Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 1,
                'name' => 'Chiropractic Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 1,
                'name' => 'Vestibular Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 1,
                'name' => 'Acupuncture',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 1,
                'name' => 'Massage Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 1,
                'name' => 'Podiatrist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 1,
                'name' => 'Physiotherapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Therapies for Downtown Therapy Clinic
            [
                'provider_office_id' => 2,
                'name' => 'Physical Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 2,
                'name' => 'Chiropractic Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 2,
                'name' => 'Vestibular Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 2,
                'name' => 'Acupuncture',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 2,
                'name' => 'Massage Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 2,
                'name' => 'Podiatrist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 2,
                'name' => 'Physiotherapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Therapies for Eastside Therapy Group
            [
                'provider_office_id' => 5,
                'name' => 'Physical Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 5,
                'name' => 'Chiropractic Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 5,
                'name' => 'Vestibular Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 5,
                'name' => 'Acupuncture',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 5,
                'name' => 'Massage Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 5,
                'name' => 'Podiatrist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 5,
                'name' => 'Physiotherapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Therapies for Northside Rehab Center
            [
                'provider_office_id' => 7,
                'name' => 'Physical Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 7,
                'name' => 'Chiropractic Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 7,
                'name' => 'Vestibular Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 7,
                'name' => 'Acupuncture',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 7,
                'name' => 'Massage Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 7,
                'name' => 'Podiatrist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 7,
                'name' => 'Physiotherapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Therapies for Central Medical Center
            [
                'provider_office_id' => 8,
                'name' => 'Physical Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Chiropractic Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Vestibular Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Acupuncture',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Massage Therapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Podiatrist',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'provider_office_id' => 8,
                'name' => 'Physiotherapy',
                'status' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insert data into po_therapies_provided table
        DB::table('po_therapies_provided')->insert($therapiesProvided);
    }
}
