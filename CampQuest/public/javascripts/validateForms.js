(function() {
    'use strict' // Use strict JavaScript rules
    bsCustomFileInput.init() // Set up Bootstrap custom file inputs

    window.addEventListener('load', function() { // Run when the page has finished loading

        const forms = document.getElementsByClassName('needs-validation'); // Get forms that need validation

        const validation = Array.from(forms, function(form){ // Go through each form

            form.addEventListener('submit', function(event){ // Run when the form is submitted

                if (!form.checkValidity()){ // Check if the form is invalid
                    event.preventDefault(); // Stop the form from submitting
                    event.stopPropagation(); // Stop the submit event from continuing
                }
                form.classList.add('was-validated'); // Show the form's validation styling
            }, false);
        });
    }, false);
})()