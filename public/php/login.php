<?php
header('Content-Type: application/json');
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$login = $data["login"] ?? "";
$haslo = $data["haslo"] ?? "";

if (!$login || !$haslo) {
    echo json_encode(["status" => "error", "message" => "Brak danych"]);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT * FROM uzytkownicy WHERE login = ?");
    $stmt->execute([$login]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user["haslo"] === $haslo) {
        echo json_encode([
            "status" => "success",
            "login" => $user["login"]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Nieprawidłowy login lub hasło"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Błąd bazy danych"]);
}
?>