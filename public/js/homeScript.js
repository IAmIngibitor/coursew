function adjustTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

function updateCharCounter(textarea) {
    const maxlength = textarea.getAttribute('maxlength');
    const currentLength = textarea.value.length;
    const counter = document.getElementById('char-counter');
    counter.textContent = `${currentLength}/1000`
}

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('content')
    if (textarea) {
        textarea.addEventListener('input', function () {
            adjustTextarea(textarea)
            updateCharCounter(textarea)
        })
    adjustTextarea(textarea)
    updateCharCounter(textarea)
    }
})