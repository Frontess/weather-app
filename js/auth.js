// Функция для аутентификации пользователя на сервере
async function authenticateUser(username, password) {
  try {
    // Отправляем POST-запрос на API для входа
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1", // Пример ключа API, возможно, потребуется заменить
      },
      body: JSON.stringify({
        email: username, // Используем email для reqres.in API
        password: password,
      }),
    });

    // Проверяем статус ответа
    if (!response.ok) {
      // Если ответ не успешный (например, 400, 401, 500)
      alert("Ошибка сервера: " + response.status); // Показываем ошибку сервера
      return null; // Возвращаем null в случае ошибки
    }

    // Парсим JSON-ответ от сервера
    return await response.json();
  } catch (error) {
    // Обрабатываем ошибки сети или другие исключения
    console.error("Ошибка:", error); // Выводим ошибку в консоль для отладки
    alert("Ошибка сети! Проверьте подключение."); // Показываем сообщение об ошибке сети пользователю
    return null; // Возвращаем null в случае ошибки
  }
}

// Функция для обработки процесса входа
async function handleLogin() {
  // Получаем элементы по их ID
  const usernameInput = document.getElementById("username"); // Поле ввода логина/email
  const passwordInput = document.getElementById("password"); // Поле ввода пароля

  // Проверяем, найдены ли элементы
  if (!usernameInput || !passwordInput) {
    console.error("Элементы формы (username или password) не найдены в DOM."); // Сообщаем об ошибке в консоль
    return; // Прекращаем выполнение функции
  }

  // Получаем значения из полей ввода и удаляем пробелы по краям
  const username = usernameInput.value.trim(); // Значение логина/email
  const password = passwordInput.value.trim(); // Значение пароля

  // Проверяем, заполнены ли поля
  if (!username || !password) {
    alert("Пожалуйста, заполните все поля!"); // Просим пользователя заполнить все поля
    return; // Прекращаем выполнение функции
  }

  // Вызываем функцию аутентификации
  const data = await authenticateUser(username, password);

  // Проверяем ответ от сервера
  if (data?.token) {
    // Если получен токен (успешная авторизация)
    localStorage.setItem("authToken", data.token); // Сохраняем токен в локальное хранилище
    window.location.href = "weather.html"; // Перенаправляем пользователя на другую страницу
  } else {
    // Если токен не получен (ошибка авторизации)
    alert("Ошибка авторизации! Проверьте логин и пароль."); // Сообщаем об ошибке авторизации
  }
}

// Ждем полной загрузки DOM перед привязкой обработчика события
document.addEventListener("DOMContentLoaded", () => {
  // Находим кнопку входа по ее ID
  const loginButton = document.getElementById("loginButton"); // Убедитесь, что у вашей кнопки есть ID "loginButton"

  // Проверяем, найдена ли кнопка
  if (loginButton) {
    // Если кнопка найдена, добавляем обработчик события 'click'
    // При клике на кнопку будет вызвана функция handleLogin
    loginButton.addEventListener("click", handleLogin);
  } else {
    // Если кнопка не найдена, выводим ошибку в консоль
    console.error("Кнопка входа с ID 'loginButton' не найдена в DOM.");
  }
});
