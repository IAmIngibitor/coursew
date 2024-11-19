const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/actions.log');

if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

module.exports = (req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - IP: ${req.ip} - User-Agent: ${req.headers['user-agent']}\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) console.error('Ошибка записи в лог:', err);
    });

    next();
}