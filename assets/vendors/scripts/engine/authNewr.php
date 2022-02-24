<?php
header('Access-Control-Allow-Origin: http://localhost/ajockey/selmi');
error_reporting(0);
session_start();
require 'conn.php';
require 'function.php';
$order = anti_Injection($_REQUEST['order']);

switch ($order) {
    case 'bemember':

        $nama   = str_replace("&#039;", "`", anti_Injection($_POST['fullNameReg']));
        $email  = anti_Injection($_POST['mailReg']);
        $gender = anti_Injection($_POST['genderReg']);
        $tgl_lahir = anti_Injection($_POST['dateBornReg']);
        $password = privateHashing($_POST['passReg']);
        $uri = privateHashing(anti_Injection($_POST['uri']));
        $today = gettoday();

        $checkingMail  = uniqEmail($email);
        if ($checkingMail) {

            $query = "INSERT 
                      INTO tb_member
                      SET
                      nama = '$nama',
                      jenis_kelamin = '$gender',
                      tanggal_lahir = '$tgl_lahir',
                      email = '$email',
                     `password` = '$password',
                      bg_profile = 'avatar-6.png'";

            $statusMessage = dataProses($query);

            $_SESSION['Id_member'] = mysqli_insert_id($conn);
            $_SESSION['nama'] = $rows['nama'];
            $_SESSION['email'] = $rows['email'];
            $_SESSION['pekerjaan'] = $rows['pekerjaan'];
            $_SESSION['bg_profile'] = $rows['bg_profile'];
            $_SESSION['token'] = privateHashing(gettodayShort());
            $_SESSION['bg_'] = $uri;

            echo 1;
        } else {
            echo 'Email Already Registered';
        }

        break;

    default:
        break;
}
