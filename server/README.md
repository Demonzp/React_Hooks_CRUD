# SERVER

Функционал CRUD на Node.js + MySQL с применением ORM (Sequelize).
Проект учебный, структурирование кода не выполнено преднамеренно.

1.  Запустить MySQL (8.x+).

2.  Если Ваши имя пользователя и пароль к серверу отличны от значений по умолчанию, то не забудьте добавить в код
    актуальные (app.js -> строки 19, 20, 28 -> вместо 'root' вписываем имя, в пустых кавычках '' вписываем пароль).

3.  В терминале редактора кода или командной строке (предварительно перейдя в каталог с проектом) прописать:
   
        3.1. npm install - установка модулей, необходимых для функционирования программы;
        3.2. npm start - запуск кода, автоматическое создание БД и её заполнение заготовками.

4. Пути для POSTMAN:

        http://localhost:5000/products/ - ПОЛУЧЕНИЕ (GET) списка продуктов по запросу.
        http://localhost:5000/products/update - ДОБАВЛЕНИЕ (POST) в список новых продуктов.
        http://localhost:5000/products/edit/:id - РЕДАКТИРОВАНИЕ (PUT) информации в массиве по ID.
        http://localhost:5000/products/delete/:id - УДАЛЕНИЕ (DELETE) информации в массиве по ID.

При добавлении и изменении информации в настройках POSTMAN указывать формат JSON.

P.S. После первого запуска сервера закомментируйте в коде раздел SEEDS, иначе шаблонные заготовки будут добавляться
в таблицу при каждом рестарте.