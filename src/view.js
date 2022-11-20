import _ from 'lodash';
import onChange from 'on-change';

export default (state, elements, i18nextInstance) => onChange(state, (path, value) => {
  const {
    form,
    input,
    feedbackElement,
    containerPosts,
    containerFeeds,
    modalDiv,
    closaModal,
  } = elements;

  if (path === 'rssForm.state') {
    input.classList.remove('is-invalid');
    feedbackElement.classList.remove('text-success', 'text-danger');
    if (value === 'invalid') {
      input.classList.add('form-control', 'w-100', 'is-invalid');
      feedbackElement.classList.add('text-danger');
    } else if (value === 'valid') {
      feedbackElement.classList.add('text-success');
      form.reset();
      form.focus();
    }
  }

  if (path === 'rssForm.feedback') {
    feedbackElement.textContent = value.map((message) => i18nextInstance.t(message)).join(',');
  }

  if (path === 'feeds') {
    containerFeeds.innerHTML = '';
    const cardBorder = document.createElement('div');
    cardBorder.classList.add('card', 'border-0');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBorder.prepend(cardBody);
    const feedsHead = document.createElement('h2');
    feedsHead.classList.add('card-title', 'h4');
    feedsHead.textContent = i18nextInstance.t('feeds.header');
    cardBody.prepend(feedsHead);
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    state.feeds.map((feed) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'border-0', 'border-end-0');
      const h3 = document.createElement('h3');
      h3.classList.add('h6', 'm-0');
      h3.textContent = feed.title;
      li.prepend(h3);
      const p = document.createElement('p');
      p.classList.add('m-0', 'small', 'text-black-50');
      p.textContent = feed.description;
      li.append(p);
      ul.prepend(li);
      return li;
    });
    cardBorder.append(ul);
    containerFeeds.append(cardBorder);
  }

  if (path === 'posts') {
    containerPosts.innerHTML = '';
    const cardBorder = document.createElement('div');
    cardBorder.classList.add('card', 'border-0');
    containerPosts.prepend(cardBorder);
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBorder.prepend(cardBody);
    const postsHead = document.createElement('h2');
    postsHead.classList.add('cadr-title', 'h4');
    postsHead.textContent = i18nextInstance.t('posts.header');
    cardBody.prepend(postsHead);

    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounder-0');
    cardBorder.append(ul);
    console.log(state.modal);
    state.posts.map((post) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const a = document.createElement('a');
      a.setAttribute('href', post.link);
      
      a.classList.add(post.visited ? 'fw-normal' : 'fw-bold');
      if (post.visited === true) {
        a.setAttribute('color', 'grey');
      }
      a.setAttribute('data-id', post.id);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = post.title;
      li.prepend(a);
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('type', 'button');
      button.setAttribute('data-id', post.id);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.setAttribute('data-bs-id', post.id);
      button.setAttribute('data-bs-title', post.title);
      button.setAttribute('data-bs-description', post.description);
      button.setAttribute('data-bs-link', post.link);
      button.textContent = i18nextInstance.t('posts.buttonShow');
      li.append(button);
      ul.prepend(li);
      return ul;
    });
  }
  if (path === 'modal.active') {
    if (state.modal.active) {
      modalDiv.classList.add('show');
      modalDiv.setAttribute('aria-modal', 'true');
      modalDiv.setAttribute('style', 'display: block');
    } else {
      modalDiv.setAttribute('aria-hidden', 'true');
    }
  }
  if (path === 'modal.postId') {
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-body');
    const fullArticle = document.querySelector('.full-article');
    const activePost = _.find(state.posts, (p) => p.id === state.modal.postId);
    fullArticle.setAttribute('href', activePost?.link ?? '#');
    modalTitle.textContent = activePost?.title ?? '';
    modalDescription.textContent = activePost?.description ?? '';
    return activePost;
  }
});
