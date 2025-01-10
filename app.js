document.addEventListener("DOMContentLoaded", () => {
    const isTelegramAvailable = window.Telegram?.WebApp;
    const webApp = isTelegramAvailable ? window.Telegram.WebApp : null;
  
    if (isTelegramAvailable) {
      // Инициализируем WebApp
      webApp.ready();
  
      // Устанавливаем начальные цвета темы
      const setThemeColors = (themeParams) => {
        document.body.style.color = "var(--tg-theme-text-color)";
        document.body.style.backgroundColor = "var(--tg-theme-bg-color)";
      };
      setThemeColors(webApp.themeParams);
  
      // Обновляем тему при изменении
      webApp.onEvent("themeChanged", () => {
        setThemeColors(webApp.themeParams);
      });
  
      // Настраиваем кнопку "Назад"
      updateBackButtonState();
  
      // Добавляем обработчик на события возврата
      window.addEventListener("popstate", () => {
        updateBackButtonState();
      });
    } else {
      console.error("Telegram Web App API не доступен.");
    }
  
    // Обработчик клика на ссылки
    document.querySelectorAll(".cat_name").forEach((element) => {
      element.addEventListener("click", (event) => {
        const page = event.target.getAttribute("data-page");
        if (page) {
          navigateTo(page);
        }
      });
    });
  });
  
  // Функция для перехода на другую страницу
  function navigateTo(page) {
    history.pushState({ page }, "", page);
    window.location.href = page;
  }
  
  // Обновление состояния кнопки "Назад"
  function updateBackButtonState() {
    const webApp = window.Telegram.WebApp;
    const currentPath = window.location.pathname.split("/").pop();
  
    if (currentPath === "index.html" || currentPath === "") {
      webApp.BackButton.hide(); // Главная страница: скрываем кнопку "Назад"
      webApp.MainButton.show(); // Показываем кнопку "Закрыть"
      webApp.MainButton.text = "Закрыть";
      webApp.MainButton.onClick(() => {
        webApp.close(); // Закрыть мини-приложение
      });
    } else {
      webApp.BackButton.show(); // Другие страницы: показываем кнопку "Назад"
      webApp.MainButton.hide(); // Скрываем кнопку "Закрыть"
      webApp.BackButton.onClick(() => {
        window.history.back(); // Возврат на предыдущую страницу
      });
    }
  }
  