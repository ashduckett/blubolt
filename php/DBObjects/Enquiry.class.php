<?php
    require "DataObject.class.php";
    require_once __DIR__ . '/../config.php';

    class Enquiry extends DataObject {
        protected $data = array(
            "id" => "",
            "name" => "",
            "email" => "",
            "enquiry" => ""
        );

         public function insert() {
            $conn = DataObject::connect();
            $sql = "INSERT INTO " . TBL_ENQUIRY . "(name, email, enquiry) VALUES (:name, :email, :enquiry)";
            $st = $conn->prepare($sql);
            
            $st->bindValue(":name", $this->data["name"], PDO::PARAM_STR);
            $st->bindValue(":email", $this->data["email"], PDO::PARAM_STR);
            $st->bindValue(":enquiry", $this->data["enquiry"], PDO::PARAM_STR);
            $st->execute();

            DataObject::disconnect($conn);
        }

        public function getEnquiry() {
            return $this->getValue('enquiry');
        }

        public function getEmail() {
            return $this->getValue('email');
        }

        public function getName() {
            return $this->getValue('name');
        }

        public function sendEmailToCustomer() {
            $msg = "Hello " . $this->getName() . ",\n\n";
            $msg .= "We're just confirming the receipt of your enquiry, as shown below.\n\n";
            $msg .= $this->getEnquiry() . "\n\n";
            $msg .= "We will get back to you within 24 hours and thank you for your interest.\n\n";
            $msg .= "Kind regards,\n";
            $msg .= "BluBolt";

            $msg = wordwrap($msg, 70);

            mail($this->getEmail(), "BluBolt Enquiries", $msg);
        }

        public function sendEmailToTeam() {
            $msg = "Hello team,\n\n";
            $msg .= "A customer, " . $this->getName() . " has just submitted the following enquiry:\n\n";
            $msg .= $this->getEnquiry() . "\n\n";
            $msg .= "Please ensure you get back to the customer within 24 hours.\n\n";

            $msg = wordwrap($msg, 70);

            // Email won't be sent as address doesn't exist
            mail("enquiries@example.com", "BluBolt Enquiries", $msg);
        }

    }

