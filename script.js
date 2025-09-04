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

    // Система смены языка
    const settingsModal = document.getElementById('settings-modal');
    const settingsLink = document.getElementById('settings-link');
    const closeButton = document.querySelector('.close-button');
    const langButtons = document.querySelectorAll('.lang-button');

    const translations = {
        'ru': {
            title: 'Нью-Йоркская Хроника',
            search: 'Поиск...',
            register: 'Регистрация',
            login: 'Войти',
            register_button: 'Зарегистрироваться',
            login_button: 'Войти',
            welcome: 'Добро пожаловать,',
            logout: 'Выход',
            settings: 'Настройки',
            publish_news: 'Публикация новостей',
            support: 'Техподдержка',
            language_title: 'Смена языка',
            article_title: 'Заголовок новости',
            article_meta: 'Опубликовано 31 августа, 2025',
            article_text_1: 'Это пример текста новости. Он будет выглядеть как газетная статья. Вы можете добавлять сюда свой текст. Он будет монохромным и иметь газетный шрифт.',
            article_text_2: 'Второй параграф для примера. Здесь вы можете продолжать историю или добавлять больше деталей. Газетные статьи часто используют несколько коротких параграфов.'
        },
        'en': {
            title: 'New York Chronicle',
            search: 'Search...',
            register: 'Register',
            login: 'Log In',
            register_button: 'Register',
            login_button: 'Log In',
            welcome: 'Welcome,',
            logout: 'Log out',
            settings: 'Settings',
            publish_news: 'Publish News',
            support: 'Support',
            language_title: 'Change Language',
            article_title: 'News Headline',
            article_meta: 'Published August 31, 2025',
            article_text_1: 'This is a sample news text. It will look like a newspaper article. You can add your own text here. It will be monochrome and have a newspaper-style font.',
            article_text_2: 'A second paragraph for the example. Here you can continue the story or add more details. Newspaper articles often use several short paragraphs.'
        },
        'pl': {
            title: 'Kronika Nowego Jorku',
            search: 'Szukaj...',
            register: 'Rejestracja',
            login: 'Zaloguj',
            register_button: 'Zarejestruj',
            login_button: 'Zaloguj',
            welcome: 'Witaj,',
            logout: 'Wyloguj',
            settings: 'Ustawienia',
            publish_news: 'Publikuj wiadomości',
            support: 'Wsparcie techniczne',
            language_title: 'Zmiana języka',
            article_title: 'Nagłówek wiadomości',
            article_meta: 'Opublikowano 31 sierpnia 2025 r.',
            article_text_1: 'To jest przykładowy tekst wiadomości. Będzie wyglądać jak artykuł w gazecie. Możesz dodać tutaj swój własny tekst. Będzie on monochromatyczny i będzie miał czcionkę w stylu gazetowym.',
            article_text_2: 'Drugi akapit do przykładu. Tutaj możesz kontynuować historię lub dodać więcej szczegółów. Artykuły prasowe często używają kilku krótkich akapitów.'
        }
    };

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        translatePage(lang);
    }

    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }

    const savedLanguage = localStorage.getItem('language') || 'ru'; // Устанавливаем русский по умолчанию
    setLanguage(savedLanguage);

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

    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            setLanguage(lang);
            settingsModal.style.display = 'none';
        });
    });
});
