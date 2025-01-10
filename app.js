document.addEventListener("DOMContentLoaded", () => {
    const isTelegramAvailable = window.Telegram?.WebApp;
    const webApp = isTelegramAvailable ? window.Telegram.WebApp : null;
  
    if (isTelegramAvailable) {
      // Инициализируем WebApp
      webApp.ready();
  
      // Устанавливаем цвета темы
      const setThemeColors = (themeParams) => {
        document.body.style.color = "var(--tg-theme-text-color)";
        document.body.style.backgroundColor = "var(--tg-theme-bg-color)";
      };
      setThemeColors(webApp.themeParams);
  
      // Обновляем тему при изменении
      webApp.onEvent("themeChanged", () => {
        setThemeColors(webApp.themeParams);
      });
    } else {
      console.error("Telegram Web App API не доступен.");
    }
  
    // Добавляем обработчик на все элементы с классом "cat_name"
    document.querySelectorAll(".cat_name").forEach((element) => {
      element.addEventListener("click", (event) => {
        const page = event.target.getAttribute("data-page");
        if (page) {
          navigateTo(page);
        }
      });
    });
  
    // Показываем кнопку "Назад" только на страницах, кроме index.html
    const currentPath = window.location.pathname.split("/").pop();
    if (currentPath !== "index.html" && webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(() => {
        window.history.back();
      });
    } else if (webApp) {
      webApp.BackButton.hide();
    }
  
    // Обработка возврата
    window.addEventListener("popstate", () => {
      const path = window.location.pathname.split("/").pop();
      if (path === "index.html" && webApp) {
        webApp.BackButton.hide(); // Скрываем кнопку "Назад" на главной странице
      } else if (webApp) {
        webApp.BackButton.show(); // Показываем кнопку "Назад" на других страницах
      }
    });
  });
  
  // Функция для перехода на другую страницу
  function navigateTo(page) {
    // Добавляем запись в историю браузера
    history.pushState({ page }, "", page);
    // Загружаем новую страницу
    window.location.href = page;
  }
  