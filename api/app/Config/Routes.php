<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
// $routes->get('/', 'Home::index');

$routes->get('users','Users::index');
$routes->get('users/search','Users::search');
$routes->post('users','Users::create');
$routes->patch('users/(:num)','Users::update/$1');
$routes->patch('users/setblock/(:num)','Users::setblock/$1');
$routes->delete('users/(:num)','Users::delete/$1');
$routes->post('users/login','Users::login');
$routes->options('(:any)', 'Users::options');

$routes->get('settings','Settings::index');
$routes->post('settings','Settings::create');
$routes->patch('settings/(:num)','Settings::update/$1');
$routes->delete('settings/(:num)','Settings::delete/$1');

$routes->get('city','City::index');
$routes->post('city','City::create');
$routes->patch('city/(:num)','City::update/$1');
$routes->delete('city/(:num)','City::delete/$1');

$routes->get('bundles','Bundles::index');
$routes->post('bundles','Bundles::create');
$routes->patch('bundles/(:num)','Bundles::update/$1');
$routes->delete('bundles/(:num)','Bundles::delete/$1');

$routes->group('api', ['namespace' => 'App\Controllers\API'], function($routes)
{

});


/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
