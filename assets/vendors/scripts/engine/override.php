<?php
header('Access-Control-Allow-Origin: http://localhost/covid19-SEM/');
error_reporting(0);
session_start();
require 'function.php';
$order = anti_Injection($_REQUEST['order']);

// if ($token === privateHashing(gettodayShort())) {
switch ($order) {
    case 'meinKosu':
        $data = file_get_contents("./Response/Update/response.json");
        $data = json_decode($data, true);

        $province = file_get_contents("./Response/Provinces_List/response.json");
        $province = json_decode($province, true);

        $individualProvinsi  = file_get_contents("./Response/Province/response.json");
        $individualProvinsi = json_decode($individualProvinsi, true);

        $individualProvinsi1  = file_get_contents("./Response/Provinces_Historical_Daily_Data/response.json");
        $individualProvinsi1 = json_decode($individualProvinsi1, true);

        $arr = [
            "countSchedule" => "anton",
            "countDosen" => "ruchiat",
            "countRooms" => "developer",
            "countSemester" => "expert",
            "data" => $data,
            "province" => $province,
            "individualProvinsi" => $individualProvinsi,
            "individualProvinsi1" => $individualProvinsi1,
        ];

        echo json_encode($arr);

        break;
}
// } else {
//     echo 0;
// }
