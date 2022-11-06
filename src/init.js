import * as yup from 'yup';
import onChange from 'on-change';
// import watchedState from './view.js';

const state = {
    rssForm: {
        state: 'valid',
        errors: {
          exist: 'Rss уже существует',
          required: 'Не должно быть пустым',
          notUrl: 'Ссылка должна быть валидным URL',
          noRss: 'Ресурс не содержит валидный RSS',
        },
    },
    feeds: [],
    posts: [],
  };
// состояние и обработчики
const init = () => {
    const watchedState = onChange(state, (path, value) => {
        if (path === 'rssForm.state') {
            rssform.classList.remove('form-control', 'w-100', 'is-invalid');
            feedbackElement.classList.remove('text-success', 'text-danger');
          if (value === 'invalid') {
            rssform.classList.add('form-control', 'w-100', 'is-invalid');
            feedback.classList.add('text-danger');
            feedback.textContent = `${state.rssform.errors.notUrl}`;
            
          } else if (value === 'valid') {
            feedback.classList.add('text-sucess');
            rssform.reset();
            rssform.focus();
          }
        }
      });
  const rssform = document.querySelector('.rss-form');
//   const submit = document.querySelector('.rss-form button[type="submit"]');
const schema = object({
    url: yup.string().url().nullable().notOneOf(state.feeds.map(({url}) => url), 'state.rssform.errors.exist')
})
  const validate = (url) => {
    let validUrl;
  //  На выходе мы получаем либо объект прошедший валидацию, либо будет выброшено исключение (в случае, если были обнаружены ошибки)
      schema.validate(url)
      .then((data) => {
        validUrl = data;
        return Promise.reject(new Error('Ссылка должна быть валидным URL'));
      })
      .catch((error) => {
        watchedState.value = 'invalid';
      })
  //     return {};
  //   } catch (e) {
  //     return keyBy(e.inner, 'path');
  //   }
  return validUrl;
  };
  
  rssform.addEventListener('submit', (e) => {
    e.preventDefault();
    const t = new FormData(e.target).get('url');
    console.log(validate(t));
    if (validate(t)) {
        watchedState.value = 'valid';
        // в фиды добавить фид state.rssform.feeds.push()
    } else {
      watchedState.value = 'invalid';
    }
  });
};

export default init;