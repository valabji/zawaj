<?php
namespace App\Models; 

use CodeIgniter\Model;

class BundlesModel extends Model
{
    protected $table = 'bundles';
    protected $primarykey = '$id';
    protected $allowedFields = [
        'name',
        'price',
        'description'
    ];
}
