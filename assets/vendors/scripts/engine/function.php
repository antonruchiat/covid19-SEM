<?php
function gettoday()
{
    $date = time();
    date_default_timezone_set('Asia/Jakarta');
    $year = date('Y', $date);
    $month = date('m', $date);
    $day = date('d', $date);
    $hour = date('H', $date);
    $menit = date('i', $date);
    $detik = date('s', $date);
    $todays = $year . '-' . $month . '-' . $day . ' ' . $hour . ':' . $menit . ':' . $detik;
    return $todays;
}

function gettodayShort()
{
    $date = time();
    date_default_timezone_set('Asia/Jakarta');
    $year = date('Y', $date);
    $month = date('m', $date);
    $day = date('d', $date);
    $hour = date('H', $date);
    $menit = date('i', $date);
    $detik = date('s', $date);
    $todays = $year . '-' . $month . '-' . $day;
    return $todays;
}

function anti_Injection($data)
{
    return htmlspecialchars($data, ENT_QUOTES);
}


function convertToMenu($arrMenu)
{
    $resultMenu = [];
    $arrMenu = json_decode($arrMenu);
    foreach ($arrMenu as $value) {
        if ($value == 'Dashboard') {
            $resultMenu[] = 'meinKosu';
        } else if ($value == 'Gejala') {
            $resultMenu[] = '1meinKosu';
        } else if ($value == 'Nilai Atribut') {
            $resultMenu[] = '4meinKosu';
        } else if ($value == 'Data Training') {
            $resultMenu[] = '3meinKosu';
        } else if ($value == 'Dataset') {
            $resultMenu[] = '5meinKosu';
        } else if ($value == 'Dataset Nilai') {
            $resultMenu[] = '6meinKosu';
        } else if ($value == 'Nearest') {
            $resultMenu[] = '7meinKosu';
        } else if ($value == 'Hasil') {
            $resultMenu[] = '8meinKosu';
        }
    }

    return $resultMenu;
}
function query($query)
{
    global $conn;
    $result = mysqli_query($conn, $query);
    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    return $rows;
}
function dataProses($query)
{
    global $conn;
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}
define("BG_", "taihcurccurna9200257b14586f434131f4f36f8ca6ddf39d89");

function dataByid($table, $tableId, $id)
{

    $query = query("SELECT * FROM $table WHERE $tableId = $id")[0];

    return $query;
}
function updateConcerned($conn, $id, $decisiveData, $dataUpdated)
{
    $table = $decisiveData["tb_destination"];
    $tableId = $decisiveData["id_tb_destination"];
    $order = $decisiveData["tb_owner"];

    $checkRowsinRows = false;

    $checkData = mysqli_query(
        $conn,
        "SELECT * FROM $table"
    );

    while ($rows = mysqli_fetch_assoc($checkData)) {

        $checkModalTrain = json_decode($rows["modal_training"], true);

        foreach ($checkModalTrain as $key => $value) {
            if ($order == '1meinKosu') {
                if ($value["Id_atribut"] == $id) {

                    $atribut = $dataUpdated["nama_atribut"];
                    $status = $dataUpdated["status_atribut"];
                    $keterangan = $dataUpdated["keterangan"];

                    $checkRowsinRows = true;
                    $idTableTraining = $rows["Id_training"];

                    $checkModalTrain[$key]["Id_atribut"] = $id;
                    $checkModalTrain[$key]["atribut"] = sanitalisation($atribut);
                    $checkModalTrain[$key]["status"] = $status;
                    $checkModalTrain[$key]["keterangan"] = sanitalisation($keterangan);
                    $checkModalTrain[$key]["Id_atribut_value"] = $value["Id_atribut_value"];
                    $checkModalTrain[$key]["nama_value"] = sanitalisation($value["nama_value"]);
                    $checkModalTrain[$key]["type_atribut"] = $value["type_atribut"];
                }
            } elseif ($order == '4meinKosu') {
                if (
                    $value["Id_atribut_value"] == $id &&
                    $value["type_atribut"] == 'Data'
                ) {
                    $nama_value = $dataUpdated["nama_value"];
                    $type_atribut = $dataUpdated["type_atribut"];
                    $bobot_atribut = $dataUpdated["bobot_atribut"];
                    $checkRowsinRows = true;

                    $idTableTraining = $rows["Id_training"];

                    $checkModalTrain[$key]["Id_atribut"] = $value["Id_atribut"];
                    $checkModalTrain[$key]["atribut"] = sanitalisation($value["atribut"]);
                    $checkModalTrain[$key]["status"] = $value["status"];
                    $checkModalTrain[$key]["keterangan"] = sanitalisation($value["keterangan"]);
                    $checkModalTrain[$key]["Id_atribut_value"] = $id;
                    $checkModalTrain[$key]["nama_value"] = sanitalisation($nama_value);
                    $checkModalTrain[$key]["type_atribut"] = $type_atribut;
                    $checkModalTrain[$key]["bobot_atribut"] = (int)$bobot_atribut;
                }
            }
        }

        if ($order == '4meinKosu') {
            if ($rows["Id_target"] == $id && $rows["type_target"] == 'Target') {
                $nama_value = $dataUpdated["nama_value"];
                $type_atribut = $dataUpdated["type_atribut"];

                $idTableTraining = $rows["Id_training"];
                $Id_target = $id;
                $type_target = $type_atribut;
                $penyakit = $nama_value;

                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     Id_target = $Id_target,
                     type_target = '$type_target',
                     penyakit = '$penyakit'
                     WHERE $tableId = $idTableTraining"
                );
            }
        }


        if ($checkRowsinRows) {
            if ($order == '1meinKosu') {
                $checkModalTrain1 = json_encode($checkModalTrain);
                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     modal_training = '$checkModalTrain1' 
                     WHERE $tableId = $idTableTraining"
                );
            } else if ($order == '4meinKosu') {
                $checkModalTrain1 = json_encode($checkModalTrain);
                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     modal_training = '$checkModalTrain1' 
                     WHERE $tableId = $idTableTraining"
                );
            }
        }
    }
}


