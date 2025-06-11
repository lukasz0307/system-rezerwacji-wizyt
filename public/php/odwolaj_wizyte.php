<?php
// Endpoint do odwoływania (usuwania) wizyty
header("Content-Type: application/json");
require_once "db.php";

// Pobierz ID wizyty z żądania
$data = json_decode(file_get_contents("php://input"), true);
$id_wizyty = $data["id_wizyty"] ?? null;

if (!$id_wizyty) {
    echo json_encode(["status" => "error", "message" => "Brak ID wizyty"]);
    exit;
}

try {
     // Usuń wizytę z bazy
    $stmt = $conn->prepare("DELETE FROM wizyta WHERE id_wizyty = ?");
    $stmt->execute([$id_wizyty]);
    echo json_encode(["status" => "success"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Błąd bazy danych"]);
}
?>