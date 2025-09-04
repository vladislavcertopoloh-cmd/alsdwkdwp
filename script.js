document.addEventListener('DOMContentLoaded', () => {
    // Код для бокового меню...
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');

    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
    });

    // Система регистрации и входа
    const authButtons = document.getElementById('auth-buttons');
    const authForms = document.getElementById('auth-forms');
    const userInfo = document.getElementById('user-info');

    const showRegisterFormBtn = document.getElementById('show-register-form-btn');
    const showLoginFormBtn = document.getElementById('show-login-form-btn');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const currentUser = document.getElementById('current-user');

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showLoggedInState(loggedInUser);
    }

    showRegisterFormBtn.addEventListener('click', () => {
        authForms.style.display = 'block';
        registerForm.style.display = 'flex';
        loginForm.style.display = 'none';
    });

    showLoginFormBtn.addEventListener('click', () => {
        authForms.style.display = 'block';
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            alert('Пользователь с таким именем уже существует!');
            return;
        }

        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Регистрация прошла успешно!');
        showLoggedInState(username);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[username] && users[username] === password) {
            alert('Вход выполнен!');
            showLoggedInState(username);
        } else {
            alert('Неверное имя пользователя или пароль.');
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        showLoggedOutState();
    });

    function showLoggedInState(username) {
        authButtons.style.display = 'none';
        authForms.style.display = 'none';
        userInfo.style.display = 'flex';
        currentUser.textContent = username;
        localStorage.setItem('loggedInUser', username);
    }

    function showLoggedOutState() {
        authButtons.style.display = 'flex';
        authForms.style.display = 'none';
        userInfo.style.display = 'none';
        currentUser.textContent = '';
    }

    // Система настроек
    const settingsModal = document.getElementById('settings-modal');
    const settingsLink = document.getElementById('settings-link');
    const closeButton = document.querySelector('.close-button');
    
    settingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        settingsModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
});
