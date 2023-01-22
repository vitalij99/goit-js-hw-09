import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name = "delay"]'),
  step: document.querySelector('input[name = "step"]'),
  amount: document.querySelector('input[name = "amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const firstDelay = Number(refs.firstDelay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);
  
  for (let i = 0; i < amount; i += 1){
    const delayStep = firstDelay + step * i;
    createPromise(i+1 , delayStep).then(onSuccess).catch(onError)
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((fulfilled, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        fulfilled({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
};


 function onSuccess({ position, delay }) { 
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};