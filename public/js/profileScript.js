document.getElementById('avatarForm').addEventListener('submit', function (event) {
    const fileInput = document.getElementById('avatar')
    const file = fileInput.files[0]

    
    if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5 МБ')
        event.preventDefault();
        return
    }

    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = function () {
        if (img.width > 300 || img.height > 300) {
            alert('Размер изображения не должен превышать 300х300 пикселей')
            event.preventDefault();
            return
        } else {
            document.getElementById('avatarForm').submit()
        }
        URL.revokeObjectURL(img.src)
    }
    event.preventDefault()
})
