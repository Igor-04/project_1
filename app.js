document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram?.WebApp) {
      Telegram.WebApp.ready();
      Telegram.WebApp.BackButton.hide(); // Кнопка скрыта на главной странице
    }
  
    const content = document.getElementById("content");
  
    // Страницы и их содержимое
    const pages = {
      index: "<h1>Добро пожаловать на главную страницу!</h1>",
      anonymity: "<h1>Анонимность: содержание страницы</h1>",
      viruses: "<h1>Вирусы: содержание страницы</h1>",
      utilities: "<h1>Утилиты: содержание страницы</h1>",
    };
  
    // Функция для загрузки содержимого страницы
    function loadPage(page) {
      content.innerHTML = pages[page] || "<h1>Страница не найдена</h1>";
  
      if (window.Telegram?.WebApp) {
        if (page === "index") {
          Telegram.WebApp.BackButton.hide(); // Скрыть кнопку "Назад" на главной
        } else {
          Telegram.WebApp.BackButton.show(); // Показать кнопку "Назад" на других страницах
        }
      }
    }
  
    // Переход на другую страницу
    function navigateTo(page) {
      if (!pages[page]) return;
  
      // Проверка, если уже на главной, пропускаем переход
      const currentPage = history.state?.page || "index";
      if (currentPage === page) return;
  
      // Обновляем содержимое
      loadPage(page);
  
      // Добавляем состояние в историю
      history.pushState({ page }, "", `#${page}`);
    }
  
    // Обработка кнопки "Назад"
    if (window.Telegram?.WebApp) {
      Telegram.WebApp.BackButton.onClick(() => {
        history.back();
      });
    }
  
    // Обработка события "popstate"
    window.addEventListener("popstate", (event) => {
      const page = event.state?.page || "index";
      loadPage(page);
    });
  
    // Обработка кликов по меню
    document.querySelectorAll(".cat_name").forEach((element) => {
      element.addEventListener("click", (event) => {
        const page = event.target.getAttribute("data-page");
        navigateTo(page);
      });
    });
  
    // Загрузка главной страницы по умолчанию
    const initialPage = location.hash.replace("#", "") || "index";
    loadPage(initialPage);
    history.replaceState({ page: initialPage }, "", `#${initialPage}`);
  });
  