<?php
// $data = file_get_contents("./Response/Update/response.json");


function createProvince_DEF()
{
    $data = file_get_contents("./Response/Provinces_List/response.json");
    $array = json_decode($data, true);

    $province = array_column($array["list_data"], 'key');

    foreach ($province as $key => $value) {
        $provinse[$key] = str_replace(' ', '_', $value);
    }

    return $province;
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

    $bytesIndividual = file_put_contents("$Path/response.json", $jsonToFile);
    // echo $bytesIndividual;

    return $bytesIndividual;
}
