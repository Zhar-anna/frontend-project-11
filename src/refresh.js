import axios from 'axios';
import {v4 as uuid} from 'uuid';
import makeProxy from './MakeProxy';
import RssParse from './RssParse';
import _ from 'lodash';

export default (watchedState, refreshTime) => {
  const { posts, feeds } = watchedState;
  const promises = feeds.map((feed) => axios.get(makeProxy(feed.url))
    .then((responce) => {
      const { rssPosts } = RssParse(responce.data.contents);
      // есть посты из стейта и есть посты из ответа после парсинга
      const findDif = _.differenceBy(rssPosts, posts, 'guid');
      // сравнить, найти новые
      // новые добавить в стейт
    })
  );


  Promise
  .all(promises)
  .finally(() => setTimeout(() => refresh(watchedState, refreshTime), refreshTime));
};
