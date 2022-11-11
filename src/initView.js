import { object, string, ValidationError, setLocale } from 'yup';
import _ from 'lodash';
import axios from 'axios';
import makeProxy from './MakeProxy';

export default (watchedState, elements, i18nextInstance) => {
    const {
        rssForm, feeds, posts
    } = watchedState;
    const {
        form,
        input,
        feedbackElement,
    } = elements;
    setLocale({
      mixed: {
        default: 'field_invalid',
        required: 'field_required',
      },
      string: {
          url: 'feedback.notUrl',
        }
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const schema = object({
          url: string()
          .url()
          .nullable()
          .notOneOf((feeds), 'feedback.includYet'),
      });
      const url = new FormData(e.target).get('url');

      schema
      .validate({ url })
      .then(() => axios.get(makeProxy(url)))
      .then((response) => {

      })
      .then(() => {
        rssForm.state = 'valid';
        feeds.push(url);
        console.log(feeds);
        rssForm.feedback = ['feedback.isValid'];
      })
      .catch((error) => {
        rssForm.state = 'invalid';
        if (error instanceof ValidationError) {
          rssForm.feedback = [...error.errors];
        } else if (error instanceof TypeError) {
          rssForm.feedback = ['feedback.notRss'];
        } else if (error.message === 'Network Error') {
          rssForm.feedback = ['netWorkError'];
        } else {
          rssForm.feedback = [error.message];
        }
      })
      });
      rssForm.state = 'ready';
};
