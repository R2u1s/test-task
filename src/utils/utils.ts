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
const checkSuccess = (res:any) => {
  if (res && // проверяем корректность ответа сервера
    'items' in res && 
    'kind' in res &&
    'totalItems' in res) {
      Object.assign(res, {success: true});
    return res;
  }
 
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Не известный ответ от сервера: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = <T>(endpoint:string) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`,{
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
    .then(checkResponse)
    .then(checkSuccess);
};