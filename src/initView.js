import axios from 'axios';
import _ from 'lodash';
import { object, string, ValidationError, setLocale } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import makeProxy from './MakeProxy';
import xmlparser from './RssParse';


export default (watchedState, elements, i18nextInstance) => {
  const {
      rssForm, feeds, posts
  } = watchedState;
  const {
    form,
    input,
    feedbackElement,
    containerPosts,
    containerFeeds,
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
      .notOneOf(feeds.map(({ url }) => url), 'feedback.includYet'),
    });
    const url = new FormData(e.target).get('url');
    
    schema
    .validate({ url })
    .then(() => axios.get(makeProxy(url)))
    .then((response) => {
      const { rssFeeds, rssPosts } = xmlparser(response.data.contents);
      const feedId = uuidv4();
      feeds.push({ id: feedId, url, ...rssFeeds});
      rssPosts.map(({ title, link }) => {
        const post =  { id: uuidv4(), feedId, title, link };
        posts.push(post);
        return post;
      })
      rssForm.state = 'valid';
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
