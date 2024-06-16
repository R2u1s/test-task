import { BASE_URL } from "../constants/api";

// создаем функцию проверки ответа на `ok`
const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

type TResSuccess = {
  items: Object[],
  kind:string,
  totalItems:number,
  success: boolean
}

// создаем функцию проверки на `success`
const checkSuccess = <T>(res:TResSuccess & T) => {
  if (res) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = (endpoint:string) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`,{
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(checkResponse)
    .then(checkSuccess);
};

export function debounce(callback:any, delay = 1000) {
  let timeout:any;

  return (...arg:any) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...arg);
    });
  }
}