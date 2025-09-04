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
    const closeSettingsModal = document.getElementById('close-settings-modal');
    
    settingsLink.addEventListener('click', (e) => {
        e.preventDefault();
        settingsModal.style.display = 'block';
    });

    closeSettingsModal.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    // Система техподдержки
    const supportModal = document.getElementById('support-modal');
    const supportLink = document.getElementById('support-link');
    const closeSupportModal = document.getElementById('close-support-modal');
    const supportForm = document.getElementById('support-form');
    const supportFormContainer = document.getElementById('support-form-container');
    const supportMessageSent = document.getElementById('support-message-sent');

    supportLink.addEventListener('click', (e) => {
        e.preventDefault();
        supportModal.style.display = 'block';
        supportFormContainer.style.display = 'block';
        supportMessageSent.style.display = 'none';
        document.getElementById('support-message').value = '';
    });
    
    closeSupportModal.addEventListener('click', () => {
        supportModal.style.display = 'none';
    });
    
    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        supportFormContainer.style.display = 'none';
        supportMessageSent.style.display = 'block';
        
        setTimeout(() => {
            supportModal.style.display = 'none';
        }, 3000);
    });

    // Единый обработчик для закрытия модальных окон при клике вне их
    window.addEventListener('click', (e) => {
        if (e.target == settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (e.target == supportModal) {
            supportModal.style.display = 'none';
        }
    });

    // --- Логика графика и ставок ---
    const canvas = document.getElementById('trading-chart');
    const ctx = canvas.getContext('2d');
    const betUpBtn = document.getElementById('bet-up');
    const betDownBtn = document.getElementById('bet-down');
    const betAmountInput = document.getElementById('bet-amount');
    const balanceDisplay = document.getElementById('balance');
    const betResultDisplay = document.getElementById('bet-result');

    // Настройки графика
    const chartWidth = 600;
    const chartHeight = 300;
    const maxDataPoints = 100;
    let data = [];
    let price = 100;
    let betActive = false;
    let betDirection = null;

    canvas.width = chartWidth;
    canvas.height = chartHeight;

    // Инициализация баланса
    let balance = localStorage.getItem('tradingBalance') || 1000;
    balanceDisplay.textContent = balance;

    // Функция для рисования графика
    function drawChart() {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, chartWidth, chartHeight);

        // Рисуем линии сетки
        ctx.strokeStyle = '#333';
        ctx.beginPath();
        for (let i = 0; i <= 10; i++) {
            const y = chartHeight / 10 * i;
            ctx.moveTo(0, y);
            ctx.lineTo(chartWidth, y);
        }
        ctx.stroke();

        // Рисуем сам график
        ctx.beginPath();
        ctx.strokeStyle = '#00ffff'; // Неоновый цвет
        ctx.lineWidth = 2;
        
        // Добавляем тень для неонового эффекта
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffff';

        if (data.length > 0) {
            ctx.moveTo(0, chartHeight - data[0]);
            for (let i = 1; i < data.length; i++) {
                const x = i * (chartWidth / (maxDataPoints - 1));
                const y = chartHeight - data[i];
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // Функция для обновления данных графика
    function updateData() {
        // Рандомный рост или падение
        price += (Math.random() - 0.5) * 5;
        if (price < 0) price = 0;

        data.push(price);
        if (data.length > maxDataPoints) {
            data.shift();
        }
    }

    // Игровой цикл
    function gameLoop() {
        updateData();
        drawChart();
        requestAnimationFrame(gameLoop);
    }
    
    // Функция для проверки результата ставки
    function checkBetResult(startPrice, endPrice, direction) {
        if (direction === 'up' && endPrice > startPrice) {
            return 'win';
        } else if (direction === 'down' && endPrice < startPrice) {
            return 'win';
        } else {
            return 'lose';
        }
    }

    // Обработчики кнопок ставок
    betUpBtn.addEventListener('click', () => {
        if (betActive) return;
        const betAmount = parseInt(betAmountInput.value);
        if (balance < betAmount || betAmount <= 0) {
            betResultDisplay.textContent = 'Недостаточно средств!';
            betResultDisplay.className = 'bet-result-message lose';
            return;
        }

        betActive = true;
        betDirection = 'up';
        balance -= betAmount;
        balanceDisplay.textContent = balance;
        betResultDisplay.textContent = 'Ставка сделана на "ВВЕРХ"!';
        betResultDisplay.className = 'bet-result-message';

        const startPrice = price;

        setTimeout(() => {
            const endPrice = price;
            const result = checkBetResult(startPrice, endPrice, betDirection);
            if (result === 'win') {
                balance += betAmount * 2;
                betResultDisplay.textContent = 'Вы выиграли! Баланс обновлён.';
                betResultDisplay.className = 'bet-result-message win';
            } else {
                betResultDisplay.textContent = 'Вы проиграли. Попробуйте снова.';
                betResultDisplay.className = 'bet-result-message lose';
            }
            balanceDisplay.textContent = balance;
            localStorage.setItem('tradingBalance', balance);
            betActive = false;
        }, 5000); // Результат через 5 секунд
    });

    betDownBtn.addEventListener('click', () => {
        if (betActive) return;
        const betAmount = parseInt(betAmountInput.value);
        if (balance < betAmount || betAmount <= 0) {
            betResultDisplay.textContent = 'Недостаточно средств!';
            betResultDisplay.className = 'bet-result-message lose';
            return;
        }

        betActive = true;
        betDirection = 'down';
        balance -= betAmount;
        balanceDisplay.textContent = balance;
        betResultDisplay.textContent = 'Ставка сделана на "ВНИЗ"!';
        betResultDisplay.className = 'bet-result-message';

        const startPrice = price;

        setTimeout(() => {
            const endPrice = price;
            const result = checkBetResult(startPrice, endPrice, betDirection);
            if (result === 'win') {
                balance += betAmount * 2;
                betResultDisplay.textContent = 'Вы выиграли! Баланс обновлён.';
                betResultDisplay.className = 'bet-result-message win';
            } else {
                betResultDisplay.textContent = 'Вы проиграли. Попробуйте снова.';
                betResultDisplay.className = 'bet-result-message lose';
            }
            balanceDisplay.textContent = balance;
            localStorage.setItem('tradingBalance', balance);
            betActive = false;
        }, 5000); // Результат через 5 секунд
    });

    // Запускаем основной игровой цикл
    gameLoop();
});
