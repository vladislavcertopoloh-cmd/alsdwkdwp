document.addEventListener('DOMContentLoaded', () => {
    // Код для бокового меню...
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const publishLink = document.getElementById('publish-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.toggle('active');
        });
    }

    if (publishLink) {
        publishLink.addEventListener('click', (e) => {
            e.preventDefault();
            openNewsModal();
        });
    }

    // Система регистрации и входа
    const authButtons = document.getElementById('auth-buttons');
    const authForms = document.getElementById('auth-forms');
    const userInfo = document.getElementById('user-info');
    const publishNewsBtn = document.getElementById('publish-news-btn');

    const showRegisterFormBtn = document.getElementById('show-register-form-btn');
    const showLoginFormBtn = document = document.getElementById('show-login-form-btn');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const currentUser = document.getElementById('current-user');

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showLoggedInState(loggedInUser);
    }

    if (showRegisterFormBtn) {
        showRegisterFormBtn.addEventListener('click', () => {
            authForms.style.display = 'block';
            registerForm.style.display = 'flex';
            loginForm.style.display = 'none';
        });
    }

    if (showLoginFormBtn) {
        showLoginFormBtn.addEventListener('click', () => {
            authForms.style.display = 'block';
            loginForm.style.display = 'flex';
            registerForm.style.display = 'none';
        });
    }

    // Функция для отображения сообщений на странице вместо alert()
    function showMessage(message, isError = false) {
        const messageDisplay = document.getElementById('bet-result');
        if (messageDisplay) {
            messageDisplay.textContent = message;
            messageDisplay.className = `bet-result-message ${isError ? 'lose' : 'win'}`;
            // Скрываем сообщение через 3 секунды
            setTimeout(() => {
                messageDisplay.textContent = '';
                messageDisplay.className = 'bet-result-message';
            }, 3000);
        } else {
            console.log(message);
        }
    }

    if (registerForm) {
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
    }

    if (loginForm) {
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
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            showLoggedOutState();
        });
    }

    function showLoggedInState(username) {
        if (authButtons) authButtons.style.display = 'none';
        if (authForms) authForms.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        if (currentUser) currentUser.textContent = username;
        localStorage.setItem('loggedInUser', username);
        if (publishNewsBtn) publishNewsBtn.style.display = 'block';
    }

    function showLoggedOutState() {
        if (authButtons) authButtons.style.display = 'flex';
        if (authForms) authForms.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
        if (currentUser) currentUser.textContent = '';
        if (publishNewsBtn) publishNewsBtn.style.display = 'none';
    }

    // Система настроек
    const settingsModal = document.getElementById('settings-modal');
    const settingsLink = document.getElementById('settings-link');
    const closeSettingsModal = document.getElementById('close-settings-modal');
    
    if (settingsLink) {
        settingsLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (settingsModal) settingsModal.style.display = 'block';
        });
    }

    if (closeSettingsModal) {
        closeSettingsModal.addEventListener('click', () => {
            if (settingsModal) settingsModal.style.display = 'none';
        });
    }

    // Система техподдержки
    const supportModal = document.getElementById('support-modal');
    const supportLink = document.getElementById('support-link');
    const closeSupportModal = document.getElementById('close-support-modal');
    const supportForm = document.getElementById('support-form');
    const supportFormContainer = document.getElementById('support-form-container');
    const supportMessageSent = document.getElementById('support-message-sent');

    if (supportLink) {
        supportLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (supportModal) supportModal.style.display = 'block';
            if (supportFormContainer) supportFormContainer.style.display = 'block';
            if (supportMessageSent) supportMessageSent.style.display = 'none';
            const supportMessage = document.getElementById('support-message');
            if (supportMessage) supportMessage.value = '';
        });
    }
    
    if (closeSupportModal) {
        closeSupportModal.addEventListener('click', () => {
            if (supportModal) supportModal.style.display = 'none';
        });
    }
    
    if (supportForm) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (supportFormContainer) supportFormContainer.style.display = 'none';
            if (supportMessageSent) supportMessageSent.style.display = 'block';
            
            setTimeout(() => {
                if (supportModal) supportModal.style.display = 'none';
            }, 3000);
        });
    }

    // Система публикации новостей
    const newsModal = document.getElementById('news-modal');
    const closeNewsModal = document.getElementById('close-news-modal');
    const publishNewsForm = document.getElementById('news-form');
    const newsTitleInput = document.getElementById('news-title');
    const newsContentInput = document.getElementById('news-content');
    const newsIdInput = document.getElementById('news-id');
    const newsFeedContainer = document.getElementById('news-feed-container');

    if (publishNewsBtn) {
        publishNewsBtn.addEventListener('click', () => {
            openNewsModal();
        });
    }

    if (closeNewsModal) {
        closeNewsModal.addEventListener('click', () => {
            if (newsModal) newsModal.style.display = 'none';
        });
    }

    function openNewsModal(article = null) {
        if (article) {
            if (newsTitleInput) newsTitleInput.value = article.title;
            if (newsContentInput) newsContentInput.value = article.content;
            if (newsIdInput) newsIdInput.value = article.id;
            const newsModalTitle = document.getElementById('news-modal-title');
            if (newsModalTitle) newsModalTitle.textContent = 'Редактировать новость';
        } else {
            if (newsTitleInput) newsTitleInput.value = '';
            if (newsContentInput) newsContentInput.value = '';
            if (newsIdInput) newsIdInput.value = '';
            const newsModalTitle = document.getElementById('news-modal-title');
            if (newsModalTitle) newsModalTitle.textContent = 'Опубликовать новость';
        }
        if (newsModal) newsModal.style.display = 'block';
    }

    if (publishNewsForm) {
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
            if (newsModal) newsModal.style.display = 'none';
            renderNews();
        });
    }

    // Единый обработчик для закрытия модальных окон при клике вне их
    window.addEventListener('click', (e) => {
        if (e.target == settingsModal) {
            if (settingsModal) settingsModal.style.display = 'none';
        }
        if (e.target == supportModal) {
            if (supportModal) supportModal.style.display = 'none';
        }
        if (e.target == newsModal) {
            if (newsModal) newsModal.style.display = 'none';
        }
    });

    // Функция для отрисовки новостей на странице
    function renderNews() {
        const news = JSON.parse(localStorage.getItem('news')) || [];
        if (newsFeedContainer) newsFeedContainer.innerHTML = '';
        const loggedInUser = localStorage.getItem('loggedInUser');
        
        if (news.length === 0) {
            if (newsFeedContainer) newsFeedContainer.innerHTML = `<p style="text-align: center; color: #999;">Новостей пока нет. Будьте первым, кто опубликует!</p>`;
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
            if (newsFeedContainer) newsFeedContainer.appendChild(articleElement);
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
                if (articleElement) articleElement.appendChild(confirmationDiv);

                // Добавляем обработчики для кнопок подтверждения
                const confirmButton = confirmationDiv.querySelector('button[data-confirm-id]');
                if (confirmButton) {
                    confirmButton.addEventListener('click', () => {
                        deleteNews(id);
                    });
                }
                const cancelButton = confirmationDiv.querySelector('button:not([data-confirm-id])');
                if (cancelButton) {
                    cancelButton.addEventListener('click', () => {
                        confirmationDiv.remove();
                    });
                }
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
    
    // Запускаем отрисовку новостей
    renderNews();
});
