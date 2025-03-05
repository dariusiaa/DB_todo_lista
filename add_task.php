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
$title = $conn->real_escape_string($data['title']);
$description = $conn->real_escape_string($data['description']);
$category = $conn->real_escape_string($data['category']);
$status = $conn->real_escape_string($data['status']);
$priority = $conn->real_escape_string($data['priority']);
$due_date = $conn->real_escape_string($data['due_date']);

$sql = "INSERT INTO tasks (title, description, category, status, priority, due_date) VALUES ('$title', '$description', '$category', '$status', '$priority', '$due_date')";
$response = ['success' => $conn->query($sql) === TRUE];

$conn->close();
echo json_encode($response);
?>