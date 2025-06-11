<?php
// Plik: db.php
// Ustanawia połączenie z bazą danych MySQL za pomocą PDO

$host = "localhost";
$dbname = "rezerwacje";
$user = "root";
$password = "";

try {
    // Tworzenie połączenia z bazą danych
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Obsługa błędu połączenia
    http_response_code(500);
    echo json_encode(["error" => "Błąd połączenia z bazą danych: " . $e->getMessage()]);
    exit;
}
?>
