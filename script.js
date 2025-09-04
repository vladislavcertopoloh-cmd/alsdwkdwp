document.addEventListener('DOMContentLoaded', () => {
    // --- Управление боковым меню ---
    const menuButton = document.querySelector('.menu-button');
    const sideMenu = document.querySelector('.side-menu');
    
    if (menuButton && sideMenu) {
        menuButton.addEventListener('click', () => {
            sideMenu.classList.toggle('active');
        });
    }

    // --- Управление модальными окнами ---
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === sideMenu || (sideMenu && sideMenu.contains(e.target))) {
            return;
        }

        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // --- Система регистрации и входа ---
    const authForms = document.getElementById('auth-forms');
    const showRegisterFormBtn = document.getElementById('show-register-form-btn');
    const showLoginFormBtn = document.getElementById('show-login-form-btn');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    const logoutBtn = document.getElementById('logout-btn');
    const currentUser = document.getElementById('current-user');
    const publishNewsBtn = document.getElementById('publish-news-btn');

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showLoggedInState(loggedInUser);
    }

    if (showRegisterFormBtn) {
        showRegisterFormBtn.addEventListener('click', () => {
            authForms.style.display = 'flex';
            registerForm.style.display = 'flex';
            loginForm.style.display = 'none';
        });
    }

    if (showLoginFormBtn) {
        showLoginFormBtn.addEventListener('click', () => {
            authForms.style.display = 'flex';
            loginForm.style.display = 'flex';
            registerForm.style.display = 'none';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value;
            const password = document.getElementById('reg-password').value;
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username]) {
                console.error('Пользователь с таким именем уже существует!');
                return;
            }
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            console.log('Регистрация прошла успешно!');
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
                console.log('Вход выполнен!');
                showLoggedInState(username);
            } else {
                console.error('Неверное имя пользователя или пароль.');
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
    }

    function showLoggedOutState() {
        if (authButtons) authButtons.style.display = 'flex';
        if (authForms) authForms.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
        if (currentUser) currentUser.textContent = '';
        localStorage.removeItem('loggedInUser');
        window.location.reload(); // Перезагружаем страницу для обновления состояния
    }

    // --- Система публикации новостей ---
    const newsModal = document.getElementById('news-modal');
    const newsForm = document.getElementById('news-form');
    const newsTitleInput = document.getElementById('news-title');
    const newsContentInput = document.getElementById('news-content');
    const newsIdInput = document.getElementById('news-id');
    const newsFeedContainer = document.getElementById('news-feed-container');

    if (publishNewsBtn) {
        publishNewsBtn.addEventListener('click', () => {
            openNewsModal();
        });
    }

    function openNewsModal(article = null) {
        if (article) {
            newsTitleInput.value = article.title;
            newsContentInput.value = article.content;
            newsIdInput.value = article.id;
            document.getElementById('news-modal-title').textContent = 'Edit Post';
        } else {
            newsTitleInput.value = '';
            newsContentInput.value = '';
            newsIdInput.value = '';
            document.getElementById('news-modal-title').textContent = 'Create a New Post';
        }
        newsModal.style.display = 'flex';
    }

    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newsId = newsIdInput.value;
            const title = newsTitleInput.value;
            const content = newsContentInput.value;
            const author = localStorage.getItem('loggedInUser') || 'Anonymous';
            const news = JSON.parse(localStorage.getItem('news')) || [];

            if (newsId) {
                const articleIndex = news.findIndex(item => item.id == newsId);
                if (articleIndex !== -1) {
                    news[articleIndex].title = title;
                    news[articleIndex].content = content;
                    news[articleIndex].date = new Date().toLocaleDateString('en-US');
                }
            } else {
                const newArticle = {
                    id: Date.now(),
                    title,
                    content,
                    author,
                    date: new Date().toLocaleDateString('en-US')
                };
                news.unshift(newArticle);
            }
            
            localStorage.setItem('news', JSON.stringify(news));
            newsModal.style.display = 'none';
            renderNews();
        });
    }

    function loadInitialNews() {
        if (!localStorage.getItem('news')) {
            const initialNews = [
                {
                    id: 1,
                    title: "Crypto Market Sees Volatility After Major Exchange Announcement",
                    content: "The cryptocurrency market experienced a significant shake-up following a major announcement from a leading exchange. Bitcoin and Ethereum prices saw sharp fluctuations, while altcoins are showing mixed signals. Analysts are advising caution as market sentiment remains uncertain.",
                    author: "Crypto Analyst",
                    date: "09/04/2025"
                },
                {
                    id: 2,
                    title: "DeFi Protocol Announces Successful Security Audit",
                    content: "A prominent decentralized finance (DeFi) protocol has successfully completed its third-party security audit, boosting investor confidence. The protocol's native token surged by 15% within hours of the announcement, signaling renewed interest in secure DeFi projects.",
                    author: "Financial News",
                    date: "09/03/2025"
                },
                {
                    id: 3,
                    title: "NFT Sales Surge as New Digital Art Collection Launches",
                    content: "The non-fungible token (NFT) market is buzzing with excitement after a new digital art collection launched to record-breaking sales. The collection, which features unique generative art pieces, sold out in minutes, fetching millions in total revenue and attracting a wave of new collectors.",
                    author: "Tech Reporter",
                    date: "09/02/2025"
                }
            ];
            localStorage.setItem('news', JSON.stringify(initialNews));
        }
    }

    function renderNews() {
        const news = JSON.parse(localStorage.getItem('news')) || [];
        if (newsFeedContainer) newsFeedContainer.innerHTML = '';
        const loggedInUser = localStorage.getItem('loggedInUser');
        
        if (news.length === 0) {
            if (newsFeedContainer) newsFeedContainer.innerHTML = `<p style="text-align: center; color: #a0a0a0;">Новостей пока нет. Будьте первым, кто опубликует!</p>`;
        }

        news.forEach(article => {
            const articleElement = document.createElement('article');
            articleElement.className = 'news-article';
            articleElement.innerHTML = `
                <h2>${article.title}</h2>
                <p class="article-meta">Published: ${article.date} | Author: ${article.author}</p>
                <p>${article.content.replace(/\n/g, '<br>')}</p>
                ${loggedInUser === article.author ? `
                <div class="article-actions">
                    <button class="edit-btn" data-id="${article.id}">Edit</button>
                    <button class="delete-btn" data-id="${article.id}">Delete</button>
                </div>
                ` : ''}
            `;
            if (newsFeedContainer) newsFeedContainer.appendChild(articleElement);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const newsToEdit = news.find(item => item.id == id);
                if (newsToEdit) {
                    openNewsModal(newsToEdit);
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const articleElement = e.target.closest('.news-article');
                
                // Встраиваем подтверждение прямо в статью
                const confirmationDiv = document.createElement('div');
                confirmationDiv.className = 'delete-confirm';
                confirmationDiv.style.cssText = 'margin-top: 15px; border-top: 1px solid #5a451e; padding-top: 10px;';
                confirmationDiv.innerHTML = `
                    <p style="margin: 0; display: inline-block;">Вы уверены, что хотите удалить эту новость?</p>
                    <button class="auth-button" style="background-color: #F44336; margin-left: 10px;">Да</button>
                    <button class="auth-button" style="background-color: #444; color: #f0f0f0;">Нет</button>
                `;
                if (articleElement) articleElement.appendChild(confirmationDiv);

                const confirmButton = confirmationDiv.querySelector('button:first-child');
                if (confirmButton) {
                    confirmButton.addEventListener('click', () => {
                        deleteNews(id);
                    });
                }
                const cancelButton = confirmationDiv.querySelector('button:last-child');
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
        console.log('Новость удалена!');
    }
    
    // --- Запуск приложения ---
    loadInitialNews();
    renderNews();
});
