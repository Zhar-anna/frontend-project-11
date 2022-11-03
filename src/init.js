// валидация дублей  В yup для этого есть метод notOneOf
import { object, string, number, date, InferType } from 'yup';
// состояние и обработчики
const init = () => {
  const state = {
    rssForm: {
        state: 'valid',
        errors: [],
    }
  };

}

export default init;