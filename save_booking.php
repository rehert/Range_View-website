<?php

    require "db.php";

    $arrival_date =
        $_POST["arrival_date"];

    $checkout_date =
        $_POST["checkout_date"];

    $room =
        $_POST["room"];

    $first_name =
        $_POST["first_name"];

    $last_name =
        $_POST["last_name"];

    $email =
        $_POST["email"];

    $phone =
        $_POST["phone"];

    $nationality =
        $_POST["nationality"];

    $special_requests =
        $_POST["special_requests"];

    $payment_method =
        $_POST["payment_method"];


    $sql = "INSERT INTO bookings
    (
        arrival_date,
        checkout_date,
        room,
        first_name,
        last_name,
        email,
        phone,
        nationality,
        special_requests,
        payment_method
    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


    $stmt = $conn->prepare($sql);


    $stmt->bind_param(
        "ssssssssss",
        $arrival_date,
        $checkout_date,
        $room,
        $first_name,
        $last_name,
        $email,
        $phone,
        $nationality,
        $special_requests,
        $payment_method
    );


    if ($stmt->execute()) {

        echo "success";

    } else {

        echo "error";
    }

?>