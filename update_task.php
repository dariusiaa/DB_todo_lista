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
$title = $conn->real_escape_string($data['title']);
$description = $conn->real_escape_string($data['description']);
$category = $conn->real_escape_string($data['category']);
$status = $conn->real_escape_string($data['status']);
$priority = $conn->real_escape_string($data['priority']);
$due_date = $conn->real_escape_string($data['due_date']);

$sql = "UPDATE tasks SET title='$title', description='$description', category='$category', status='$status', priority='$priority', due_date='$due_date' WHERE id=$id";
$response = ['success' => $conn->query($sql) === TRUE];

$conn->close();
echo json_encode($response);
?>