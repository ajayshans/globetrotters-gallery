document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('#login');

    // Function to validate the input fields
    function validateInputs() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            alert('Please enter both username and password.');
            return false;
        }

        // Further validation checks can be added here

        return true;
    }

    // Handle form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission
console.log (username,password)
        if (validateInputs()) {
            // If validation passes, proceed with form submission or AJAX request

            // Example of an AJAX request for login (optional)
            /*
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Handle successful login
                    window.location.href = '/dashboard'; // Redirect to dashboard
                } else {
                    // Display error message
                    // You can modify this part to show error message dynamically
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            */

            // If not using AJAX, submit the form normally
            loginForm.submit();
        }
    });
});