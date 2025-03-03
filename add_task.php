<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tytul = $_POST['tytul'];
    $typ = $_POST['typ'];

    $sql = "INSERT INTO zadania (tytul, typ) VALUES (:tytul, :typ)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':tytul', $tytul);
    $stmt->bindParam(':typ', $typ);
    
    if ($stmt->execute()) {
        echo "Zadanie dodane pomyślnie!";
    } else {
        echo "Wystąpił błąd podczas dodawania zadania.";
    }
}
?>
