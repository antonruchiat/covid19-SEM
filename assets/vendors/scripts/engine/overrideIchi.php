<?php
header('Access-Control-Allow-Origin: http://localhost/ajockey/selmi-knn/');
error_reporting(0);
session_start();
require 'conn.php';
require 'function.php';
$order = anti_Injection($_REQUEST['order']);
$Id_member  = $_SESSION['Id_member'];
$nama = $_SESSION['nama'];
$email  = $_SESSION['email'];
$work  = $_SESSION['pekerjaan'];
$bg_profile =  $_SESSION['bg_profile'];
$token  = $_SESSION['token'];
$bg_ = $_SESSION['bg_'];

if ($token === privateHashing(gettodayShort()) && $bg_ === BG_) {
    switch ($order) {
        case 'ceklogin':
            echo 1;
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
                "SELECT 
             t1.*,
             t2.Id_solusi, t2.Id_penyakit AS 'Id_penyakit_InSolusi', t2.solusi
             FROM tb_training_1 t1
             LEFT JOIN tb_solusi t2
             ON t1.Id_penyakit = t2.Id_penyakit"
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
                    "Id_solusi" => $rows["Id_solusi"],
                    "Id_penyakit_InSolusi" => $rows["Id_penyakit_InSolusi"],
                    "solusi" => $rows["solusi"],
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



        case '13meinKosu':
            $dataResult = [];
            $query = mysqli_query(
                $conn,
                "SELECT * FROM tb_dataset_1
                 WHERE Id_penyakit = 0
                 AND Id_member = $Id_member
                 ORDER BY record ASC"
            );

            while ($rows = mysqli_fetch_assoc($query)) {
                $modalTrains = json_decode($rows["modal_train"], true);

                array_push($dataResult, [
                    "Id_dataset" => $rows["Id_dataset"],
                    "nama_dataset" => $rows["nama_dataset"],
                    "modal_train" => $modalTrains,
                    "Id_penyakit" => $rows["Id_penyakit"],
                    "kode_penyakit" => $rows["kode_penyakit"],
                    "penyakit" => $rows["penyakit"],
                    "record" => $rows["record"],
                ]);
            }

            echo json_encode($dataResult);
            break;


        case 'modifiedDataset':
            $modalTrain = [];

            $status = $_POST["status"];
            $id = $_POST["id"];
            $jumlah = $_POST["islengthSymptomDataset"];

            $nama = $_POST["caseNewNameID"];
            // $penyakit = $_POST["diseaseID"];
            // $idPenyakit = $_POST["idPenyakitnya"];
            // $kodePenyakit = $_POST["diseaseKode"];

            for ($i = 0; $i <= $jumlah - 1; $i++) {
                //Modal Data Gejala2
                ${"labelDatasetG$i"} = $_POST["labelDatasetG" . $i];
                ${"labelDatasetIDG$i"} = $_POST["labelDatasetIDG" . $i];
                ${"labelDatasetParentIDG$i"} = $_POST["labelDatasetParentIDG" . $i];
                ${"labelDatasetKodeG$i"} = $_POST["labelDatasetKodeG" . $i];
                ${"labelDatasetBobotG$i"} = $_POST["labelDatasetBobotG" . $i];

                //modal answer for gejala
                ${"strAnswerDatasetG$i"} = $_POST["strAnswerDatasetG" . $i];
                ${"numAnswerDatasetG$i"} = $_POST["numAnswerDatasetG" . $i];
            }

            for ($i = 0; $i <= $jumlah - 1; $i++) {
                array_push($modalTrain, [
                    "Id_gejala" => ${"labelDatasetIDG$i"},
                    "Id_penyakit" => ${"labelDatasetParentIDG$i"},
                    "kode_gejala" => sanitalisation(${"labelDatasetKodeG$i"}),
                    "bobot" => ${"labelDatasetBobotG$i"},
                    "gejala" => sanitalisation(${"labelDatasetG$i"}),
                    "answer" =>  ${"strAnswerDatasetG$i"},
                    "number" => ${"numAnswerDatasetG$i"},
                ]);
            }

            $modalTrain = json_encode($modalTrain);
            $today = explode(" ", gettoday())[0];

            if ($status == 'new') {
                $query = "INSERT 
                          INTO tb_dataset_1
                          SET
                          nama_dataset = '$nama',
                          Id_member = $Id_member,
                          modal_train = '$modalTrain',
                          record = '$today'";
                $message = 'Data Berhasil Di Tambah';
            } else if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_dataset_1
                          SET
                          nama_dataset = '$nama',
                          modal_train = '$modalTrain'
                          WHERE Id_dataset = '$id'";
                $message = 'Data Berhasil Di Update';
            } else if ($status == 'delete' && isset($id)) {
                $query = "DELETE FROM tb_dataset_1
                          WHERE Id_dataset = '$id'";
                $message = 'Data Berhasil Di Hapus';
            }

            $statusMessage = dataProses($query);

            echo json_encode([
                "title" => $statusMessage,
                "message" => $message,
            ]);
            break;


        case 'isSimiliarity':
            $status = $_POST["status"];
            $id = $_POST["id"];

            $Id_penyakit = $_POST["Id_penyakit"];
            $kode_penyakit = $_POST["kode_penyakit"];
            $penyakit = $_POST["penyakit"];
            $modal_diagnosa = $_POST["modal_diagnosa"];

            $Id_solusi = $_POST["Id_solusi"];
            $solusi = sanitalisation($_POST["solusi"]);


            if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_dataset_1
                          SET
                          Id_penyakit = '$Id_penyakit',
                          Id_solusi = '$Id_solusi',
                          modal_diagnosa = '$modal_diagnosa',
                          kode_penyakit = '$kode_penyakit',
                          penyakit = '$penyakit',
                          solusi = '$solusi'
                          WHERE Id_dataset = '$id'";
                $message = 'Data Berhasil Di Update';
            }

            $statusMessage = dataProses($query);

            echo json_encode([
                "title" => $statusMessage,
                "message" => $message,
            ]);
            break;


        case '14meinKosu':
            $dataResult = [];
            $query = mysqli_query(
                $conn,
                "SELECT * FROM tb_dataset_1
                 WHERE Id_penyakit != 0
                 AND Id_member = $Id_member
                 ORDER BY record ASC"
            );

            while ($rows = mysqli_fetch_assoc($query)) {
                $modalTrains = json_decode($rows["modal_train"], true);
                $modalDiagnos = json_decode($rows["modal_diagnosa"], true);

                array_push($dataResult, [
                    "Id_dataset" => $rows["Id_dataset"],
                    "nama_dataset" => $rows["nama_dataset"],
                    "modal_train" => $modalTrains,
                    "Id_penyakit" => $rows["Id_penyakit"],
                    "kode_penyakit" => $rows["kode_penyakit"],
                    "penyakit" => $rows["penyakit"],
                    "modal_diagnosa" => $modalDiagnos,
                    "solusi" => $rows["solusi"],
                    "Id_solusi" => $rows["Id_solusi"],
                    "record" => $rows["record"],
                ]);
            }

            echo json_encode($dataResult);
            break;


        case 'identityUser':
            $query = query("SELECT * FROM tb_member WHERE Id_member = $Id_member");

            $arrData = [
                "dataQuery" => $query,
                "dataId" => $Id_member,
            ];
            echo json_encode($arrData);
            break;


        case 'modifiedAppIdentityUser':
            $status = $_POST["status"];
            $id = $_POST["id"];

            $nama = $_POST["appSetNameId"];
            $gender = $_POST["appSetGenderId"];
            $birthDay = $_POST["appSetBirthDayId"];
            $phone = phoneNumber($_POST["appSetPhoneDayId"]);
            $email = $_POST["appSetEmailId"];
            $work = $_POST["appSetIsworkId"];
            $pass = privateHashing($_POST["appSetPassId"]);
            $rePass = privateHashing($_POST["appSetRepassId"]);

            if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_member
                      SET
                      nama = '$nama',
                      jenis_kelamin = '$gender',
                      tanggal_lahir = '$birthDay',
                      kontak = '$phone',
                      email = '$email',
                      `password` = '$pass',
                      pekerjaan = '$work'
                      WHERE Id_member = '$Id_member'";
                $message = 'Data Berhasil Di Update';
            }

            $statusMessage = dataProses($query);

            echo json_encode([
                "title" => $statusMessage,
                "message" => $message,
            ]);
            break;

        case 'personalInfo':
            echo json_encode([
                "nama" => $nama,
                "Id_member" => $Id_member,
                "email" => $email,
                "pekerjaan" => $work,
                "bg_profile" => $bg_profile,
            ]);
            break;

        case 'exportPDF':
            echo exportPDF($conn, $Id_member);
            break;
    }
} else {
    echo 0;
}
