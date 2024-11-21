// app.js

// Custom function to hash passwords (SHA-256)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return bufferToHex(hashBuffer);
}

// Convert ArrayBuffer to Hex String
function bufferToHex(buffer) {
    const view = new DataView(buffer);
    let hexString = '';
    for (let i = 0; i < buffer.byteLength; i++) {
        const byte = view.getUint8(i);
        hexString += byte.toString(16).padStart(2, '0');
    }
    return hexString;
}

// Sign-up function: stores username and hashed password in localStorage
document.getElementById('signup-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        const hashedPassword = await hashPassword(password);
        
        // Check if user already exists
        if (localStorage.getItem(username)) {
            alert('Username already taken!');
        } else {
            // Store username and hashed password
            localStorage.setItem(username, hashedPassword);
            alert('Sign-up successful! You can now log in.');
            window.location.href = 'login.html';
        }
    } else {
        alert('Please fill in all fields');
    }
});

// Login function: verifies username and password by comparing hashed values
document.getElementById('login-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (username && password) {
        const hashedPassword = await hashPassword(password);
        
        // Retrieve stored hashed password
        const storedHashedPassword = localStorage.getItem(username);
        
        if (storedHashedPassword && storedHashedPassword === hashedPassword) {
            alert('Login successful!');
            window.location.href = 'games.html'; // Redirect to games page
        } else {
            alert('Invalid username or password');
        }
    } else {
        alert('Please fill in both fields');
    }
});
