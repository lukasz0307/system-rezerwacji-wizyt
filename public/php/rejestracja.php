<?php
header("Content-Type: application/json");
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$login = $data["login"] ?? "";
$haslo = $data["haslo"] ?? "";

if (!$login || !$haslo) {
    echo json_encode(["status" => "error", "message" => "Podaj login i hasło"]);
    exit;
}

// Sprawdź, czy login już istnieje
$stmt = $conn->prepare("SELECT * FROM uzytkownicy WHERE login = ?");
$stmt->execute([$login]);
if ($stmt->fetch()) {
    echo json_encode(["status" => "error", "message" => "Taki login już istnieje"]);
    exit;
}

// Dodaj użytkownika (jeśli chcesz hashować hasła, użyj password_hash)
$stmt = $conn->prepare("INSERT INTO uzytkownicy (login, haslo) VALUES (?, ?)");
$stmt->execute([$login, $haslo]);
echo json_encode(["status" => "success"]);
?>