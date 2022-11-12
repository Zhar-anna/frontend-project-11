import onChange from 'on-change';

export default (state, elements, i18nextInstance) => onChange(state, (path, value) => {
    const {
        form,
        input,
        feedbackElement,
        container,
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
    if (path === 'rssForm.feeds') {

    }
    if (path === 'rssForm.posts') {

    }
  });
