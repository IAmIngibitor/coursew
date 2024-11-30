require('dotenv').config()
const express = require('express')
const path = require('path')
const sequelize = require('./db')
const authRoutes = require('./routes/authRoutes')
const topicRoutes = require('./routes/topicRoutes')
const pageRoutes = require('./routes/pageRoutes')
const userRoutes = require('./routes/userRoutes')
const loggingMiddleware = require('./middlewares/loggingMiddleware')
const cookieParser = require('cookie-parser')
const { publishScheduledTopics } = require('./services/schedulerService')
setInterval(publishScheduledTopics, 5 * 60 * 1000)

const app = express()
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggingMiddleware)

app.use('/', pageRoutes)
app.use('/auth', authRoutes)
app.use('/topics', topicRoutes)
app.use('/user', userRoutes)

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'))
}).catch(err => console.error('Ошибка синхронизации с БД:', err))
