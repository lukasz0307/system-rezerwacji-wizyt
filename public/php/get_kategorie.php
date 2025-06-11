<?php
// Endpoint zwracający listę unikalnych kategorii usług
header("Content-Type: application/json");
include 'db.php';

try {
        // Pobierz unikalne kategorie usług
    $stmt = $conn->query("SELECT DISTINCT rodz_uslugi FROM dane_zakl ORDER BY rodz_uslugi");
    $kategorie = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo json_encode($kategorie);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Błąd bazy: " . $e->getMessage()]);
}
?>