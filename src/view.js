import onChange from 'on-change';

const rssform = document.querySelector('#url-input');
const feedback = document.querySelector('.feedback');
const watchedState = onChange(state, (path, value) => {
    if (path === 'rssForm.state') {
        if (value === 'invalid') {
            // из массива достаем нужную ошибку и русуем <p>с ошибкой</p>
            feedback.textContent = `${error}`;
            rssform.classList.add('form-control', 'w-100', 'is-invalid');
        }
        if (value === 'valid') {
            rssform.reset();
            rssform.focus();
        }
    }

});

export default watchedState;
