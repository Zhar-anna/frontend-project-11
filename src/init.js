import { object, string } from 'yup';
import onChange from 'on-change';
// import watchedState from './view.js';


const init = () => {
  const state = {
    rssForm: {
        state: 'ready',
        errors: {
          exist: 'Rss уже существует',
          expect: 'Rss успешно добавлены',
          required: 'Не должно быть пустым',
          notUrl: 'Ссылка должна быть валидным URL',
          noRss: 'Ресурс не содержит валидный RSS',
        },
    },
    feeds: [],
    posts: [],
  };
// состояние и обработчики
  const rssform = document.querySelector('.rss-form');
  const input = document.getElementById('url-input');
  const feedbackElement = document.querySelector('.feedback');
    const watchedState = onChange(state, (path, value) => {
      console.log(path);
        if (path === 'rssForm.state') {
            input.classList.remove('is-invalid');
            feedbackElement.classList.remove('text-success', 'text-danger');
          if (value === 'invalid') {
            input.classList.add('form-control', 'w-100', 'is-invalid');
            feedbackElement.classList.add('text-danger');
            feedbackElement.textContent = 'Ссылка должна быть валидным URL';
          } else if (value === 'valid') {
            feedbackElement.classList.add('text-success');
            feedbackElement.textContent = 'Rss успешно добавлены';
            rssform.reset();
            rssform.focus();
          }
        }
      });

  rssform.addEventListener('submit', (e) => {
    e.preventDefault();
    const schema = object({
      url: string()
      .url()
      .nullable()
      .notOneOf(state.feeds.map(({ url }) => url), 'state.rssform.errors.exist'),
  });
  const url = new FormData(e.target).get('url');
  schema
  .validate({ url })
  .then(() => {
    watchedState.rssForm.state = 'valid';
  })
  .catch(() => {
    watchedState.rssForm.state = 'invalid';
  })
  });
};

export default init;