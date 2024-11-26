require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const pageRoutes = require('./routes/pageRoutes');
const userRoutes = require('./routes/userRoutes')
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware для парсинга
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Логирование запросов
app.use(loggingMiddleware);

// Маршруты
app.use('/', pageRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// Запуск сервера и синхронизация базы данных
sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Секвер запущен на http://localhost:3000'));
}).catch(err => console.error('Ошибка синхронизации с БД:', err));
