<?php
namespace App\Models; 

use CodeIgniter\Model;

class SettingsModel extends Model
{
    protected $table = 'settings';
    protected $primarykey = '$id';
    protected $allowedFields = [
        'name',
        'value'
    ];
}
