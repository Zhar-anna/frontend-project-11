import onChange from 'on-change';
// работа  с ДОМ и отрисовка
// Можно, например, написать отдельные функции рендера и вызывать их в обработчиках onChange. Если я правильно понял, то onChange у вас вызывается как раз в функции rssForm. И хранить всё это в одном модуле. То есть получится, что у вас будет отдельный модуль с функциями рендера и функцией, которая навешивает слушателей на стейт (onChange) - эта функция будет экспортироваться и она будет возвращать watchedState. Всё вместе этот модуль будет слоем View
// Все асинхронные операции внутри библиотеки должны быть построенны на промисах.
// Используйте асинхронную валидацию yup.
const watchedState = onChange(state, (path, value) => {
    if (path === 'registrationForm.state') {
        if (value === 'invalid') {
            // из массива достаем нужную ошибку и русуем <p>с ошибкой</p>
        }
    }

});