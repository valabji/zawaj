<?php
namespace App\Models; 

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'user';
    protected $primarykey = '$id';
    protected $allowedFields = [
        'gender',
        'fullname',
        'country',
        'passport_id',
        'passport_expire',
        'height',
        'weight',
        'race',
        'race2',
        'race3',
        'education',
        'employee',
        'skin_color',
        'religion',
        'smoker',
        'finance',
        'finance_alt',
        'body_shape',
        'location_ftr_mrg',
        'marriage_type',
        'marital_status',
        'characteristic_of_marriage',
        'mult_marriage',
        'num_sone',
        'email',
        'phone',
        'password',
        'self_bio',
        'part_bio',
        'profile_photo',
        'token',
        'age'
    ];
}
