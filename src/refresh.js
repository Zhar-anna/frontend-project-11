import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import makeProxy from './MakeProxy';
import RssParse from './RssParse';

const refresh = (watchedState, refreshTime) => {
  const { posts, feeds } = watchedState;
  const promises = feeds.map((feed) => axios.get(makeProxy(feed.url))
    .then((response) => {
      const { rssPosts } = RssParse(response.data.contents);
      const findDiff = _.differenceBy(rssPosts, posts, 'guid');
      // console.log(findDiff);
      // console.log(post.map((p) => console.log(p)));
      if (!_.isEmpty(findDiff)) {
        const newPush = findDiff.map(({
          title, link, description, guid,
        }) => {
          const newPost = {
            id: uuidv4(), feedId: feed.id, title, link, description, guid, visited: false,
          };
          return newPost;
        });
        posts.push(...newPush);
      }
    }));
  Promise
    .all(promises)
    .finally(() => setTimeout(() => refresh(watchedState, refreshTime), refreshTime));
};

export default refresh;
