<?php

http_response_code(200);
header('Content-Type: application/json');
echo json_encode([
	"code" => 400,
	"message" => "Your form has been sent successfuly",
	"error" => "Something went wrong"
]);
