// Handy function called when the page loads and also allows the link back from the thank you screen to
// perform the same job.
function loadForm() {
    $('.content').load(rootFolder + 'php/form.php', function() {
        let enquiryField = $('#enquiry');
        let emailField = $('#email');
        let nameField = $('#name');

        // Clear the form when the Clear button is checked
        $('#clear').click(function() {
            enquiryField.val('');
            emailField.val('');
            nameField.val('');

            $('#email-form-group').removeClass('has-error');
            $('#name-form-group').removeClass('has-error');
            $('#enquiry-form-group').removeClass('has-error');
            $('.form-control-feedback').removeClass('glyphicon-ok');
            $('.form-control-feedback').removeClass('glyphicon-remove');

            // Get the first field in focus ready for input
            $('#name').focus();

            // Clear any tooltips that may have been visible
            enquiryField.tooltip('destroy');
            emailField.tooltip('destroy');
            nameField.tooltip('destroy');
        });

        // A helper function to get a tooltip object for Bootstrap's tooltip component
        function getTooltipObject(text) {
            return {
                title: text,
                placement: 'top',
                container: 'body',
                trigger: 'manual'
            }
        }

        // Ensure the name field has some input. If it doesn't, tell the user
        function validateName() {
            let nameText = $.trim($('#name').val());
            let validName = nameText !== '';

            // Make the field red if name is invalid
            $('#name-form-group').toggleClass('has-error', !validName);

            // Display the cross and hide the okay icons based on the validity of the current input
            $('#name-form-group .form-control-feedback').toggleClass('glyphicon-ok', validName)
            $('#name-form-group .form-control-feedback').toggleClass('glyphicon-remove', !validName)
            
            // If the field's not valid, tell the user why via a tooltip, otherwise hide it
            if(!validName) {
                nameField.tooltip(getTooltipObject('You must enter a name')).tooltip('show');
            } else {
                nameField.tooltip('destroy');
            }

            // Return the validity of the name field.
            return validName;
        }


        // Same story here, only the email has to be checked with a separate isValidEmail function
        function validateEmail() {
            let emailText = $.trim($('#email').val());
            let validEmail = isValidEmail(emailText);

            $('#email-form-group').toggleClass('has-error', !validEmail);
            $('#email-form-group .form-control-feedback').toggleClass('glyphicon-ok', validEmail)
            $('#email-form-group .form-control-feedback').toggleClass('glyphicon-remove', !validEmail)

            if(!validEmail) {
                emailField.tooltip(getTooltipObject('You must enter a valid email')).tooltip('show');
            } else {
                emailField.tooltip('destroy');
            }

            return validEmail;
        }

        // Same here, the same as the name field, checking for input
        function validateEnquiry() {
            let enquiryText = $.trim($('#enquiry').val());
            let validEnquiry = enquiryText !== '';

            $('#enquiry-form-group').toggleClass('has-error', !validEnquiry);

            
            if(!validEnquiry) {
                enquiryField.tooltip(getTooltipObject('You must enter an enquiry')).tooltip('show');
            } else {
                enquiryField.tooltip('destroy');
            }

            return validEnquiry;
        }

        function validateFields() {
            // Non-short-circuited AND here because we want every one of them to run.
            return validateName() & validateEmail() & validateEnquiry();
        }

        // Ensure validation takes place when the user tabs out of each control
        nameField.change(function() {
            validateName()
        });

        emailField.change(function() {
            validateEmail();
        });

        enquiryField.change(function() {
            validateEnquiry();
        })

        $('#submit').click(function() {
            // If all the fields are valid
            if(validateFields()) {

                // Grab their current values
                let emailText = $.trim($('#email').val());
                let nameText = $.trim($('#name').val());
                let enquiryText = $.trim($('#enquiry').val());

                // Send off the data to the php script which will perform its own validation and send the appropriate emails
                $.post(rootFolder + 'php/handle_enquiry.php', {name: nameText, email: emailText, enquiry: enquiryText}, function(data) {
                    // Clear the main content
                    $('.content').html = '';

                    // Display the thank you message returned
                    $('.content').html(data);

                    // Also add a link so the user can get back to the form
                    let linkBackToForm = $(document.createElement('a'));
                    linkBackToForm.attr('href', '#');
                    linkBackToForm.text('New Enquiry');

                    // Re-generate the original form if this link is hit
                    linkBackToForm.click(function() {
                        loadForm();
                    });
                    $('.content').append(linkBackToForm);
                });
            }
        });
        
        // Helper function to check for email validity
        function isValidEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }
    });
}



$(document).ready(function() {
    loadForm();    
});