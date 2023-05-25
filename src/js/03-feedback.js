import throttle from 'lodash.throttle';

const FORM_STORAGE = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const email = formEl.email.value;
  const message = formEl.message.value;
  localStorage.setItem(FORM_STORAGE, JSON.stringify(createObj(email, message)));
}

window.addEventListener('DOMContentLoaded', () => {
  const storageData = JSON.parse(localStorage.getItem(FORM_STORAGE));

  if (storageData) {
    formEl.email.value = storageData.email;
    formEl.message.value = storageData.message;
  }
});

function onFormSubmit(event) {
  event.preventDefault();
  const email = formEl.email.value;
  const message = formEl.message.value;
  console.log(createObj(email, message));
  localStorage.removeItem(FORM_STORAGE);
  formEl.reset();
}

function createObj(email, message) {
  return {
    email,
    message,
  };
}
