<?php
// Endpoint obsługujący logowanie użytkownika
header('Content-Type: application/json');
require_once "db.php";
// Pobierz dane z żądania (login i hasło)
$data = json_decode(file_get_contents("php://input"), true);
$login = $data["login"] ?? "";
$haslo = $data["haslo"] ?? "";

if (!$login || !$haslo) {
    echo json_encode(["status" => "error", "message" => "Brak danych"]);
    exit;
}

try {
    // Sprawdź, czy użytkownik istnieje i hasło się zgadza
    $stmt = $conn->prepare("SELECT * FROM uzytkownicy WHERE login = ?");
    $stmt->execute([$login]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user["haslo"] === $haslo) {
         // Logowanie udane
        echo json_encode([
            "status" => "success",
            "login" => $user["login"]
        ]);
    } else {
        // Błędny login lub hasło
        echo json_encode(["status" => "error", "message" => "Nieprawidłowy login lub hasło"]);
    }
} catch (PDOException $e) {
    // Błąd bazy danych
    echo json_encode(["status" => "error", "message" => "Błąd bazy danych"]);
}
?>