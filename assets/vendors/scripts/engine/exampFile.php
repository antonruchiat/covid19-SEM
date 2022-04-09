<?php
// $data = file_get_contents("./Response/Update/response.json");


function createProvince_DEF()
{
    $def_provinces = [];
    $data = file_get_contents("./Response/Provinces_List/response.json");
    $array = json_decode($data, true);

    $provinces = array_column($array["list_data"], 'key');

    foreach ($provinces as $key => $value) {
        array_push($def_provinces, str_replace(' ', '_', $value));
    }

    return [
        "resultProvinsi" => $provinces,
        "makeDefaultProvinsi" => $def_provinces,
    ];
}

function createIndividualProvince($provinces)
{
    $individualProvince = [];

    foreach ($provinces as $key => $value) {
        $api_url = "https://data.covid19.go.id/public/api/prov_detail_$value.json";
        $json_data = file_get_contents($api_url);
        $response_data = json_decode($json_data, true);
        array_push($individualProvince, $response_data);
    }

    // var_dump($individualProvince);
    return $individualProvince;
}

function createJSON_file($Path, $file)
{
    $jsonToFile = json_encode($file);

    $bytesIndividual = file_put_contents($Path . "response.json", $jsonToFile);
    // echo $bytesIndividual;

    return $bytesIndividual;
}

// $dataProvince =  createProvince_DEF();
// $result_provinces = $dataProvince["resultProvinsi"];
// $result_provinces = createJSON_file('./Response/result_provinces/', $dataProvince["resultProvinsi"]);


// $def_provinces = $dataProvince["makeDefaultProvinsi"];
// $def_provinces = createJSON_file('./Response/default_provinces/', $dataProvince["makeDefaultProvinsi"]);
