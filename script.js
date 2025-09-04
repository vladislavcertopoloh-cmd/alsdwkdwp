document.addEventListener('DOMContentLoaded', () => {
    // Код для бокового меню...
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const publishLink = document.getElementById('publish-link');

    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
    });

    publishLink.addEventListener('click', (e) => {
        e.preventDefault();
        openNewsModal();
    });

    // Система регистрации и входа
    const authButtons = document.getElementById('auth-buttons');
    const authForms = document.getElementById('auth-forms');
    const userInfo = document.getElementById('user-info');
    const publishNewsBtn = document.getElementById('publish-news-btn');

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

    // Функция для отображения сообщений на странице вместо alert()
    function showMessage(message, isError = false) {
        const messageDisplay = document.getElementById('bet-result');
        messageDisplay.textContent = message;
        messageDisplay.className = `bet-result-message ${isError ? 'lose' : 'win'}`;
        // Скрываем сообщение через 3 секунды
        setTimeout(() => {
            messageDisplay.textContent = '';
            messageDisplay.className = 'bet-result-message';
        }, 3000);
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            showMessage('Пользователь с таким именем уже существует!', true);
            return;
        }

        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Регистрация прошла успешно!');
        showLoggedInState(username);
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[username] && users[username] === password) {
            showMessage('Вход выполнен!');
            showLoggedInState(username);
        } else {
            showMessage('Неверное имя пользователя или пароль.', true);
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
        publishNewsBtn.style.display = 'block';
    }

    function showLoggedOutState() {
        authButtons.style.display = 'flex';
        authForms.style.display = 'none';
        userInfo.style.display = 'none';
        currentUser.textContent = '';
        publishNewsBtn.style.display = 'none';
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

    // Система публикации новостей
    const newsModal = document.getElementById('news-modal');
    const closeNewsModal = document.getElementById('close-news-modal');
    const publishNewsForm = document.getElementById('news-form');
    const newsTitleInput = document.getElementById('news-title');
    const newsContentInput = document.getElementById('news-content');
    const newsIdInput = document.getElementById('news-id');
    const newsFeedContainer = document.getElementById('news-feed-container');

    publishNewsBtn.addEventListener('click', () => {
        openNewsModal();
    });

    closeNewsModal.addEventListener('click', () => {
        newsModal.style.display = 'none';
    });

    function openNewsModal(article = null) {
        if (article) {
            newsTitleInput.value = article.title;
            newsContentInput.value = article.content;
            newsIdInput.value = article.id;
            document.getElementById('news-modal-title').textContent = 'Редактировать новость';
        } else {
            newsTitleInput.value = '';
            newsContentInput.value = '';
            newsIdInput.value = '';
            document.getElementById('news-modal-title').textContent = 'Опубликовать новость';
        }
        newsModal.style.display = 'block';
    }

    publishNewsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newsId = newsIdInput.value;
        const title = newsTitleInput.value;
        const content = newsContentInput.value;
        const author = localStorage.getItem('loggedInUser') || 'Аноним';
        const news = JSON.parse(localStorage.getItem('news')) || [];

        if (newsId) {
            // Редактирование существующей новости
            const articleIndex = news.findIndex(item => item.id == newsId);
            if (articleIndex !== -1) {
                news[articleIndex].title = title;
                news[articleIndex].content = content;
                news[articleIndex].date = new Date().toLocaleDateString('ru-RU');
            }
            showMessage('Новость успешно обновлена!');
        } else {
            // Создание новой новости
            const newArticle = {
                id: Date.now(),
                title,
                content,
                author,
                date: new Date().toLocaleDateString('ru-RU')
            };
            news.unshift(newArticle);
            showMessage('Новость успешно опубликована!');
        }
        
        localStorage.setItem('news', JSON.stringify(news));
        newsModal.style.display = 'none';
        renderNews();
    });

    // Единый обработчик для закрытия модальных окон при клике вне их
    window.addEventListener('click', (e) => {
        if (e.target == settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (e.target == supportModal) {
            supportModal.style.display = 'none';
        }
        if (e.target == newsModal) {
            newsModal.style.display = 'none';
        }
    });

    // Функция для отрисовки новостей на странице
    function renderNews() {
        const news = JSON.parse(localStorage.getItem('news')) || [];
        newsFeedContainer.innerHTML = '';
        const loggedInUser = localStorage.getItem('loggedInUser');
        
        if (news.length === 0) {
            newsFeedContainer.innerHTML = `<p style="text-align: center; color: #999;">Новостей пока нет. Будьте первым, кто опубликует!</p>`;
        }

        news.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.className = 'news-article news-article-dynamic';
            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p class="article-meta">Опубликовано: ${article.date} | Автор: ${article.author}</p>
                <p>${article.content.replace(/\n/g, '<br>')}</p>
                ${loggedInUser === article.author ? `
                <div class="article-actions">
                    <button class="edit-btn" data-id="${article.id}">Редактировать</button>
                    <button class="delete-btn" data-id="${article.id}">Удалить</button>
                </div>
                ` : ''}
            `;
            newsFeedContainer.appendChild(articleElement);
        });

        // Добавляем обработчики для кнопок
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const newsToEdit = news.find(item => item.id == id);
                if (newsToEdit) {
                    openNewsModal(newsToEdit);
                }
            });
        });

        // Новая логика для подтверждения удаления
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const articleElement = e.target.closest('.news-article-dynamic');
                
                // Встраиваем подтверждение прямо в статью
                const confirmationDiv = document.createElement('div');
                confirmationDiv.className = 'delete-confirm';
                confirmationDiv.style.cssText = 'margin-top: 15px; border-top: 1px solid #444; padding-top: 10px;';
                confirmationDiv.innerHTML = `
                    <p style="margin: 0; display: inline-block;">Вы уверены, что хотите удалить эту новость?</p>
                    <button class="auth-button" style="background-color: #F44336; margin-left: 10px;" data-confirm-id="${id}">Да</button>
                    <button class="auth-button" style="background-color: #ffcc00;">Нет</button>
                `;
                articleElement.appendChild(confirmationDiv);

                // Добавляем обработчики для кнопок подтверждения
                confirmationDiv.querySelector('button[data-confirm-id]').addEventListener('click', () => {
                    deleteNews(id);
                });
                confirmationDiv.querySelector('button:not([data-confirm-id])').addEventListener('click', () => {
                    confirmationDiv.remove();
                });

            });
        });
    }

    function deleteNews(id) {
        let news = JSON.parse(localStorage.getItem('news')) || [];
        news = news.filter(item => item.id != id);
        localStorage.setItem('news', JSON.stringify(news));
        renderNews();
        showMessage('Новость удалена!', true);
    }

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
    let balance = parseFloat(localStorage.getItem('tradingBalance')) || 1000;
    balanceDisplay.textContent = balance.toFixed(2);

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

    // Обновляем данные графика с посуточной скоростью
    function updateDailyPrice() {
        // Симулируем изменение цены, подобное биткоину. Цена меняется на случайный процент
        // от текущей цены, а не на фиксированную величину.
        const dailyChange = (Math.random() - 0.5) * 0.1; // Изменение от -5% до +5%
        price += price * dailyChange;
        
        if (price < 0) price = 0;

        data.push(price);
        if (data.length > maxDataPoints) {
            data.shift();
        }
        
        // Обновляем цену каждые 2 секунды, чтобы имитировать "сутки"
        setTimeout(updateDailyPrice, 2000);
    }

    // Игровой цикл для отрисовки (отделен от логики обновления данных)
    function gameLoop() {
        drawChart();
        requestAnimationFrame(gameLoop);
    }
    
    // Функция для проверки результата ставки
    function checkBetResult(startPrice, endPrice, direction, betAmount) {
        let winAmount = 0;
        let result = 'lose';
        let multiplier = 0;

        // Вычисляем процент изменения цены
        const priceChange = endPrice - startPrice;
        const percentageChange = priceChange / startPrice;

        if (direction === 'up' && percentageChange > 0) {
            // Условие выигрыша: цена выросла
            result = 'win';
            // Вычисляем множитель. 1.05 - это 105% от ставки, то есть 5% выигрыша
            multiplier = 1 + percentageChange;
            winAmount = betAmount * multiplier;
        } else if (direction === 'down' && percentageChange < 0) {
            // Условие выигрыша: цена упала
            result = 'win';
            // Множитель: 1.05 + 5% выигрыша
            multiplier = 1 + Math.abs(percentageChange);
            winAmount = betAmount * multiplier;
        } else {
            // Условие проигрыша
            result = 'lose';
        }

        return { result, winAmount, multiplier };
    }

    // Обработчики кнопок ставок
    betUpBtn.addEventListener('click', () => {
        if (betActive) return;
        const betAmount = parseFloat(betAmountInput.value);
        if (balance < betAmount || betAmount <= 0 || isNaN(betAmount)) {
            betResultDisplay.textContent = 'Недостаточно средств или неверная сумма!';
            betResultDisplay.className = 'bet-result-message lose';
            return;
        }

        betActive = true;
        betDirection = 'up';
        balance -= betAmount;
        balanceDisplay.textContent = balance.toFixed(2);
        betResultDisplay.textContent = 'Ставка сделана на "ВВЕРХ"! Ждём результата...';
        betResultDisplay.className = 'bet-result-message';

        const startPrice = price;

        setTimeout(() => {
            const endPrice = price;
            const { result, winAmount, multiplier } = checkBetResult(startPrice, endPrice, betDirection, betAmount);
            if (result === 'win') {
                balance += winAmount;
                betResultDisplay.textContent = `Выигрыш! x${multiplier.toFixed(2)} | +${(winAmount - betAmount).toFixed(2)}$`;
                betResultDisplay.className = 'bet-result-message win';
            } else {
                betResultDisplay.textContent = 'Проигрыш. Попробуйте снова.';
                betResultDisplay.className = 'bet-result-message lose';
            }
            balanceDisplay.textContent = balance.toFixed(2);
            localStorage.setItem('tradingBalance', balance.toFixed(2));
            betActive = false;
        }, 5000); // Результат через 5 секунд
    });

    betDownBtn.addEventListener('click', () => {
        if (betActive) return;
        const betAmount = parseFloat(betAmountInput.value);
        if (balance < betAmount || betAmount <= 0 || isNaN(betAmount)) {
            betResultDisplay.textContent = 'Недостаточно средств или неверная сумма!';
            betResultDisplay.className = 'bet-result-message lose';
            return;
        }

        betActive = true;
        betDirection = 'down';
        balance -= betAmount;
        balanceDisplay.textContent = balance.toFixed(2);
        betResultDisplay.textContent = 'Ставка сделана на "ВНИЗ"! Ждём результата...';
        betResultDisplay.className = 'bet-result-message';

        const startPrice = price;

        setTimeout(() => {
            const endPrice = price;
            const { result, winAmount, multiplier } = checkBetResult(startPrice, endPrice, betDirection, betAmount);
            if (result === 'win') {
                balance += winAmount;
                betResultDisplay.textContent = `Выигрыш! x${multiplier.toFixed(2)} | +${(winAmount - betAmount).toFixed(2)}$`;
                betResultDisplay.className = 'bet-result-message win';
            } else {
                betResultDisplay.textContent = 'Проигрыш. Попробуйте снова.';
                betResultDisplay.className = 'bet-result-message lose';
            }
            balanceDisplay.textContent = balance.toFixed(2);
            localStorage.setItem('tradingBalance', balance.toFixed(2));
            betActive = false;
        }, 5000); // Результат через 5 секунд
    });

    // Запускаем отрисовку новостей
    renderNews();
    
    // Запускаем основной игровой цикл
    gameLoop();
    
    // Запускаем симуляцию посуточной цены
    updateDailyPrice();
});
