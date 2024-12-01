const fs = require('fs')
const { getFtp } = require('../config/ftp')
const User = require('../models/user')

exports.uploadToFtp = async (file, userId) => {
    const client = await getFtp()
    const remotePath = `/htdocs/${userId}_${file.originalname}`.toLowerCase()
    const publicUrl = `${process.env.FTP_BASE_URL}/${userId}_${file.originalname}`.toLowerCase()
    console.log(`Начало загрузки файла: ${file.path} -> ${remotePath}`)
    console.log(``)


    return new Promise((resolve, reject) => {
        client.put(file.path, remotePath, (err) => {
            if (err) {
                console.error('Ошибка загрузки на FTP:', err)
                return reject(err)
            }

            console.log(`Файл успешно загружен: ${remotePath}`)
            fs.unlinkSync(file.path)
            client.end()
            resolve(publicUrl)
        })
    })
}

exports.saveAvatarUrl = async (userId, avatarUrl) => {
    const user = await User.findByPk(userId)
    if(!user) {
        throw new Error('Пользователь не найден')
    }
    user.avatarUrl = avatarUrl
    await user.save()
}
