// app.js
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username && password) {
        alert('Login successful (this is a mock login)');
        // Redirect to games page or perform any further action here
    } else {
        alert('Please enter both username and password');
    }
});
