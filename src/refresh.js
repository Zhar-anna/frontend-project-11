import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import makeProxy from './MakeProxy';
import RssParse from './RssParse';
import _ from 'lodash';

const refresh = (watchedState, refreshTime) => {
  const { posts, feeds } = watchedState;
  const promises = feeds.map((feed) => axios.get(makeProxy(feed.url))
    .then((responce) => {
      const { rssPosts } = RssParse(responce.data.contents);
      // есть посты из стейта и есть посты из ответа после парсинга
      // сравнить, найти новые
      const findDiff = _.differenceBy(rssPosts, posts, 'guid');
      console.log(findDiff);
      if (!_.isEmpty(findDiff)) {
      // новые добавить в стейт
        posts.push(findDiff.map(({ title, link }) => {
          const newPost = {
          id: uuidv4(), feedId: feed.id, title, link, visited: false,
          }
          return newPost;
        }));
      }
    }));
  Promise
    .all(promises)
    .finally(() => setTimeout(() => refresh(watchedState, refreshTime), refreshTime));
};

export default refresh;
