<?php
header('Access-Control-Allow-Origin: http://localhost/ajockey/dev/greedy-han/');
error_reporting(0);
session_start();
require 'conn.php';
require 'function.php';
$order = anti_Injection($_REQUEST['order']);

$Id_appbender  = $_SESSION['Id_appcontroller'];
$nama = $_SESSION['nama'];
$email  = $_SESSION['email'];
$token  = $_SESSION['token'];
$bg_ = $_SESSION['bg_'];

if ($token === privateHashing(gettodayShort())) {
    switch ($order) {
        case 'ceklogin':
            echo 1;
            break;

        case 'cekHakaccess':
            echo json_encode(convertToMenu($hakaccess));
            break;

        case 'tbRoomNDosen':
            $query1 = query("SELECT * FROM tb_room");

            $query2 = query("SELECT * FROM tb_dosen");

            echo json_encode([
                'tb_room' => $query1,
                'tb_dosen' => $query2,
            ]);
            break;

        case 'tbDosenNShift':
            $query1 = query("SELECT * FROM tb_dosen");
            $query2 = query("SELECT * FROM tb_shift");

            echo json_encode([
                'tb_dosen' => $query1,
                'tb_shift' => $query2,
            ]);
            break;

        case 'tbDosen':
            $query = query("SELECT * FROM tb_dosen");

            echo json_encode([
                'tb_dosen' => $query,
            ]);
            break;

        case 'tbDosenDOffRoomSesiReq':
            $query1 = query("SELECT 
                         t1.Id_day_off, t1.Id_dosen, t1.start_date, t1.end_date,
                         t2.nidn, t2.nama_dosen, t2.jenis_kelamin
                         FROM tb_day_off t1
                         INNER JOIN tb_dosen t2
                         ON t1.Id_dosen = t2.Id_dosen");

            $query2 = query("SELECT
                         t1.Id_shift_request, t1.Id_shift, t1.Id_dosen, t1.tanggal,
                         t2.nidn, t2.nama_dosen, t2.jenis_kelamin, 
                         t3.kode_shift, t3.shift, t3.jam_mulai, t3.jam_selesai
                         FROM tb_shift_request t1
                         INNER JOIN tb_dosen t2
                         ON t1.Id_dosen = t2.Id_dosen
                         INNER JOIN tb_shift t3
                         ON t1.Id_shift = t3.Id_shift");

            $query3 = query("SELECT 
                         t1.Id_praktikum, t1.Id_dosen, t1.Id_room, 
                         t1.kode_praktikum, t1.nama_praktikum, t1.jumlah_sks, t1.semester, 
                         t2.nidn, t2.nama_dosen, t2.jenis_kelamin, 
                         t3.nama_room
                         FROM tb_praktikum t1
                         INNER JOIN tb_dosen t2
                         ON t1.Id_dosen = t2.Id_dosen
                         INNER JOIN tb_room t3
                         ON t1.Id_room = t3.Id_room");

            $query4 = query("SELECT * FROM tb_dosen");

            $query5 = query("SELECT * FROM tb_room");

            $query6 = query("SELECT 
                         MONTHNAME(tanggal)
                         FROM tb_schedul
                         GROUP BY 
                         MONTH(tanggal)");


            echo json_encode([
                'tb_day_off' => $query1,
                'tb_shift_request' => $query2,
                'tb_praktikum' => $query3,
                'tb_dosen' => $query4,
                'tb_room' => $query5,
                'tb_schedul' => $query6,
            ]);

            break;

        case 'dataSchedule':
            $data = json_decode($_POST["dataObjek"], true);
            $year = $data["tahun"];
            $month = $data["bulan"];
            $Id_room = (int)$data["Id_room"];
            $semester = (int)$data["semester"];

            $query = query("SELECT 
                        YEAR(tanggal) as 'Year',
                        MONTHNAME(tanggal) as 'Month',
                        t1.Id_room, t1.Id_dosen, t1.Id_praktikum, t1.semester,
                        t1.shift, t1.hari, t1.tanggal, t1.tanggal_i,
                        t2.nama_room
                        FROM tb_schedul t1
                        INNER JOIN tb_room t2
                        ON t1.Id_room = t2.Id_room
                        WHERE 
                        YEAR(tanggal) = '$year'
                        AND MONTHNAME(tanggal) = '$month'
                        AND t1.Id_room != $Id_room OR t1.semester != $semester");

            echo json_encode($query);

            break;

        case 'checkdataSchedule':
            $data = json_decode($_POST["dataObjek"], true);
            $year = $data["tahun"];
            $month = $data["bulan"];
            $Id_room = (int)$data["Id_room"];
            $semester = (int)$data["semester"];

            $query = query("SELECT 
                            YEAR(tanggal) as 'Year',
                            MONTHNAME(tanggal) as 'Month',
                            t1.Id_room, t1.Id_dosen, t1.Id_praktikum, t1.semester,
                            t1.shift, t1.hari, t1.tanggal, t1.tanggal_i,
                            t2.nama_room
                            FROM tb_schedul t1
                            INNER JOIN tb_room t2
                            ON t1.Id_room = t2.Id_room
                            WHERE 
                            YEAR(tanggal) = '$year'
                            AND MONTHNAME(tanggal) = '$month'
                            AND t1.Id_room = $Id_room 
                            AND t1.semester = $semester");

            echo json_encode($query);

            break;

        case 'meinKosu1':
            $query = query("SELECT * FROM tb_room");

            echo json_encode($query);
            break;

        case 'modifiedRoom':
            $status = $_POST["status"];
            $id = $_POST["id"];

            $roomName = $_POST["roomName"];

            if ($status == 'new') {
                $query = "INSERT 
                      INTO tb_room
                      SET
                      nama_room = '$roomName'";
                $message = 'Data Berhasil Di Tambah';
            } else if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_room
                      SET
                      nama_room = '$roomName'
                      WHERE Id_room = $id";
                $message = 'Data Berhasil Di Update';
            } else if ($status == 'delete' && isset($id)) {
                $query = "DELETE FROM tb_room
                      WHERE Id_room = $id";
                $message = 'Data Berhasil Di Hapus';
            }

            $statusMessage = dataProses($query);

            echo json_encode([
                "title" => $statusMessage,
                "message" => $message,
            ]);
            break;

        case 'meinKosu2':
            $query = query("SELECT * FROM tb_dosen");

            echo json_encode($query);
            break;

        case 'modifiedDosen':
            $status = $_POST["status"];
            $id = (int)$_POST["id"];

            $nidn = strtoupper($_POST["dosenNIDN"]);
            $nama_dosen = strtoupper($_POST["dosenName"]);
            $jenis_kelamin = strtoupper($_POST["dosenGender"]);


            if ($status == 'new') {
                $query = "INSERT 
                      INTO tb_dosen
                      SET
                      nidn = '$nidn',
                      nama_dosen = '$nama_dosen',
                      jenis_kelamin = '$jenis_kelamin'";

                $message = 'Data Berhasil Di Tambah';
            } else if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_dosen
                      SET
                      nidn = '$nidn',
                      nama_dosen = '$nama_dosen',
                      jenis_kelamin = '$jenis_kelamin'
                      WHERE Id_dosen = $id";

                $message = 'Data Berhasil Di Update';
            } else if ($status == 'delete' && isset($id)) {
                $query = "DELETE FROM tb_dosen
                      WHERE Id_dosen = $id";

                $message = 'Data Berhasil Di Hapus';
            }

            $status = dataProses($query);

            echo json_encode([
                "title" => $status,
                "message" => $message,
            ]);

            break;

        case 'meinKosu3':
            $query = query("SELECT
                        t1.Id_praktikum, t1.Id_dosen, t1.Id_room, t1.kode_praktikum,
                        t1.nama_praktikum, t1.jumlah_sks, t1.semester,
                        t2.nidn, t2.nama_dosen, t2.jenis_kelamin,
                        t3.nama_room
                        FROM tb_praktikum t1
                        INNER JOIN tb_dosen t2
                        ON t1.Id_dosen = t2.Id_dosen
                        INNER JOIN tb_room t3
                        ON t1.Id_room = t3.Id_room");

            echo json_encode($query);
            break;

        case 'modifiedPraktikum':
            $status = $_POST["status"];
            $id = (int)$_POST["id"];

            $Id_dosen = (int)$_POST["dosenSelectOpsID"];
            $Id_room = (int)$_POST["roomSelectOpsID"];
            $kode_praktikum = strtoupper($_POST["praktikumKode"]);
            $nama_praktikum = strtoupper($_POST["praktikumName"]);
            $jumlah_sks = (int)$_POST["jumlahPraktikum"];
            $semester = (int)$_POST["semesterNumber"];

            if ($status == 'new') {
                $query = "INSERT 
                      INTO tb_praktikum
                      SET
                      Id_dosen = $Id_dosen,
                      Id_room = $Id_room,
                      kode_praktikum = '$kode_praktikum',
                      nama_praktikum = '$nama_praktikum',
                      jumlah_sks = $jumlah_sks,
                      semester = $semester";

                $message = 'Data Berhasil Di Tambah';
            } else if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_praktikum
                      SET
                      Id_dosen = $Id_dosen,
                      Id_room = $Id_room,
                      kode_praktikum = '$kode_praktikum',
                      nama_praktikum = '$nama_praktikum',
                      jumlah_sks = $jumlah_sks,
                      semester = $semester
                      WHERE Id_praktikum = $id";

                $message = 'Data Berhasil Di Update';
            } elseif ($status == 'delete' && isset($id)) {
                $query = "DELETE FROM tb_praktikum
                      WHERE Id_praktikum = $id";

                $message = 'Data Berhasil Di Hapus';
            }

            $status = dataProses($query);

            echo json_encode([
                "title" => $status,
                "message" => $message,
            ]);

            break;

        case 'meinKosu4':
            $query = query("SELECT * FROM tb_shift");

            echo json_encode($query);
            break;

        case 'modifiedSesi':
            $status = $_POST["status"];
            $id = $_POST["id"];

            $kode_shift = $_POST["kodeSesi"];
            $shift = $_POST["namaSesi"];
            $jam_mulai = $_POST["waktuMulai"];
            $jam_selesai = $_POST["waktuAkhir"];


            if ($status == 'new') {
                $query = "INSERT 
                      INTO tb_shift
                      SET
                      kode_shift = '$kode_shift',
                      shift = '$shift',
                      jam_mulai = '$jam_mulai',
                      jam_selesai = '$jam_selesai'";
                $message = 'Data Berhasil Di Tambah';
            } else if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_shift
                      SET
                      kode_shift = '$kode_shift',
                      shift = '$shift',
                      jam_mulai = '$jam_mulai',
                      jam_selesai = '$jam_selesai'
                      WHERE Id_shift = $id";
                $message = 'Data Berhasil Di Update';
            } else if ($status == 'delete' && isset($id)) {
                $query = "DELETE FROM tb_shift
                      WHERE Id_shift = $id";
                $message = 'Data Berhasil Di Hapus';
            }

            $statusMessage = dataProses($query);

            echo json_encode([
                "title" => $statusMessage,
                "message" => $message,
            ]);
            break;

        case 'meinKosu5':
            $query = query("SELECT
                        t1.Id_shift_request, t1.Id_shift, t1.Id_dosen, t1.tanggal,
                        t2.nidn, t2.nama_dosen, t2.jenis_kelamin,
                        t3.kode_shift, t3.shift, t3.jam_mulai, t3.jam_selesai
                        FROM tb_shift_request t1
                        INNER JOIN tb_dosen t2
                        ON t1.Id_dosen = t2.Id_dosen
                        INNER JOIN tb_shift t3
                        ON t1.Id_shift = t3.Id_shift");

            echo json_encode($query);
            break;

        case 'modifiedSesiRequest':
            $status = $_POST["status"];
            $id = (int)$_POST["id"];

            $Id_shift = (int)$_POST["jadwalSesiSelectOpsID"];
            $Id_dosen = (int)$_POST["dosenSelectOps1ID"];
            $tanggal = strtoupper($_POST["tanggalRequest"]);

            if ($status == 'new') {
                $query = "INSERT 
                      INTO tb_shift_request
                      SET
                      Id_shift = $Id_shift,
                      Id_dosen = $Id_dosen,
                      tanggal = '$tanggal'";

                $message = 'Data Berhasil Di Tambah';
            } else if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_shift_request
                      SET
                      Id_shift = $Id_shift,
                      Id_dosen = $Id_dosen,
                      tanggal = '$tanggal'
                      WHERE Id_shift_request = $id";

                $message = 'Data Berhasil Di Update';
            } elseif ($status == 'delete' && isset($id)) {
                $query = "DELETE FROM tb_shift_request
                      WHERE Id_shift_request = $id";

                $message = 'Data Berhasil Di Hapus';
            }

            $status = dataProses($query);

            echo json_encode([
                "title" => $status,
                "message" => $message,
            ]);
            break;

        case 'meinKosu6':
            $query = query("SELECT 
                        t1.Id_day_off, t1.Id_dosen, t1.start_date, t1.end_date,
                        t2.nidn, t2.nama_dosen, t2.jenis_kelamin
                        FROM tb_day_off t1
                        INNER JOIN tb_dosen t2
                        ON t1.Id_dosen = t2.Id_dosen");

            echo json_encode($query);
            break;

        case 'modifiedDayOff':
            $status = $_POST["status"];
            $id = (int)$_POST["id"];

            $Id_dosen = (int)$_POST["dosenSelectOps2ID"];
            $start_date = $_POST["startDate"];
            $end_date = $_POST["endDate"];

            if ($status == 'new') {
                $query = "INSERT 
                      INTO tb_day_off
                      SET
                      Id_dosen = $Id_dosen,
                      `start_date` = '$start_date',
                      `end_date` = '$end_date'";

                $message = 'Data Berhasil Di Tambah';
            } else if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_day_off
                      SET
                      Id_dosen = $Id_dosen,
                      `start_date` = '$start_date',
                      `end_date` = '$end_date'
                      WHERE Id_day_off = $id";

                $message = 'Data Berhasil Di Update';
            } elseif ($status == 'delete' && isset($id)) {
                $query = "DELETE FROM tb_day_off
                      WHERE Id_day_off = $id";

                $message = 'Data Berhasil Di Hapus';
            }

            $status = dataProses($query);

            echo json_encode([
                "title" => $status,
                "message" => $message,
            ]);

            break;

        case 'meinKosu7':
            $query1 = query("SELECT 
                         t1.Id_day_off, t1.Id_dosen, t1.start_date, t1.end_date,
                         t2.nidn, t2.nama_dosen, t2.jenis_kelamin
                         FROM tb_day_off t1
                         INNER JOIN tb_dosen t2
                         ON t1.Id_dosen = t2.Id_dosen");

            $query2 = query("SELECT
                         t1.Id_shift_request, t1.Id_shift, t1.Id_dosen, t1.tanggal,
                         t2.nidn, t2.nama_dosen, t2.jenis_kelamin, 
                         t3.kode_shift, t3.shift, t3.jam_mulai, t3.jam_selesai
                         FROM tb_shift_request t1
                         INNER JOIN tb_dosen t2
                         ON t1.Id_dosen = t2.Id_dosen
                         INNER JOIN tb_shift t3
                         ON t1.Id_shift = t3.Id_shift");

            $query3 = query("SELECT 
                         t1.Id_praktikum, t1.Id_dosen, t1.Id_room, 
                         t1.kode_praktikum, t1.nama_praktikum, t1.jumlah_sks, t1.semester, 
                         t2.nidn, t2.nama_dosen, t2.jenis_kelamin, 
                         t3.nama_room
                         FROM tb_praktikum t1
                         INNER JOIN tb_dosen t2
                         ON t1.Id_dosen = t2.Id_dosen
                         INNER JOIN tb_room t3
                         ON t1.Id_room = t3.Id_room");

            $query4 = query("SELECT * FROM tb_room");

            $query5 = query("SELECT 
                         MONTHNAME(tanggal)
                         FROM tb_schedul
                         GROUP BY 
                         MONTH(tanggal)");

            echo json_encode([
                'tb_day_off' => $query1,
                'tb_shift_request' => $query2,
                'tb_dosen' => $query3,
                'tb_room' => $query4,
                'tb_schedul' => $query5,
            ]);

            break;


        case 'getDataByID':
            $for = $_POST["forTable"];
            $Id_room = (int)$_POST["Id_room"];
            $semester = (int)$_POST["semester"];

            if ($for == 'getDoctorInRoom') {
                $query = query("SELECT
                            t1.Id_doctor, t1.Id_room, t1.nama_doctor, t1.jenis_kelamin
                            ,t2.Id_day_off, t2.Id_doctor as 'Id_doctor_dayoff', t2.start_date, t2.end_date
                            ,t3.Id_shift_request, t3.Id_doctor as 'Id_doctor_shiftRequest', t3.Id_shift, t3.tanggal
                            FROM tb_doctor t1
                            LEFT JOIN tb_day_off t2
                            ON t1.Id_doctor = t2.Id_doctor
                            LEFT JOIN tb_shift_request t3
                            ON t1.Id_doctor = t3.Id_doctor
                            WHERE Id_room = $id");
            } else if ($for == 'getPraktikumInRoom') {
                $query = query("SELECT
                                t1.Id_praktikum, t1.Id_dosen, t1.Id_room, t1.kode_praktikum,
                                t1.nama_praktikum, t1.jumlah_sks, t1.semester,
                                t2.nidn, t2.nama_dosen, t2.jenis_kelamin,
                                t3.tanggal, 
                                t3.Id_shift, 
                                (SELECT t5.kode_shift FROM tb_shift t5 WHERE t5.Id_shift = t3.Id_shift) as 'kode_shift',
                                t4.start_date, t4.end_date
                                FROM tb_praktikum t1
                                LEFT JOIN tb_dosen t2
                                ON t1.Id_dosen = t2.Id_dosen
                                LEFT JOIN tb_shift_request t3
                                ON t1.Id_dosen = t3.Id_dosen
                                LEFT JOIN tb_day_off t4
                                ON t1.Id_dosen = t4.Id_dosen
                                WHERE t1.Id_room = $Id_room
                                AND t1.semester = $semester");
            }

            echo json_encode($query);

            break;

        case 'createNewSchedule':
            $arrData = json_decode($_POST["dataResult"], true);
            $checkum = $_POST["checkSum"];
            $month = $_POST["bulan"];
            $year = $_POST["tahun"];
            $Id_room = (int)$_POST["Id_room"];
            $semester = (int)$_POST["semester"];

            foreach ($arrData as $key => $value) {
                $date = $value["date"];
                $dosen = $value["dosen"];
                serveFirst($dosen, $date, $Id_room, $semester);
            }

            echo json_encode([
                "title" => true,
                "message" => "Jadwal Berhasil Dibuat",
            ]);

            break;

        case 'meinKosu8':
            // $month = date("F", strtotime('m'));

            $query = query("SELECT 
                        MONTHNAME(tanggal) as 'Month', 
                        YEAR(tanggal) as 'Year',
                        t3.Id_room, t3.nama_room 
                        FROM tb_schedul t1
                        INNER JOIN tb_dosen t2
                        ON t1.Id_dosen = t2.Id_dosen
                        INNER JOIN tb_room t3
                        ON t1.Id_room = t3.Id_room
                        GROUP BY YEAR(tanggal)");


            echo json_encode($query);

            break;

        case 'byYear':
            $dataParam = json_decode($_POST["dataObjek"], true);
            $year = $dataParam["dataParam"];

            $query = query("SELECT 
                        MONTHNAME(tanggal) as 'Month', 
                        YEAR(tanggal) as 'Year'
                        FROM tb_schedul
                        WHERE 
                        YEAR(tanggal) = '$year'
                        GROUP BY MONTHNAME(tanggal)");


            echo json_encode($query);

            break;

        case 'byMonth':
            $dataParam = json_decode($_POST["dataObjek"], true);
            $month = $dataParam["dataParam"];

            $query = query("SELECT 
                        MONTHNAME(tanggal) as 'Month', 
                        YEAR(tanggal) as 'Year',
                        t1.Id_schedul, t1.Id_room, t1.Id_dosen, t1.Id_praktikum,
                        t1.shift, t1.hari, t1.tanggal, t1.tanggal_i,
                        t2.nama_room
                        FROM tb_schedul t1
                        INNER JOIN tb_room t2
                        ON t1.Id_room = t2.Id_room
                        WHERE 
                        MONTHNAME(tanggal) = '$month'
                        GROUP BY t1.Id_room");


            echo json_encode($query);

            break;

        case 'byRoom':
            $dataParam = json_decode($_POST["dataObjek"], true);
            $dataParam = $dataParam["dataParam"];
            $dataParam = explode('.', $dataParam);
            $year = $dataParam[0];
            $month = $dataParam[1];
            $Id_room = (int)$dataParam[2];

            $query = query("SELECT 
                        MONTHNAME(tanggal) as 'Month', 
                        YEAR(tanggal) as 'Year',
                        t1.Id_schedul, t1.Id_room, t1.Id_dosen, t1.Id_praktikum, 
                        t1.semester, t1.shift, t1.hari, t1.tanggal, t1.tanggal_i,
                        t2.nama_room
                        FROM tb_schedul t1
                        INNER JOIN tb_room t2
                        ON t1.Id_room = t2.Id_room
                        WHERE 
                        YEAR(tanggal) = '$year'
                        AND MONTHNAME(tanggal) = '$month'
                        AND t1.Id_room = $Id_room
                        GROUP BY t1.semester
                        ORDER BY t1.semester ASC");


            echo json_encode($query);

            break;

        case 'bySemester':
            $dataParam = json_decode($_POST["dataObjek"], true);
            $dataParam = $dataParam["dataParam"];
            $dataParam = explode('.', $dataParam);
            $year = $dataParam[0];
            $month = $dataParam[1];
            $Id_room = (int)$dataParam[2];
            $semester = (int)$dataParam[3];

            $query = query("SELECT 
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
                        YEAR(tanggal) = '$year'
                        AND MONTHNAME(tanggal) = '$month'
                        AND t1.Id_room = $Id_room
                        AND t1.semester = $semester");

            echo json_encode($query);

            break;

        case 'modifiedScheduleRoomSemester':
            $year = $_POST["tahun"];
            $month = $_POST["bulan"];
            $Id_room = (int)$_POST["Id_room"];
            $semester = (int)$_POST["semester"];
            $status = $_POST["status"];

            if ($status == 'delete' && isset($Id_room)) {
                $query = "DELETE FROM tb_schedul
                      WHERE 
                      YEAR(tanggal) = '$year'
                      AND MONTHNAME(tanggal) = '$month'
                      AND Id_room = $Id_room
                      AND semester = $semester";

                $message = 'Data Berhasil Di Hapus';
            }

            $status = dataProses($query);
            $status = ($status > 1 ? 1 : -1);

            echo json_encode([
                "title" => "$status",
                "message" => $message,
            ]);

            break;


        case 'scheduleInfo':

            $query = query("SELECT 
                        MONTHNAME(tanggal) as 'Month'
                        FROM tb_schedul
                        GROUP BY 
                        MONTH(tanggal)");


            echo json_encode($query);

            break;

        case 'schedulInfoByMonth':
            $month = $_POST["month"];

            $query = query("SELECT 
                        MONTHNAME(tanggal) as 'Month', t3.Id_room, t3.nama_room 
                        FROM tb_schedul t1
                        INNER JOIN tb_doctor t2
                        ON t1.Id_doctor = t2.Id_doctor
                        INNER JOIN tb_room t3
                        ON t2.Id_room = t3.Id_room
                        WHERE 
                        MONTHNAME(tanggal) = '$month'
                        GROUP BY t2.Id_room");


            echo json_encode($query);

            break;

        case 'shownSchedulingRoom':
            $Id_room = (int)$_POST["Id_room"];
            $month = $_POST["month"];

            $query = query("SELECT
                        t1.Id_schedul, t1.Id_doctor, t1.shift, t1.hari, t1.tanggal, t1.tanggal_i,
                        t2.Id_department, t2.Id_room, t2.nama_doctor, t2.jenis_kelamin,
                        MONTHNAME(tanggal) as 'Month',
                        t3.nama_room
                        FROM tb_schedul t1
                        INNER JOIN tb_doctor t2
                        ON t1.Id_doctor = t2.Id_doctor
                        INNER JOIN tb_room t3
                        ON t2.Id_room = t3.Id_room
                        WHERE 
                        MONTHNAME(tanggal) = '$month'
                        AND t2.Id_room = $Id_room");


            echo json_encode($query);

            break;



        case 'schedulInfoByMonth1':
            $month = $_POST["month"];

            $query = query("SELECT 
                        MONTHNAME(tanggal) as 'Month', t3.Id_room, t3.nama_room 
                        FROM tb_schedul t1
                        INNER JOIN tb_doctor t2
                        ON t1.Id_doctor = t2.Id_doctor
                        INNER JOIN tb_room t3
                        ON t2.Id_room = t3.Id_room
                        WHERE 
                        MONTHNAME(tanggal) = '$month'
                        GROUP BY t2.Id_room");

            echo json_encode($query);

            break;


        case 'schedul':
            $arrData = json_decode($_POST["arrData"], true);
            $checkum = $_POST["checkum"];
            $month = $_POST["month"];
            $year = $_POST["year"];

            foreach ($arrData as $key => $value) {
                $date = $value["date"];
                $doctor = $value["doctor"];
                // serveFirst($doctor, $date);
            }

            echo json_encode([
                "isStatus" => true,
                "data" => "sukses",
            ]);

            break;


            // coba pahamin ini kenapa gini
        case 'schedulmodified':
            $arrData = json_decode($_POST["arrData"], true);
            $checkum = $_POST["checkum"];
            $month = $_POST["month"];
            $year = $_POST["year"];

            foreach ($arrData as $key => $value) {
                $date = $value["date"];
                $doctor = $value["doctor"];
                // serveFirst($doctor, $date);
            }

            echo json_encode([
                "isStatus" => true,
                "data" => "sukses",
            ]);

            break;

        case 'modifiedSchedule':
            $month = $_POST["month"];
            $Id_room = (int)$_POST["Id_room"];
            $status = $_POST["status"];


            if ($status == 'delete' && isset($Id_room)) {
                $query = "DELETE t1 FROM  tb_schedul t1
                      INNER JOIN tb_doctor t2
                      ON t1.Id_doctor = t2.Id_doctor
                      INNER JOIN tb_room t3
                      ON t2.Id_room = t3.Id_room
                      WHERE 
                      MONTHNAME(tanggal) = '$month'
                      AND t2.Id_room = $Id_room";

                $message = 'Data Berhasil Di Hapus';
            }

            $status = dataProses($query);
            $status = ($status > 1 ? 1 : -1);

            echo json_encode([
                "title" => "$status",
                "message" => $message,
            ]);

            break;

        case 'dataExport':
            $year = $_REQUEST["itsYear"];
            $month = $_REQUEST["itsMonth"];
            $Id_room = (int)$_REQUEST["itsRoom"];
            $semester = (int)$_REQUEST["itsSemes"];
            $dataParamas = [
                "year" => $year,
                "month" => $month,
                "Id_room" => $Id_room,
                "semester" => $semester,
            ];
            echo exportPDF($conn, $dataParamas);
            break;

        case 'identity':
            $query = query("SELECT * FROM tb_appcontroller 
                            WHERE Id_appcontroller = 1");

            $arrData = [
                "dataQuery" => $query,
                "dataId" => 1,
            ];
            echo json_encode($arrData);
            break;


        case 'modifiedAppSettings':
            $status = $_POST["status"];
            $id = (int)$_POST["id"];

            $nama = strtoupper($_POST["appAdmSetNameId"]);
            $gender = strtoupper($_POST["appAdmSetGenderId"]);
            $birthDay = $_POST["appAdmSetBirthDayId"];
            $phone = phoneNumber($_POST["appAdmSetPhoneDayId"]);
            $email = strtolower($_POST["appAdmSetEmailId"]);
            $pass = $_POST["appAdmSetPassId"];
            $rePass = privateHashing($_POST["appAdmSetRepassId"]);

            if ($status == 'edit' && isset($id)) {
                $query = "UPDATE tb_appcontroller
                      SET
                      nama = '$nama',
                      jenis_kelamin = '$gender',
                      tanggal_lahir = '$birthDay',
                      kontak = '$phone',
                      email = '$email',
                      `password` = '$pass'
                      WHERE Id_appcontroller = $id";
                $message = 'Data Berhasil Di Update';
            }

            $statusMessage = dataProses($query);

            echo json_encode([
                "title" => $statusMessage,
                "message" => $message,
            ]);
            break;


        case 'meinKosu':
            $countSchedule = query("SELECT count(*) as 'countSchedule' FROM tb_schedul");

            $countDosen = query("SELECT count(*) as 'countDosen' FROM tb_dosen");

            $countRooms = query("SELECT count(*) as 'countRooms' FROM tb_room");

            $countSemester = query("SELECT *,
                                count(semester) as 'countSemester' 
                                FROM tb_praktikum GROUP BY semester");

            $arr = [
                "countSchedule" => $countSchedule[0]["countSchedule"],
                "countDosen" => $countDosen[0]["countDosen"],
                "countRooms" => $countRooms[0]["countRooms"],
                "countSemester" => $countSemester,
            ];

            echo json_encode($arr);

            break;
    }
} else {
    echo 0;
}