function deleteConcerned($conn, $id, $decisiveData)
{
    $table = $decisiveData["tb_destination"];
    $tableId = $decisiveData["id_tb_destination"];
    $order = $decisiveData["tb_owner"];


    if ($order == '4meinKosu') {
        $checkRows = false;
    }
    $checkRowsinRows = false;

    $checkData = mysqli_query(
        $conn,
        "SELECT * FROM $table"
    );

    while ($rows = mysqli_fetch_assoc($checkData)) {
        $checkModalTrain = json_decode($rows["modal_training"], true);

        if ($order == '4meinKosu') {
            if ($rows["Id_target"] == $id && $rows["type_target"] == 'Target') {
                $idTableTraining = $rows["Id_training"];
                $checkRows = true;
                $Id_target = 0;
                $type_target = 'Deleted';
                $penyakit = $rows["penyakit"] . '(telah dihapus)';
            }
        }

        foreach ($checkModalTrain as $key => $value) {
            if ($order == '4meinKosu') {
                if ($value["Id_atribut_value"] == $id && $value["type_atribut"] == 'Data') {
                    $checkRowsinRows = true;
                    $idTableTraining = $rows["Id_training"];
                    $checkModalTrain[$key]["Id_atribut_value"] = 0;
                    $checkModalTrain[$key]["nama_value"] = $value["nama_value"] . '(telah dihapus)';
                    $checkModalTrain[$key]["type_atribut"] = 'Deleted';
                }
            } elseif ($order == '1meinKosu') {
                if ($value["Id_atribut"] == $id && $value["status"] == 'Data') {
                    $checkRowsinRows = true;
                    $idTableTraining = $rows["Id_training"];
                    mysqli_query(
                        $conn,
                        "DELETE FROM $table
                         WHERE $tableId = $idTableTraining"
                    );

                    // $checkModalTrain[$key]["Id_atribut"] = 0;
                    // $checkModalTrain[$key]["atribut"] = $value["atribut"] . '(telah dihapus)';
                    // $checkModalTrain[$key]["status"] = 'Deleted';
                    // $checkModalTrain[$key]["keterangan"] = 'Deleted';
                }
            }
        }


        if ($checkRows) {
            if ($order == '4meinKosu') {
                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     Id_target = $Id_target,
                     type_target = '$type_target',
                     penyakit = '$penyakit'
                     WHERE $tableId = $idTableTraining"
                );
            }
        }

        if ($checkRowsinRows) {
            if ($order == '4meinKosu') {
                $checkModalTrain1 = json_encode($checkModalTrain);
                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     modal_training = '$checkModalTrain1' 
                     WHERE $tableId = $idTableTraining"
                );
            } else if ($order == '1meinKosu') {
                mysqli_query(
                    $conn,
                    "DELETE FROM $table
                     WHERE $tableId = $idTableTraining"
                );
            }
        }
    }
}


