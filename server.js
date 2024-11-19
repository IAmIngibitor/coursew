const express = require('express');
const cookies = require("cookie-parser")
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
dotenv.config();
const sequelize = require('./db');
const logging = require('./middlewares/logging');
const User = require('./models/user');
const Post = require('./models/post');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded());
app.use(logging);
app.set("view engine", "ejs")
app.use(cookies())


const PORT = process.env.PORT || 3000;

app.use(require('./routes/authRoutes'));
app.use(require('./routes/postRoutes'));
app.use(require('./routes/userRoutes'));

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
}).catch(err => {
    console.error('Ошибка при синхронизации базы данных:', err);
});
    
