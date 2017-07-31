// Handy function called when the page loads and also allows the link back from the thank you screen to
// perform the same job.
function loadForm() {
    console.log(rootFolder);
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

            $('#name').focus();


            enquiryField.tooltip('destroy');
            emailField.tooltip('destroy');
            nameField.tooltip('destroy');
            
        });

        function getTooltipObject(text) {
            return {
                title: text,
                placement: 'top',
                container: 'body',
                trigger: 'manual'
            }
        }

        function validateName() {
            let nameText = $.trim($('#name').val());
            let validName = nameText !== '';
            $('#name-form-group').toggleClass('has-error', !validName);
            $('#name-form-group .form-control-feedback').toggleClass('glyphicon-ok', validName)
            $('#name-form-group .form-control-feedback').toggleClass('glyphicon-remove', !validName)
            
            if(!validName) {
                nameField.tooltip(getTooltipObject('You must enter a name')).tooltip('show');
            } else {
                nameField.tooltip('destroy');
            }

            return validName;
        }



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
            // Apply colours and error icons if necessary
            if(validateFields()) {

                let emailText = $.trim($('#email').val());
                let nameText = $.trim($('#name').val());
                let enquiryText = $.trim($('#enquiry').val());

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
        
        function isValidEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }
    });
}



$(document).ready(function() {
    loadForm();    
});