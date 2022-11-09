import { ValidationError } from 'webpack';
import { object, string } from 'yup';

export default (watchedState, elements, i18nextInstance) => {
    const {
        rssForm, feeds, posts
    } = watchedState;
    const {
        form,
        input,
        feedbackElement,
    } = elements;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const schema = object({
          url: string()
          .url()
          .nullable()
          .notOneOf((feeds), i18nextInstance.t('feedback.includYet')),
      });
      const url = new FormData(e.target).get('url');
      schema
      .validate({ url })
      .then()
      .then(() => {
        rssForm.state = 'valid';
        feeds.push(url);
        console.log(feeds);
      })
      .catch((error) => {
        rssForm.state = 'invalid';
        if (error instanceof ValidationError) {
          rssForm.feedback = [...error.errors];
        }
      })
      });
      rssForm.state = 'ready';
};
