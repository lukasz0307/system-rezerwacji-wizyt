<?php
// Endpoint zwracający listę wszystkich zakładów z bazy
header("Content-Type: application/json");
include 'db.php';

try {
        // Pobierz zakłady wraz ze średnią oceną
    $stmt = $conn->query("
        SELECT dz.id_zakl AS id, dz.nazwa, dz.ulica_nr, dz.miasto, dz.rodz_uslugi, 
               ROUND(COALESCE(s.srednia, 0), 1) AS ocena
        FROM dane_zakl dz
        LEFT JOIN srednia_ocen_zakl s ON dz.id_zakl = s.id_zakl
    ");
    $zaklady = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($zaklady);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Błąd zapytania: " . $e->getMessage()]);
}
?>
