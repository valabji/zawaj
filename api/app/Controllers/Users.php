<?php
namespace App\Controllers;
// header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE');

// require APPPATH . '/Libraries/REST_Controller.php';
// use Restserver\Libraries\REST_Controller;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
// F7G0Ox8M5qH4
class Users extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $st = new UserModel();
        $data = $st->findAll();
        $data2 = [];
        foreach ($data as $item) {
            unset($item['password']);
            unset($item['token']);
            array_push($data2, $item);
        }
        http_response_code(200);
        $res = [
            'success' => true,
            'data' => $data2,
        ];
        return $this->response->setJSON($res);
    }
    public function create()
    {
        $data = [
            'gender' => $this->request->getVar('gender'),
            'fullname' => $this->request->getVar('fullname'),
            'country' => $this->request->getVar('country'),
            'passport_id' => $this->request->getVar('passport_id'),
            'passport_expire' => $this->request->getVar('passport_expire'),
            'height' => $this->request->getVar('height'),
            'weight' => $this->request->getVar('weight'),
            'race' => $this->request->getVar('race'),
            'race2' => $this->request->getVar('race2'),
            'race3' => $this->request->getVar('race3'),
            'education' => $this->request->getVar('education'),
            'employee' => $this->request->getVar('employee'),
            'skin_color' => $this->request->getVar('skin_color'),
            'religion' => $this->request->getVar('religion'),
            'smoker' => $this->request->getVar('smoker'),
            'finance' => $this->request->getVar('finance'),
            'finance_alt' => $this->request->getVar('finance_alt'),
            'body_shape' => $this->request->getVar('body_shape'),
            'location_ftr_mrg' => $this->request->getVar('location_ftr_mrg'),
            'marriage_type' => $this->request->getVar('marriage_type'),
            'marital_status' => $this->request->getVar('marital_status'),
            'characteristic_of_marriage' => $this->request->getVar(
                'characteristic_of_marriage'
            ),
            'mult_marriage' => $this->request->getVar('mult_marriage'),
            'num_sone' => $this->request->getVar('num_sone'),
            'email' => $this->request->getVar('email'),
            'phone' => $this->request->getVar('phone'),
            'password' => md5($this->request->getVar('password')),
            'self_bio' => $this->request->getVar('self_bio'),
            'part_bio' => $this->request->getVar('part_bio'),
            'profile_photo' => $this->request->getVar('profile_photo'),
        ];
        $st = new UserModel();
        $ok = $st->save($data);
        http_response_code(200);
        $res = [
            'success' => $ok,
            'msg' => 'Data Created',
        ];
        return $this->response->setJSON($res);
    }
    public function update($id = null)
    {
        $data = [
            'gender' => $this->request->getVar('gender'),
            'fullname' => $this->request->getVar('fullname'),
            'country' => $this->request->getVar('country'),
            'passport_id' => $this->request->getVar('passport_id'),
            'passport_expire' => $this->request->getVar('passport_expire'),
            'height' => $this->request->getVar('height'),
            'weight' => $this->request->getVar('weight'),
            'race' => $this->request->getVar('race'),
            'race2' => $this->request->getVar('race2'),
            'race3' => $this->request->getVar('race3'),
            'education' => $this->request->getVar('education'),
            'employee' => $this->request->getVar('employee'),
            'skin_color' => $this->request->getVar('skin_color'),
            'religion' => $this->request->getVar('religion'),
            'smoker' => $this->request->getVar('smoker'),
            'finance' => $this->request->getVar('finance'),
            'finance_alt' => $this->request->getVar('finance_alt'),
            'body_shape' => $this->request->getVar('body_shape'),
            'location_ftr_mrg' => $this->request->getVar('location_ftr_mrg'),
            'marriage_type' => $this->request->getVar('marriage_type'),
            'marital_status' => $this->request->getVar('marital_status'),
            'characteristic_of_marriage' => $this->request->getVar(
                'characteristic_of_marriage'
            ),
            'mult_marriage' => $this->request->getVar('mult_marriage'),
            'num_sone' => $this->request->getVar('num_sone'),
            'email' => $this->request->getVar('email'),
            'phone' => $this->request->getVar('phone'),
            'password' => md5($this->request->getVar('password')),
            'self_bio' => $this->request->getVar('self_bio'),
            'part_bio' => $this->request->getVar('part_bio'),
            'profile_photo' => $this->request->getVar('profile_photo'),
        ];
        $st = new UserModel();
        $ok = $st->update($id, $data);
        http_response_code(200);
        $res = [
            'success' => $ok,
            'msg' => 'Data Updated',
        ];
        return $this->response->setJSON($res);
    }

    public function delete($id = null)
    {
        $st = new UserModel();
        $ok = $st->delete($id);
        http_response_code(200);
        $res = [
            'success' => true,
            'msg' => 'Data Deleted',
        ];
        return $this->response->setJSON($res);
    }

    public function auth()
    {
        $headers = apache_request_headers();
        $token = $headers['Authorization'];
        $token = explode(' ', $token)[1];
        $st = new UserModel();
        $data = $st->where('token', $token)->findAll();
        $res = [
            'success' => false,
            'msg' => 'Invalid Token',
        ];
        if (sizeof($data) >= 1) {
            $data = $data[0];
            $id = $data['id'];
            $pass = $data['password'];
            unset($data['password']);
            unset($data['token']);
            $res = [
                'success' => true,
                'data' => $data,
            ];
        }
        http_response_code(200);
        return $this->response->setJSON($res);
    }

    public function login()
    {
        $st = new UserModel();
        $data = $st
            ->where('email', $this->request->getVar('email'))
            ->findAll()[0];
        $id = $data['id'];
        $pass = $data['password'];
        unset($data['password']);
        $generator = new \PHPTokenGenerator\TokenGenerator();
        $token = $generator->generate(32);
        $data['token'] = $token;
        $data2 = [
            'token' => $token,
        ];
        $st = new UserModel();
        $ok = $st->update($id, $data2);
        $res = [
            'success' => false,
            'msg' => 'Invalid Login Data',
        ];
        if ($pass === md5($this->request->getVar('password'))) {
            $res = [
                'success' => true,
                'data' => $data,
            ];
        }
        http_response_code(200);
        return $this->response->setJSON($res);
    }

    public function search()
    {
        $db = db_connect();
        $where = ' true ';

        ////// Queries

        $gender = $this->request->getVar('gender');
        if ($gender != '') {
            $where .= " AND gender = $gender";
        }
        $fullname = $this->request->getVar('fullname');
        if ($fullname != '') {
            $where .= " AND fullname = $fullname";
        }
        $country = $this->request->getVar('country');
        if ($country != '') {
            $where .= " AND country = $country";
        }
        $passport_id = $this->request->getVar('passport_id');
        if ($passport_id != '') {
            $where .= " AND passport_id = $passport_id";
        }
        $passport_expire = $this->request->getVar('passport_expire');
        if ($passport_expire != '') {
            $where .= " AND passport_expire = $passport_expire";
        }
        $height = $this->request->getVar('height');
        if ($height != '') {
            $where .= " AND height = $height";
        }
        $weight = $this->request->getVar('weight');
        if ($weight != '') {
            $where .= " AND weight = $weight";
        }
        $race = $this->request->getVar('race');
        if ($race != '') {
            $where .= " AND race = $race";
        }
        $race2 = $this->request->getVar('race2');
        if ($race2 != '') {
            $where .= " AND race2 = $race2";
        }
        $race3 = $this->request->getVar('race3');
        if ($race3 != '') {
            $where .= " AND race3 = $race3";
        }
        $education = $this->request->getVar('education');
        if ($education != '') {
            $where .= " AND education = $education";
        }
        $employee = $this->request->getVar('employee');
        if ($employee != '') {
            $where .= " AND employee = $employee";
        }
        $skin_color = $this->request->getVar('skin_color');
        if ($skin_color != '') {
            $where .= " AND skin_color = $skin_color";
        }
        $religion = $this->request->getVar('religion');
        if ($religion != '') {
            $where .= " AND religion = $religion";
        }
        $smoker = $this->request->getVar('smoker');
        if ($smoker != '') {
            $where .= " AND smoker = $smoker";
        }
        $finance = $this->request->getVar('finance');
        if ($finance != '') {
            $where .= " AND finance = $finance";
        }
        $finance_alt = $this->request->getVar('finance_alt');
        if ($finance_alt != '') {
            $where .= " AND finance_alt = $finance_alt";
        }
        $body_shape = $this->request->getVar('body_shape');
        if ($body_shape != '') {
            $where .= " AND body_shape = $body_shape";
        }
        $location_ftr_mrg = $this->request->getVar('location_ftr_mrg');
        if ($location_ftr_mrg != '') {
            $where .= " AND location_ftr_mrg = $location_ftr_mrg";
        }
        $marriage_type = $this->request->getVar('marriage_type');
        if ($marriage_type != '') {
            $where .= " AND marriage_type = $marriage_type";
        }
        $marital_status = $this->request->getVar('marital_status');
        if ($marital_status != '') {
            $where .= " AND marital_status = $marital_status";
        }
        $characteristic_of_marriage = $this->request->getVar(
            'characteristic_of_marriage'
        );
        if ($characteristic_of_marriage != '') {
            $where .= " AND characteristic_of_marriage = $characteristic_of_marriage";
        }
        $mult_marriage = $this->request->getVar('mult_marriage');
        if ($mult_marriage != '') {
            $where .= " AND mult_marriage = $mult_marriage";
        }
        $num_sone = $this->request->getVar('num_sone');
        if ($num_sone != '') {
            $where .= " AND num_sone = $num_sone";
        }
        $email = $this->request->getVar('email');
        if ($email != '') {
            $where .= " AND email = $email";
        }
        $phone = $this->request->getVar('phone');
        if ($phone != '') {
            $where .= " AND phone = $phone";
        }
        $password = $this->request->getVar('password');
        if ($password != '') {
            $where .= " AND password = $password";
        }
        $self_bio = $this->request->getVar('self_bio');
        if ($self_bio != '') {
            $where .= " AND self_bio = $self_bio";
        }
        $part_bio = $this->request->getVar('part_bio');
        if ($part_bio != '') {
            $where .= " AND part_bio = $part_bio";
        }
        $profile_photo = $this->request->getVar('profile_photo');
        if ($profile_photo != '') {
            $where .= " AND profile_photo = $profile_photo";
        }

        ////// Queries END

        $cn = $db->query("select * from user where $where");
        $data = $cn->getResult();
        $data = json_encode($data);
        $data = json_decode($data, true);
        $where = 'true';
        $data2 = [];
        foreach ($data as $item) {
            unset($item['password']);
            unset($item['token']);
            array_push($data2, $item);
        }
        http_response_code(200);
        $res = [
            'success' => true,
            'data' => $data2,
        ];
        return $this->response->setJSON($res);
    }

    public function options(): Response
    {
        return $this->response
            ->setHeader('Access-Control-Allow-Origin', '*') //for allow any domain, insecure
            ->setHeader('Access-Control-Allow-Headers', '*') //for allow any headers, insecure
            ->setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT,PATCH, DELETE'
            ) //method allowed
            ->setStatusCode(200); //status code
    }
}
?>