function updateConcerned1($conn, $id, $decisiveData, $dataUpdated)
{
    $table = $decisiveData["tb_destination"];
    $tableId = $decisiveData["id_tb_destination"];
    $order = $decisiveData["tb_owner"];

    $checkRowsinRows = false;

    $checkData = mysqli_query(
        $conn,
        "SELECT * FROM $table"
    );

    while ($rows = mysqli_fetch_assoc($checkData)) {

        $checkModalTrain = json_decode($rows["modal_train"], true);

        foreach ($checkModalTrain as $key => $value) {
            if ($order == '9meinKosu') {
                if ($value["Id_penyakit"] == $id) {
                    // Update Modal Train
                    $namaPenyakit = $dataUpdated["nama_penyakit"];
                    $kodePenyakit = $dataUpdated["kode_penyakit"];

                    $checkRowsinRows = true;
                    $idTableTraining = $rows["Id_training"];

                    $checkModalTrain[$key]["Id_gejala"] = (int)$value["Id_gejala"];
                    $checkModalTrain[$key]["Id_penyakit"] = (int)$id;
                    $checkModalTrain[$key]["kode_gejala"] = sanitalisation($value["kode_gejala"]);
                    $checkModalTrain[$key]["bobot"] = $value["bobot"];
                    $checkModalTrain[$key]["gejala"] = sanitalisation($value["gejala"]);
                    $checkModalTrain[$key]["answer"] = $value["answer"];
                    $checkModalTrain[$key]["number"] = $value["number"];
                }
            } elseif ($order == '10meinKosu') {
                if ($value["Id_gejala"] == $id) {
                    $idPenyakit = $dataUpdated["Id_penyakit"];
                    $kodeGejala = $dataUpdated["kode_gejala"];
                    $gejala = $dataUpdated["gejala"];
                    $bobotGejala = $dataUpdated["bobot"];

                    $checkRowsinRows = true;
                    $idTableTraining = $rows["Id_training"];

                    $checkModalTrain[$key]["Id_gejala"] = (int)$id;
                    $checkModalTrain[$key]["Id_penyakit"] = (int)$idPenyakit;
                    $checkModalTrain[$key]["kode_gejala"] = sanitalisation($kodeGejala);
                    $checkModalTrain[$key]["bobot"] = $bobotGejala;
                    $checkModalTrain[$key]["gejala"] = sanitalisation($gejala);
                    $checkModalTrain[$key]["answer"] = $value["answer"];
                    $checkModalTrain[$key]["number"] = $value["number"];
                }
            }
        }

        if ($order == '9meinKosu') {
            if ($rows["Id_penyakit"] == $id) {
                $namaPenyakit = $dataUpdated["nama_penyakit"];
                $kodePenyakit = $dataUpdated["kode_penyakit"];

                $idTableTraining = $rows["Id_training"];

                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     Id_penyakit = $id,
                     kode_penyakit = '$kodePenyakit',
                     penyakit = '$namaPenyakit'
                     WHERE $tableId = $idTableTraining"
                );
            }
        }


        if ($checkRowsinRows) {
            if ($order == '9meinKosu') {
                $checkModalTrain1 = json_encode($checkModalTrain);
                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     modal_train = '$checkModalTrain1' 
                     WHERE $tableId = $idTableTraining"
                );
            } else if ($order == '10meinKosu') {
                $checkModalTrain1 = json_encode($checkModalTrain);
                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     modal_train = '$checkModalTrain1' 
                     WHERE $tableId = $idTableTraining"
                );
            }
        }
    }
}


