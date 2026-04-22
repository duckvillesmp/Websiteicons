// This is a SHA-256 hash of "Alpha_2026_Secure"
const ENCRYPTED_CREDENTIALS = {
    username: "admin",
    passwordHash: "7f7f8b9f7f8b9f..." // Truncated for display
};

// Initialize the "Local Database" with your account if it's empty
if (!localStorage.getItem('admin')) {
    // We store the hash, NOT the password!
    const hash = CryptoJS.SHA256("Alpha_2026_Secure").toString();
    localStorage.setItem('admin', hash);
}

async function handleLogin() {
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;
    const status = document.getElementById('status-msg');

    // 1. Get the stored hash for this user
    const storedHash = localStorage.getItem(user);

    if (!storedHash) {
        status.innerText = "Access Denied.";
        return;
    }

    // 2. Hash the input password to see if it matches the stored fingerprint
    const inputHash = CryptoJS.SHA256(pass).toString();

    if (inputHash === storedHash) {
        status.style.color = "green";
        status.innerText = "Identity Verified. Redirecting...";
        // window.location.href = "dashboard.html"; 
    } else {
        status.style.color = "red";
        status.innerText = "Invalid Credentials.";
    }
}