<?php
header('Access-Control-Allow-Origin: http://localhost/kitchen.posi');
error_reporting(0);
session_start();
require 'conn.php';
require 'function.php';
$order = anti_Injection($_REQUEST['order']);
// $Id_appbender  = $_SESSION['Id_appbender'];
// $nama = $_SESSION['nama'];
// $email  = $_SESSION['email'];
// $hakaccess = $_SESSION['hakaccess'];
// $bg_profile =  $_SESSION['bg_profile'];
// $token  = $_SESSION['token'];
// $bg_ = $_SESSION['bg_'];

// if ($token === privateHashing(gettodayShort()) && $bg_ === BG_) {
switch ($order) {
    case 'ceklogin':
        echo 1;
        break;
    case 'cekHakaccess':
        echo json_encode(convertToMenu($hakaccess));
        break;

    case '9meinKosu':
        $query = query("SELECT * FROM tb_penyakit");
        echo json_encode($query);
        break;

    case 'modifiedDisease':
        $status = $_POST["status"];
        $id = $_POST["id"];

        $kodePenyakit = $_POST["kodePenyakitID"];
        $namaPenyakit = $_POST["namaPenyakitID"];

        if ($status == 'new') {
            $query = "INSERT 
                      INTO tb_penyakit
                      SET
                      kode_penyakit = '$kodePenyakit',
                      nama_penyakit = '$namaPenyakit'";
            $message = 'Data Berhasil Di Tambah';
        } else if ($status == 'edit' && isset($id)) {
            $decisiveData = [
                "tb_destination" => "tb_training_1",
                "id_tb_destination" => "Id_training",
                "tb_owner" => "9meinKosu",
            ];

            $dataUpdated = [
                "Id_penyakit" => $id,
                "nama_penyakit" => $namaPenyakit,
                "kode_penyakit" => $kodePenyakit,
            ];

            updateConcerned1($conn, $id, $decisiveData, $dataUpdated);


            $query = "UPDATE tb_penyakit
                      SET
                      kode_penyakit = '$kodePenyakit',
                      nama_penyakit = '$namaPenyakit'
                      WHERE Id_penyakit = '$id'";
            $message = 'Data Berhasil Di Update';
        } else if ($status == 'delete' && isset($id)) {

            $decisiveData = [
                "tb_destination" => "tb_training_1",
                "id_tb_destination" => "Id_training",
                "tb_owner" => "9meinKosu",
            ];

            deleteConcerned1($conn, $id, $decisiveData);

            $query = "DELETE FROM tb_penyakit
                      WHERE Id_penyakit = '$id'";
            $message = 'Data Berhasil Di Hapus';
        }

        $statusMessage = dataProses($query);

        echo json_encode([
            "title" => $statusMessage,
            "message" => $message,
        ]);
        break;


    case '10meinKosu':
        $query = query("SELECT 
                        t1.Id_gejala, t1.Id_penyakit, t1.kode_gejala, t1.gejala,
                        t1.bobot, t2.kode_penyakit, t2.nama_penyakit
                        FROM tb_gejala t1
                        LEFT JOIN tb_penyakit t2
                        ON t1.Id_penyakit = t2.Id_penyakit
                        ORDER BY kode_gejala ASC");
        echo json_encode($query);
        break;

    case 'modifiedSymptom':
        $status = $_POST["status"];
        $id = $_POST["id"];

        $idPenyakit = $_POST["idPenyakitForOpsID"];
        $kodePenyakit = $_POST["kodePenyakitForOpsID"];
        $namaPenyakit = $_POST["penyakitForOpsID"];
        $kodeGejala = $_POST["kodeGejalaID"];
        $gejala = $_POST["namaGejalaID"];
        $bobotGejala = floatval($_POST["bobotGejalaID"]);

        if ($status == 'new') {
            $query = "INSERT 
                      INTO tb_gejala
                      SET
                      Id_penyakit = $idPenyakit,
                      kode_gejala = '$kodeGejala',
                      gejala = '$gejala',
                      bobot = $bobotGejala";
            $message = 'Data Berhasil Di Tambah';
        } else if ($status == 'edit' && isset($id)) {
            $decisiveData = [
                "tb_destination" => "tb_training_1",
                "id_tb_destination" => "Id_training",
                "tb_owner" => "10meinKosu",
            ];

            $dataUpdated = [
                "Id_gejala" => (int)$id,
                "Id_penyakit" => (int)$idPenyakit,
                "kode_gejala" => $kodeGejala,
                "gejala" => $gejala,
                "bobot" => number_format($bobotGejala, 2),
            ];

            updateConcerned1($conn, $id, $decisiveData, $dataUpdated);

            $query = "UPDATE tb_gejala
                      SET
                      Id_penyakit = $idPenyakit,
                      kode_gejala = '$kodeGejala',
                      gejala = '$gejala',
                      bobot = '$bobotGejala'
                      WHERE Id_gejala = '$id'";
            $message = 'Data Berhasil Di Update';
        } else if ($status == 'delete' && isset($id)) {
            $decisiveData = [
                "tb_destination" => "tb_training_1",
                "id_tb_destination" => "Id_training",
                "tb_owner" => "10meinKosu",
            ];

            deleteConcerned1($conn, $id, $decisiveData);

            $query = "DELETE FROM tb_gejala
                      WHERE Id_gejala = '$id'";
            $message = 'Data Berhasil Di Hapus';
        }

        $statusMessage = dataProses($query);

        echo json_encode([
            "title" => $statusMessage,
            "message" => $message,
        ]);
        break;


    case '11meinKosu':
        $dataResult = [];
        $query = mysqli_query(
            $conn,
            "SELECT * FROM tb_training_1"
        );

        while ($rows = mysqli_fetch_assoc($query)) {
            $modalTrains = json_decode($rows["modal_train"], true);

            array_push($dataResult, [
                "Id_training" => $rows["Id_training"],
                "nama_train" => $rows["nama_train"],
                "modal_train" => $modalTrains,
                "Id_penyakit" => $rows["Id_penyakit"],
                "kode_penyakit" => $rows["kode_penyakit"],
                "penyakit" => $rows["penyakit"],
                "record" => $rows["record"],
            ]);
        }

        echo json_encode($dataResult);

        break;

    case 'combine10Meninkosu9':
        $query1 = query("SELECT * FROM tb_penyakit ORDER BY kode_penyakit ASC");

        $query2 = query("SELECT 
                         t1.Id_gejala, t1.Id_penyakit, t1.kode_gejala, t1.gejala,
                         t1.bobot, t2.kode_penyakit, t2.nama_penyakit
                         FROM tb_gejala t1
                         LEFT JOIN tb_penyakit t2
                         ON t1.Id_penyakit = t2.Id_penyakit
                         ORDER BY kode_gejala ASC");
        $combine = [
            "tb_penyakit" => $query1,
            "tb_gejala" => $query2,
        ];

        echo json_encode($combine);
        break;

    case 'modifiedTraining':
        $modalTrain = [];

        $status = $_POST["status"];
        $id = $_POST["id"];
        $jumlah = $_POST["islengthSymptom"];

        $nama = $_POST["caseOldNameID"];
        $penyakit = $_POST["diseaseID"];
        $idPenyakit = $_POST["idPenyakitnya"];
        $kodePenyakit = $_POST["diseaseKode"];

        for ($i = 0; $i <= $jumlah - 1; $i++) {
            //Modal Data Gejala2
            ${"labelG$i"} = $_POST["labelG" . $i];
            ${"labelIDG$i"} = $_POST["labelIDG" . $i];
            ${"labelParentIDG$i"} = $_POST["labelParentIDG" . $i];
            ${"labelKodeG$i"} = $_POST["labelKodeG" . $i];
            ${"labelBobotG$i"} = $_POST["labelBobotG" . $i];

            //modal answer for gejala
            ${"strAnswerG$i"} = $_POST["strAnswerG" . $i];
            ${"numAnswerG$i"} = $_POST["numAnswerG" . $i];
        }

        for ($i = 0; $i <= $jumlah - 1; $i++) {
            array_push($modalTrain, [
                "Id_gejala" => ${"labelIDG$i"},
                "Id_penyakit" => ${"labelParentIDG$i"},
                "kode_gejala" => sanitalisation(${"labelKodeG$i"}),
                "bobot" => ${"labelBobotG$i"},
                "gejala" => sanitalisation(${"labelG$i"}),
                "answer" =>  ${"strAnswerG$i"},
                "number" => ${"numAnswerG$i"},
            ]);
        }

        $modalTrain = json_encode($modalTrain);
        $today = explode(" ", gettoday())[0];

        if ($status == 'new') {
            $query = "INSERT 
                      INTO tb_training_1
                      SET
                      nama_train = '$nama',
                      modal_train = '$modalTrain',
                      Id_penyakit = '$idPenyakit',
                      kode_penyakit = '$kodePenyakit',
                      penyakit = '$penyakit',
                      record = '$today'";
            $message = 'Data Berhasil Di Tambah';
        } else if ($status == 'edit' && isset($id)) {
            $query = "UPDATE tb_training_1
                      SET
                      nama_train = '$nama',
                      modal_train = '$modalTrain',
                      Id_penyakit = '$idPenyakit',
                      kode_penyakit = '$kodePenyakit',
                      penyakit = '$penyakit',
                      record = '$today'
                      WHERE Id_training = '$id'";
            $message = 'Data Berhasil Di Update';
        } else if ($status == 'delete' && isset($id)) {
            $query = "DELETE FROM tb_training_1
                      WHERE Id_training = '$id'";
            $message = 'Data Berhasil Di Hapus';
        }

        $statusMessage = dataProses($query);

        echo json_encode([
            "title" => $statusMessage,
            "message" => $message,
        ]);
        break;


    case 'identity':
        $query = query("SELECT * FROM tb_appbender WHERE Id_appbender = 1");

        $arrData = [
            "dataQuery" => $query,
            "dataId" => 1,
        ];
        echo json_encode($arrData);
        break;


    case 'modifiedAppSettings':
        $status = $_POST["status"];
        $id = $_POST["id"];

        $nama = $_POST["appSetNameId"];
        $gender = $_POST["appSetGenderId"];
        $birthDay = $_POST["appSetBirthDayId"];
        $phone = phoneNumber($_POST["appSetPhoneDayId"]);
        $email = $_POST["appSetEmailId"];
        $pass = privateHashing($_POST["appSetPassId"]);
        $rePass = privateHashing($_POST["appSetRepassId"]);

        if ($status == 'edit' && isset($id)) {
            $query = "UPDATE tb_appbender
                      SET
                      nama = '$nama',
                      jenis_kelamin = '$gender',
                      tanggal_lahir = '$birthDay',
                      kontak = '$phone',
                      email = '$email',
                      `password` = '$pass'
                      WHERE Id_appbender = '$id'";
            $message = 'Data Berhasil Di Update';
        }

        $statusMessage = dataProses($query);

        echo json_encode([
            "title" => $statusMessage,
            "message" => $message,
        ]);
        break;


    case 'meinKosu':
        $dataTraining = query("SELECT *, count(Id_training) AS jumlah FROM tb_training GROUP BY penyakit");
        $dataset = query("SELECT *, count(Id_dataset) AS jumlah FROM tb_dataset GROUP BY hasil_penyakit");
        $gejala = query("SELECT count(*) AS Total FROM tb_atribut_value WHERE type_atribut = 'Data'");
        $penyakit = query("SELECT count(*) AS Total FROM tb_atribut_value WHERE type_atribut = 'Target'");

        $arr = [
            "dataTraining" => $dataTraining,
            "dataset" => $dataset,
            "gejala" => $gejala,
            "penyakit" => $penyakit,
        ];

        echo json_encode($arr);

        break;
}
// } else {
//     echo 0;
// }
