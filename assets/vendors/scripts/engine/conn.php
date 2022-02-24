<?php
define("RDS_HOSTNAME", "localhost");
define("RDS_DB_NAME", "greedy-han");
define("RDS_USERNAME", "root");
define("RDS_PASSWORD", "");

$conn = mysqli_connect(RDS_HOSTNAME, RDS_USERNAME, RDS_PASSWORD, RDS_DB_NAME) or die("Koneksi gagal");
