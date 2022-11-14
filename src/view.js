import onChange from 'on-change';

export default (state, elements, i18nextInstance) => onChange(state, (path, value) => {
    const {
      form,
      input,
      feedbackElement,
      containerPosts,
      containerFeeds,
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
console.log(value);
     const cardBorder = containerFeeds.createElement('div');
    }
    if (path === 'posts') {
            
 
      // cardBorder.classList.add('card', 'border-0');
      // const cardBody = cardBorder.createElement('div');
      // cardBody.classList.add('ard-body');
      // const postsHead = cardBody.createElement('h2');
      // postsHead.classList.add('cadr-title', 'h4');
      // postsHead.textContent = i18nextInstance.t('posts.header');
      // const ul = cardBorder.createElement('ul');
      // ul.classList.add('list-group', 'border-0', 'rounder-0');
      // state.posts.map((post) => {
      //   const li = document.createElement('li');
      //   li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      //   const a = li.createElement('a');
      //   a.setAttribute('href', post.link);
      //   a.setAttribute('data-id', post.id);
      //   a.setAttribute('target', '_blank');
      //   a.setAttribute('rel', 'noopener noreferrer');
      //   a.textContent = post.title;
      //   const button = li.createElement('button');
      //   button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      //   button.setAttribute('type', 'button');
      //   button.setAttribute('data-id', post.id);
      //   button.setAttribute('data-bs-toggle', 'modal');
      //   button.setAttribute('data-bs-target', '#modal');
      //   button.value = i18nextInstance.t('posts.buttonShow');
      //   ul.prepend(li);
      // })

    }
  });