function deleteConcerned1($conn, $id, $decisiveData)
{
    $table = $decisiveData["tb_destination"];
    $tableId = $decisiveData["id_tb_destination"];
    $order = $decisiveData["tb_owner"];

    $checkRowsinRows = false;

    $checkData = mysqli_query(
        $conn,
        "SELECT * FROM $table"
    );

    while ($rows = mysqli_fetch_assoc($checkData)) {

        if ($order == '9meinKosu') {
            if ($rows["Id_penyakit"] == $id) {
                $idTableTraining = $rows["Id_training"];
                $Id_penyakit = 0;
                $Kodepenyakit = $rows["kode_penyakit"] . ' (telah dihapus)';
                $penyakit = $rows["penyakit"] . ' (telah dihapus)';

                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     Id_penyakit = $Id_penyakit,
                     kode_penyakit = '$Kodepenyakit',
                     penyakit = '$penyakit'
                     WHERE $tableId = $idTableTraining"
                );
            }
        }


        $checkModalTrain = json_decode($rows["modal_train"], true);
        foreach ($checkModalTrain as $key => $value) {
            if ($order == '9meinKosu') {
                if ($value["Id_penyakit"] == $id) {
                    $checkRowsinRows = true;
                    $idTableTraining = $rows["Id_training"];
                    $checkModalTrain[$key]["Id_penyakit"] = 0;
                }
            } elseif ($order == '10meinKosu') {
                if ($value["Id_gejala"] == $id) {
                    $idTableTraining = $rows["Id_training"];
                    mysqli_query(
                        $conn,
                        "DELETE FROM $table
                         WHERE $tableId = $idTableTraining"
                    );
                }
            }
        }

        if ($checkRowsinRows) {
            if ($order == '9meinKosu') {
                $checkModalTrain1 = json_encode($checkModalTrain);
                mysqli_query(
                    $conn,
                    "UPDATE $table SET
                     modal_train = '$checkModalTrain1' 
                     WHERE $tableId = $idTableTraining"
                );
            }
        }
    }

    if ($order == '9meinKosu') {
        // untuk tb_gejala
        mysqli_query(
            $conn,
            "UPDATE tb_gejala SET
             Id_penyakit = 0
             WHERE Id_penyakit = $id"
        );


        // untuk tb_solusi
        mysqli_query(
            $conn,
            "UPDATE tb_solusi SET
             Id_penyakit = 0
             WHERE Id_penyakit = $id"
        );
    }
}










function phoneNumber($str)
{
    $welcome = str_replace('0', '', $str);
    $welcome = str_replace('62', '', $welcome);
    $welcome = str_replace('+', '', $welcome);

    return $welcome = substr_replace($welcome, '+62', 0, 0);
}

function sanitalisation($string)
{
    $result = trim(preg_replace('/\s+/', ' ', $string));
    return $result;
}

function privateHashing($password)
{
    // $password = 'http://localhost/TAcoba/greedy-han/';
    return 'taihcurccurna920025' . md5(sha1($password . 'bukankaleng2'));
}

function uniqEmail($email)
{
    $query = query("SELECT email FROM tb_member WHERE email = '$email'")[0];
    return ($query["email"] == '' || $query["email"] == null ? true : false);
}


// function exportPDF($conn, $Id_member)
// {

//     require_once __DIR__ . '/vendor/autoload.php';

//     $mpdf = new \Mpdf\Mpdf(['format' => 'Legal']);

//     $mpdf->WriteHTML('Section 1');
//     $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => [416, 636]]);
//     $mpdf = new \Mpdf\Mpdf(['orientation' => 'L']);
//     $mpdf->WriteHTML(renderDom($conn, $Id_member));
//     $mpdf->Output('Daftar Diagnosa Penyakit Jagung.pdf', 'I');
// }

function exportPDF($conn, $dataParamas)
{
    require_once __DIR__ . '/vendor/autoload.php';

    $mpdf = new \Mpdf\Mpdf(['format' => 'Legal']);

    $mpdf->WriteHTML('Section 1');
    $mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => [916, 636]]);
    $mpdf = new \Mpdf\Mpdf(['orientation' => 'P']);
    $mpdf->WriteHTML(renderDom($conn, $dataParamas));
    $mpdf->Output('JADWAL PRAKTIKUM.pdf', 'I');
}

