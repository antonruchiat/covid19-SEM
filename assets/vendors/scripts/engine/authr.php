<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require 'conn.php';
    require 'function.php';
    $user = anti_Injection($_POST['mail']);
    $pass = privateHashing(anti_Injection($_POST['pass']));
    $uri = privateHashing(anti_Injection($_POST['uri']));


    $query = mysqli_query(
        $conn,
        "SELECT * FROM tb_member WHERE email = '$user' LIMIT 1"
    );

    $rows = mysqli_fetch_assoc($query);

    $password = $rows['password'] ?? null;
    if ($pass == $password && $user != '') {
        $_SESSION['Id_member'] = $rows['Id_member'];
        $_SESSION['nama'] = $rows['nama'];
        $_SESSION['email'] = $rows['email'];
        $_SESSION['pekerjaan'] = $rows['pekerjaan'];
        $_SESSION['bg_profile'] = $rows['bg_profile'];
        $_SESSION['token'] = privateHashing(gettodayShort());
        $_SESSION['bg_'] = $uri;
        echo 1;
    } else {
        echo 'Rejected Login';
    }
}
