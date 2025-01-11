document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram?.WebApp) {
      Telegram.WebApp.ready();
      Telegram.WebApp.BackButton.hide(); // Скрываем кнопку "Назад" на главной странице
    }
  
    // Обработка кликов по категориям
    document.querySelectorAll(".cat_name").forEach((element) => {
      element.addEventListener("click", (event) => {
        const page = event.target.getAttribute("data-page");
        if (page) navigateTo(page);
      });
    });
  
    // Переход на другую страницу
    function navigateTo(page) {
      // Если текущая страница уже загружена, ничего не делаем
      const currentPage = history.state?.page || "index.html";
      if (currentPage === page) return;
  
      // Обновляем URL, но не перезагружаем страницу
      history.pushState({ page }, "", page);
  
      // Загружаем содержимое
      loadPage(page);
  
      // Показываем кнопку "Назад", если это не главная
      if (page !== "index.html" && window.Telegram?.WebApp) {
        Telegram.WebApp.BackButton.show();
      }
    }
  
    // Загрузка содержимого страницы
    function loadPage(page) {
      const content = document.getElementById("content");
      const pages = {
        "index.html": "<h1>Добро пожаловать на главную страницу!</h1>",
        "anonymity.html": "<h1>Анонимность: содержание страницы</h1>",
        "viruses.html": "<h1>Вирусы: содержание страницы</h1>",
        "utilities.html": "<h1>Утилиты: содержание страницы</h1>",
      };
  
      // Если страница существует, загружаем её содержимое
      if (pages[page]) {
        content.innerHTML = pages[page];
      } else {
        content.innerHTML = "<h1>Страница не найдена</h1>";
      }
    }
  
    // Кнопка "Назад" в Telegram
    if (window.Telegram?.WebApp) {
      Telegram.WebApp.BackButton.onClick(() => {
        history.back();
      });
    }
  
    // Обработка событий истории
    window.addEventListener("popstate", (event) => {
      const page = event.state?.page || "index.html";
      loadPage(page);
  
      // Скрываем кнопку "Назад", если это главная страница
      if (page === "index.html" && window.Telegram?.WebApp) {
        Telegram.WebApp.BackButton.hide();
      }
    });
  
    // Загрузка начальной страницы
    const initialPage = location.pathname.split("/").pop() || "index.html";
    history.replaceState({ page: initialPage }, "", initialPage);
    loadPage(initialPage);
  });
  