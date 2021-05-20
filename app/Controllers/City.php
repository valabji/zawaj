<?php
namespace App\Controllers;
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE');
// require APPPATH . '/Libraries/REST_Controller.php';
// use Restserver\Libraries\REST_Controller;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\CityModel;

class Settings extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $st = new CityModel();
        $data = $st->findAll();
        http_response_code(200);
        $res = [
            'success' => true,
            'data' => $data
        ];
        return $this->response->setJSON($res);
    }
    public function create()
    {
        $data = [
            'name' => $this->request->getVar("name")
        ];
        $st = new CityModel();
        $ok = $st->save($data);
        http_response_code(200);
        $res = [
            'success' => $ok,
            'msg' => 'Data Created'
        ];
        return $this->response->setJSON($res);
    }
    public function update($id = null)
    {
        $data = [
            'name' => $this->request->getVar("name")
        ];
        $st = new CityModel();
        $ok = $st->update($id,$data);
        http_response_code(200);
        $res = [
            'success' => $ok,
            'msg' => 'Data Updated'
        ];
        return $this->response->setJSON($res);
    }

    public function delete($id = null)
    {
        $st = new CityModel();
        $ok = $st->delete($id);
        http_response_code(200);
        $res = [
            'success' => true,
            'msg' => 'Data Deleted'
        ];
        return $this->response->setJSON($res);
    }

}
?>
