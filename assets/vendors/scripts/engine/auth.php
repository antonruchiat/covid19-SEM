<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require 'conn.php';
    require 'function.php';
    $user = anti_Injection($_POST['mail']);
    $pass = $_POST['pass'];
    $uri = privateHashing(anti_Injection($_POST['uri']));

    $query = mysqli_query(
        $conn,
        "SELECT * FROM tb_appcontroller WHERE email = '$user' LIMIT 1"
    );

    $rows = mysqli_fetch_assoc($query);

    $password = $rows['password'] ?? null;
    if ($pass == $password && $user != '') {
        $_SESSION['Id_appcontroller'] = $rows['Id_appcontroller'];
        $_SESSION['nama'] = $rows['nama'];
        $_SESSION['email'] = $rows['email'];
        $_SESSION['token'] = privateHashing(gettodayShort());
        $_SESSION['bg_'] = $uri;
        echo 1;
    } else {
        echo 'rejected login';
    }
}
