<?php
// Endpoint do przekładania wizyty na inny termin
header("Content-Type: application/json");
require_once "db.php";

// Pobierz dane z żądania
$data = json_decode(file_get_contents("php://input"), true);
$id_wizyty = $data["id_wizyty"] ?? null;
$nowa_data = $data["nowa_data"] ?? null;
$nowa_godzina = $data["nowa_godzina"] ?? null;

if (!$id_wizyty || !$nowa_data || !$nowa_godzina) {
    echo json_encode(["status" => "error", "message" => "Brak danych wejściowych"]);
    exit;
}

try {
    // Zaktualizuj termin wizyty w bazie
    $stmt = $conn->prepare("UPDATE wizyta SET data_wizyty = ?, godzina_wizyty = ? WHERE id_wizyty = ?");
    $stmt->execute([$nowa_data, $nowa_godzina, $id_wizyty]);
    echo json_encode(["status" => "success"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Błąd bazy danych"]);
}
?>