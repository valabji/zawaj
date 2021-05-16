<?php

namespace App\Controllers;

class Login extends CI_Controller
{
	public function index()
	{
		http_response_code(200);
        $res = [
            'success' => true,
            'msg' => 'TEST Request',
        ];
        return $this->response->setJSON($res);
	}
}
