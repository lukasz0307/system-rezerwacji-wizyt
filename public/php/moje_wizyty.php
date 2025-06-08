<?php
header("Content-Type: application/json");
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$login = $data["login"] ?? null;

if (!$login) {
    echo json_encode(["status" => "error", "message" => "Brak loginu"]);
    exit;
}

try {
    $stmt = $conn->prepare("
        SELECT w.id_wizyty, w.data_wizyty, w.godzina_wizyty, w.id_zakl, dz.nazwa
        FROM wizyta w
        JOIN dane_zakl dz ON w.id_zakl = dz.id_zakl
        WHERE w.login = ?
        ORDER BY w.data_wizyty DESC, w.godzina_wizyty DESC
    ");
    $stmt->execute([$login]);
    $wizyty = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "wizyty" => $wizyty]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Błąd bazy danych"]);
}
?>