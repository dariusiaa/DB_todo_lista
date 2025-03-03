<?php
include 'db.php';

$sql = "SELECT * FROM zadania ORDER BY data_dodania DESC";
$stmt = $pdo->query($sql);
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tasks);
?>
