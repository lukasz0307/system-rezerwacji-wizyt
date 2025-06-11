<?php
// Endpoint do dodawania nowej rezerwacji wizyty
header("Content-Type: application/json");
include 'db.php';
// Pobierz dane z żądania
$data = json_decode(file_get_contents("php://input"), true);

$data_wizyty = $data["data"] ?? null;
$godzina_wizyty = $data["godzina"] ?? null;
$login = $data["login"] ?? null;
$id_zakl = $data["zakladId"] ?? null;

if (!$data_wizyty || !$godzina_wizyty || !$login || !$id_zakl) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Brak danych wejściowych"]);
    exit;
}

try {
    // Dodaj rezerwację do bazy
    $stmt = $conn->prepare("INSERT INTO wizyta (data_wizyty, godzina_wizyty, login, id_zakl) 
                            VALUES (:data, :godzina, :login, :id_zakl)");
    $stmt->execute([
        ":data" => $data_wizyty,
        ":godzina" => $godzina_wizyty,
        ":login" => $login,
        ":id_zakl" => $id_zakl
    ]);
    echo json_encode(["status" => "success"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Błąd zapisu: " . $e->getMessage()]);
}
?>
