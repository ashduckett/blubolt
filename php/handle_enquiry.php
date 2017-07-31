<?php
    require "DBObjects/Enquiry.class.php";

    // Function to generate a thank you after a user has submitted their enquiry.
    // Note that htmlspecialchars stops people being able to run JS by typing
    // script tags into the enquiry box.
    function generateThankYou($enquiry) {
        $html = '<h1>Thank you for your enquiry, here is a copy:</h1>';
        $html .= ('<p>' . htmlspecialchars($enquiry) . '</p>');
        return $html;
    }

    $errors = array();

    $name = $_POST['name'];
    $email = $_POST['email'];
    $enquiry = $_POST['enquiry'];

    // Server side validation
    
    // Ensure that name has a value
    if(empty(trim($name))) {
        $errors[] = "Name must contain a value.";
    }

    // Ensure that the email is valid
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format"; 
    }

    // Ensure that the enquiry has a value
    if(empty(trim($enquiry))) {
        $errors[] = "Enquiry must contain a value.";
    }

    // Prepare the data so it can become a DBObject
    $data = array(
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'enquiry' => $_POST['enquiry']
    );
    
    // If there are no errors, proceed
    if(count($errors) === 0) {
        // Create Enquiry object
        $enquiry = new Enquiry($data);

        // Insert it
        $enquiry->insert();

        // Send email to customer
        $enquiry->sendEmailToCustomer();
        $enquiry->sendEmailToTeam();

        echo(generateThankYou($enquiry->getEnquiry()));
    } else {

        // Return the errors. User should have used the form, but if they didn't then they will
        // want access to what went wrong.
        echo $errors;    
    }