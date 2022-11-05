
import { object, string, number, date, InferType } from 'yup';
import watchedState from './view.js';
// import 'bootstrap';

// состояние и обработчики
const init = () => {
//   const state = {
//     rssForm: {
//         state: 'valid',
//         errors: {
//           exist: 'Rss уже существует',
//           required: 'Не должно быть пустым',
//           notUrl: 'Ссылка должна быть валидным URL',
//           noRss: 'Ресурс не содержит валидный RSS',
//         },
//     },
//     feeds: [],
//     posts: [],
//   };
//   const rssform = document.querySelector('.rss-form input');
//   const submit = document.querySelector('.rss-form button[type="submit"]');
//   // const schema = yup.object().shape({
//   //   website: string().url().notOneOf([ /*массив добавленых фидов */]),
//   // });
//   // const validate = (url) => {
//   //   try {
//   //     schema.validateSync(url, { abortEarly: false });
//   //     return {};
//   //   } catch (e) {
//   //     return keyBy(e.inner, 'path');
//   //   }
//   // }; асинхронно, промисы
  
//   rssform.addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log('aaaaaaaaa');
//   //   const url = e.targer.value;
//   // // валидация, если прошла, статус - валид
//   // watchedState.state = 'valid';
//   // watchedState.errors = [];
//   // // если валидация не прошла
//   // watchedState.state = 'invalid';
//   // watchedState.errors.push('Ссылка должна быть валидным RSS');

//   })
};

export default init;