<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class Settings extends Seeder
{
        public function insert($name,$value)
        {
                $data = [
                        'name' => $name,
                        'value'    => $value
                ];

                $this->db->table('settings')->insert($data);
        }
}