function renderDom($conn, $dataParamas)
{
    $data = gettingDataToExport($conn, $dataParamas);

    $result = '';
    $nomor = 0;

    foreach ($data["TBody"] as $key => $value) {
        $nomor++;

        $rowInrows = '';
        if (count($value["isTime"]) > 2) {
            foreach ($value["isTime"] as $key1 => $value1) {
                $rowInrows .= '<td>' . ($value1['Id_praktikum'] != 0 ?
                    '<table>
                        <tbody>
                            <tr>
                                <td>' . $value1['nama_praktikum'] . '</td>
                            </tr>
                            <tr>
                                <td>' . $value1['nama_dosen'] . '</td>
                            </tr>
                        </tbody>
                     </table>' :
                    'Tidak Ada Sesi') . '
                               </td>';
            }
        } else {
            foreach ($value["isTime"] as $key1 => $value1) {
                $rowInrows .= '<td>' . ($value1['Id_praktikum'] != 0 ?
                    '<table>
                        <tbody>
                            <tr>
                                <td>' . $value1['nama_praktikum'] . '</td>
                            </tr>
                            <tr>
                                <td>' . $value1['nama_dosen'] . '</td>
                            </tr>
                        </tbody>
                    </table>' :
                    'Tidak Ada Sesi') . '
                           </td>';
            }
            $rowInrows .= '<td>Tidak Ada Sesi</td>';
        }

        $result .= '<tr>
                        <td>' . ($nomor) . '</td>
                        <td>' . $value['tanggal_i'] . '</td>
                        ' . $rowInrows . '
                    </tr>';
    }

    $resultDom = '<div class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <h2 class="mb-0">Jadwal Praktikum ' . $data["title"]["titleFile"] . ' Semester ' . $data["title"]["semester"] . ' ' . $data["title"]["monthFile"] . ' ' . $data["title"]["yearFile"] . '</h2>
                        </div>
                        <hr>
                        <div class="table-responsive Tbunset">
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr style="text-align:center; color: black; text-transform: uppercase; font-weight:bold;">
                                        <th>Nomor</th>
                                        <th>HARI / TANGGAL</th>
                                        <th>PAGI</th>
                                        <th>SIANG</th>
                                        <th>SORE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ' . $result . '
                                </tbody>
                            </table>
                        </div>
                    </div>
                 </div>';



    $html = '<!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Schecom Lab</title>
                    <link rel="preconnect" href="https://fonts.gstatic.com">
                    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="./assets/css/bootstrap.css">
                    <link rel="stylesheet" href="./assets/vendors/iconly/bold.css">
                    <link rel="stylesheet" href="./assets/vendors/perfect-scrollbar/perfect-scrollbar.css">
                    <link rel="stylesheet" href="./assets/vendors/bootstrap-icons/bootstrap-icons.css">
                    <link rel="stylesheet" href="./assets/vendors/fontawesome/all.min.css">
                    <link rel="stylesheet" href="./assets/vendors/toastify/toastify.css">
                    <link rel="stylesheet" href="./assets/css/app.css">
                    <link rel="stylesheet" href="./assets/css/anruc.css">   
                </head>

                <body>

                    ' . $resultDom . '


                    <script src="./assets/vendors/jquery/jquery.min.js"></script>
                    <script src="./assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js"></script>
                    <script src="./assets/js/bootstrap.bundle.min.js"></script>
                    <script src="./assets/vendors/apexcharts/apexcharts.js"></script>
                    <script src="./assets/vendors/toastify/toastify.js"></script>
                    <script src="./assets/js/pages/dashboard.js"></script>
                    <script src="./assets/vendors/fontawesome/all.min.js"></script>
                    <script src="./assets/js/mazer.js"></script>
                    <script src="./assets/js/serve/custom.js"></script>
                    <script src="./assets/js/serve/navigation.js"></script>
                    <script src="./assets/js/serve/hitsuyoniojite.js"></script>
                    <script src="./assets/js/serve/dataProcessing.js"></script>
                    <script src="./assets/js/serve/algorithm.js"></script>
                    <script src="./assets/js/serve/newAlgorithm.js"></script>
                    <script src="./assets/js/serve/render.js"></script>
                    <script src="./assets/js/serve/renderForm.js"></script>
                    <script src="./assets/js/serve/setupTablePagination.js"></script>
                </body>

                </html>';


    return $html;
}

