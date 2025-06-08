<?php
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id_zakl = $data["id_zakl"] ?? null;
$ocena = $data["ocena"] ?? null;
$login = $data["login"] ?? null;

if (!$id_zakl || !$ocena || !$login) {
    echo json_encode(["status" => "error", "message" => "Brak danych wejściowych"]);
    exit;
}

try {
    // Możesz dodać sprawdzenie, czy użytkownik już oceniał ten zakład
    $stmt = $conn->prepare("INSERT INTO oceny (id_zakl, ocena, login) VALUES (?, ?, ?)");
    $stmt->execute([$id_zakl, $ocena, $login]);
    echo json_encode(["status" => "success"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Błąd bazy danych"]);
}
?>