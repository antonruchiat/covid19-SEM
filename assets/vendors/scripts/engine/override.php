<?php
header('Access-Control-Allow-Origin: http://localhost/covid19-SEM/');
error_reporting(0);
require 'function.php';
$order = anti_Injection($_REQUEST['order']);

switch ($order) {
    case 'meinKosu':
        $update = file_get_contents("./Response/Update/response.json");
        $update = json_decode($update, true);

        $result_province = file_get_contents("./Response/result_provinces/response.json");
        $result_province = json_decode($result_province, true);

        $default_province = file_get_contents("./Response/default_provinces/response.json");
        $default_province = json_decode($default_province, true);

        $individualProvinsi  = file_get_contents("./Response/Individual_Provinces/response.json");
        $individualProvinsi = json_decode($individualProvinsi, true);

        $arr = [
            "dataUpdateCovid19" => $update,
            "dataProvinces" => [
                "resultProvinsi" => $result_province,
                "makeDefaultProvinsi" => $default_province,
            ],
            "individualData" => $individualProvinsi,
        ];

        echo json_encode($arr);

        break;

    case 'meinKosu1':
        $result_province = file_get_contents("./Response/result_provinces/response.json");
        $result_province = json_decode($result_province, true);

        $default_province = file_get_contents("./Response/default_provinces/response.json");
        $default_province = json_decode($default_province, true);

        $individualProvinsi  = file_get_contents("./Response/Individual_Provinces/response.json");
        $individualProvinsi = json_decode($individualProvinsi, true);

        $arr = [
            "dataProvinces" => [
                "resultProvinsi" => $result_province,
                "makeDefaultProvinsi" => $default_province,
            ],
            "individualData" => $individualProvinsi,
        ];

        echo json_encode($arr);
        break;

    case 'meinKosu2':
        $update = file_get_contents("./Response/Update/response.json");
        $update = json_decode($update, true);

        $result_province = file_get_contents("./Response/result_provinces/response.json");
        $result_province = json_decode($result_province, true);

        $default_province = file_get_contents("./Response/default_provinces/response.json");
        $default_province = json_decode($default_province, true);

        $individualProvinsi  = file_get_contents("./Response/Individual_Provinces/response.json");
        $individualProvinsi = json_decode($individualProvinsi, true);

        $arr = [
            "dataUpdateCovid19" => $update,
            "dataProvinces" => [
                "resultProvinsi" => $result_province,
                "makeDefaultProvinsi" => $default_province,
            ],
            "individualData" => $individualProvinsi,
        ];

        echo json_encode($arr);

        break;
}