function gettingDataToExport($conn, $dataParamas)
{

    $yearFile = '';
    $monthFile = '';
    $titleFile = '';
    $titleSemester = '';
    $nomor = 0;
    $query = mysqli_query(
        $conn,
        "SELECT 
         MONTHNAME(tanggal) as 'Month', 
         YEAR(tanggal) as 'Year',
         t1.Id_schedul, t1.Id_room, t1.Id_dosen, t1.Id_praktikum,
         t1.shift, t1.hari, t1.tanggal, t1.tanggal_i,
         t2.nidn, t2.nama_dosen, t2.jenis_kelamin,
         t3.nama_room,
         t4.kode_praktikum, t4.nama_praktikum, t4.jumlah_sks, t4.semester
         FROM tb_schedul t1
         LEFT JOIN tb_dosen t2
         ON t1.Id_dosen = t2.Id_dosen
         INNER JOIN tb_room t3
         ON t1.Id_room = t3.Id_room
         LEFT JOIN tb_praktikum t4
         ON t1.Id_praktikum = t4.Id_praktikum
         WHERE 
         YEAR(tanggal) = '$dataParamas[year]'
         AND MONTHNAME(tanggal) = '$dataParamas[month]'
         AND t1.Id_room = $dataParamas[Id_room]
         AND t1.semester = $dataParamas[semester]"
    );

    $newFormat = [];

    while ($rows = mysqli_fetch_assoc($query)) {
        $nomor++;
        if ($rows["Id_praktikum"] != 0) {
            $yearFile = $rows["Year"];
            $monthFile = $rows["Month"];
            $titleFile = $rows["nama_room"];
            $titleSemester = $rows["semester"];
        }

        $findValue = in_array($rows['tanggal'], array_column($newFormat, 'tanggal'));
        $index = array_search($rows['tanggal'], array_column($newFormat, 'tanggal'));

        if ($findValue) {
            array_push($newFormat[$index]["isTime"], [
                "shift" => $rows["shift"],
                "Id_praktikum" => $rows["Id_praktikum"],
                "kode_praktikum" => $rows["kode_praktikum"],
                "nama_praktikum" => $rows["nama_praktikum"],
                "Id_dosen" => $rows["Id_dosen"],
                "nama_dosen" => $rows["nama_dosen"],
            ]);
        } else {
            array_push($newFormat, [
                "tanggal" => $rows["tanggal"],
                "tanggal_i" => $rows["tanggal_i"],
                "isTime" => [
                    [
                        "shift" => $rows["shift"],
                        "Id_praktikum" => $rows["Id_praktikum"],
                        "kode_praktikum" => $rows["kode_praktikum"],
                        "nama_praktikum" => $rows["nama_praktikum"],
                        "Id_dosen" => $rows["Id_dosen"],
                        "nama_dosen" => $rows["nama_dosen"],
                    ]
                ],
            ]);
        }
    }


    $titleFor = [
        "yearFile" => $yearFile,
        "monthFile" => $monthFile,
        "titleFile" => $titleFile,
        "semester" => $titleSemester,
    ];

    $result = [
        "title" => $titleFor,
        "TBody" => $newFormat,
    ];

    return $result;
}

function serveFirst($arrdosen, $date, $Id_room, $semester)
{

    // $areDates = date("Y-m-d", strtotime($arrDates[1])); bisa, tapi format tanggal jadi minimal 2 digit, cth 2022-01-01
    $arrDates = explode(' ', str_replace(',', '', $date));
    $days = $arrDates[0];

    $christmas = $arrDates[1];
    $parts = explode('/', $christmas);
    $yyyy_mm_dd = $parts[2] . '-' . $parts[1] . '-' . $parts[0];

    foreach ($arrdosen as $key => $value) {
        if (count($arrdosen) > 2) {
            if ($key == 0) {
                $shift = 'P';
            } else if ($key == 1) {
                $shift = 'S';
            } else if ($key == 2) {
                $shift = 'SS';
            }
        } else {
            if ($key == 0) {
                $shift = 'P';
            } else if ($key == 1) {
                $shift = 'S';
            }
        }

        $Id_praktikum = ($value == 'x' ? 0 : ((int)explode('.', $value)[0]));
        $Id_dosen = ($value == 'x' ? 0 : ((int)explode('.', $value)[1]));

        $query = "INSERT 
                  INTO tb_schedul
                  SET
                  Id_room = $Id_room,
                  Id_dosen = $Id_dosen,
                  Id_praktikum = $Id_praktikum,
                  semester = $semester,
                  shift = '$shift',
                  hari = '$days',
                  tanggal = '$yyyy_mm_dd',
                  tanggal_i = '$date'";

        dataProses($query);
    }
}
