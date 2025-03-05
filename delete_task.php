<?php
$host = 'localhost';
$db = 'todo_list';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$id = (int)$data['id'];

$sql = "DELETE FROM tasks WHERE id = $id";
$response = ['success' => $conn->query($sql) === TRUE];

$conn->close();
echo json_encode($response);
?>