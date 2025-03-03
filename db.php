<?php
$host = 'localhost';
$dbname = 'todo_lista';
$username = 'root';
$password = ''; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Połączenie z bazą danych nie powiodło się: " . $e->getMessage());
}
?>