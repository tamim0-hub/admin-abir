// ============================================
// AUTH.JS - লগইন সিস্টেম (হার্ডকোডেড)
// ============================================

const VALID_EMAIL = 'abirhossaintamim1820@gmail.com';
const VALID_PASSWORD = '@bida@bir';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginScreen = document.getElementById('loginScreen');
    const appContainer = document.getElementById('appContainer');
    const loginError = document.getElementById('loginError');

    // চেক করা আগে থেকে লগইন করা আছে কিনা
    if (sessionStorage.getItem('loggedIn') === 'true') {
        loginScreen.style.display = 'none';
        appContainer.style.display = 'block';
        return;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
            sessionStorage.setItem('loggedIn', 'true');
            loginScreen.style.display = 'none';
            appContainer.style.display = 'block';
            loginError.textContent = '';
            // UI লোড করুন
            if (typeof loadApp === 'function') loadApp();
        } else {
            loginError.textContent = '❌ ভুল ইমেইল বা পাসওয়ার্ড!';
        }
    });
});

// লগআউট ফাংশন (প্রয়োজনে)
function logout() {
    sessionStorage.removeItem('loggedIn');
    location.reload();
}