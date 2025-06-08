<?php
$host = "localhost";
$dbname = "rezerwacje";
$user = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Błąd połączenia z bazą danych: " . $e->getMessage()]);
    exit;
}
?>
