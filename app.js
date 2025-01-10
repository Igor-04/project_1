document.addEventListener("DOMContentLoaded", () => {
    if (window.Telegram?.WebApp) {
      // Инициализируем WebApp
      Telegram.WebApp.ready();
  
      // Устанавливаем цвета темы
      const setThemeColors = (themeParams) => {
        document.body.style.color = "var(--tg-theme-text-color)";
        document.body.style.backgroundColor = "var(--tg-theme-bg-color)";
      };
      setThemeColors(Telegram.WebApp.themeParams);
  
      // Обновляем тему при изменении
      Telegram.WebApp.onEvent("themeChanged", () => {
        setThemeColors(Telegram.WebApp.themeParams);
      });
    } else {
      console.error("Telegram Web App API не доступен.");
    }
  
    // Управление переходами
    document.querySelectorAll(".cat_name").forEach((element) => {
      element.addEventListener("click", (event) => {
        const page = event.target.getAttribute("data-page");
        if (page) {
          navigateTo(page);
        }
      });
    });
  
    // Показываем кнопку "Назад" только не на главной странице
    if (window.location.pathname !== "/index.html" && window.Telegram?.WebApp) {
      Telegram.WebApp.BackButton.show();
      Telegram.WebApp.BackButton.onClick(() => {
        window.history.back();
      });
    } else if (window.Telegram?.WebApp) {
      Telegram.WebApp.BackButton.hide();
    }
  });
  
  // Переход на новую страницу
  function navigateTo(page) {
    history.pushState({ page }, "", page); // Добавляем страницу в историю
    window.location.href = page; // Перенаправляем на новую страницу
  }
  
  // Обработка возврата на предыдущую страницу
  window.addEventListener("popstate", () => {
    if (window.location.pathname === "/index.html" && window.Telegram?.WebApp) {
      Telegram.WebApp.BackButton.hide(); // Скрываем кнопку "Назад" на главной странице
    } else if (window.Telegram?.WebApp) {
      Telegram.WebApp.BackButton.show(); // Показываем кнопку "Назад" на других страницах
    }
  });
  