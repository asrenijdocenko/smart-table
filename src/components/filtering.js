import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules); 
export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach(key => {
  const element = elements[key];
  if (!element) return;

  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  emptyOption.textContent = '';
  element.append(emptyOption);

  Object.values(indexes[key]).forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    element.append(option);
  });
});
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
if (action && action.name === 'clear') {
  const fieldToClear = action.dataset.field; // какое поле очищаем

  if (fieldToClear && elements[fieldToClear]) {
    const el = elements[fieldToClear];

    // очищаем элемент фильтра
    if (el.tagName.toLowerCase() === 'select') {
      el.value = '';
    } else if ('value' in el) {
      el.value = '';
    }

    // сбрасываем значение в state (если он есть)
    state[fieldToClear] = '';
  }
}

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}