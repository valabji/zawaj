<?php
namespace App\Models; 

use CodeIgniter\Model;

class CityModel extends Model
{
    protected $table = 'city';
    protected $primarykey = '$id';
    protected $allowedFields = [
        'name'
    ];
}
