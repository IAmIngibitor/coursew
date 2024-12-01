const ftp = require('ftp')

const FTP_CONFIG = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD
}

const getFtp = () => {
    const client = new ftp()
    client.connect(FTP_CONFIG)

    return new Promise((resolve, reject) => {
        client.on('ready', () => resolve(client))
        client.on('error', (err) => {
            console.error('Ошибка подключения к FTP:', err)
            reject(err)
        })
    })
}

module.exports = { getFtp }
