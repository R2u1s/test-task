import { MY_API_KEY } from "../../constants/api";
import { AppDispatch } from "../../types/types";
import { request } from "../../utils/utils";
import { PAGINATION_QTY } from "../../constants/api";
import { FilterStates } from "../../types/enums";

export const FIRST_SEARCH_REQUEST: 'FIRST_SEARCH_REQUEST' = 'FIRST_SEARCH_REQUEST';
export const FIRST_SEARCH_SUCCESS: 'FIRST_SEARCH_SUCCESS' = 'FIRST_SEARCH_SUCCESS';
export const FIRST_SEARCH_FAILED: 'FIRST_SEARCH_FAILED' = 'FIRST_SEARCH_FAILED';

export const NEXT_SEARCH_REQUEST: 'NEXT_SEARCH_REQUEST' = 'NEXT_SEARCH_REQUEST';
export const NEXT_SEARCH_SUCCESS: 'NEXT_SEARCH_SUCCESS' = 'NEXT_SEARCH_SUCCESS';
export const NEXT_SEARCH_FAILED: 'NEXT_SEARCH_FAILED' = 'NEXT_SEARCH_FAILED';

export const firstSearch = (value:string,orderBy:string,filter:string) => { //первый запрос к серверу. Загружаем в хранилище первые книги
  return function (dispatch:AppDispatch) {
    dispatch({
      type: FIRST_SEARCH_REQUEST
    });

    let filterValue = '';
    if (filter !== FilterStates.Default) filterValue=`+subject:${filter}` //если запрашивается фильтр по дфеолтному значению, то вместо него пустую строку вставляем

    request(`${value}${filterValue}&orderBy=${orderBy}&startIndex=0&maxResults=${PAGINATION_QTY}&key=${MY_API_KEY}`)
      .then(res => {
        if (res && res.success) {
          const filteredResult = 
          dispatch({
            type: FIRST_SEARCH_SUCCESS,
            data: res,
            text: value
          });
        } else {
          dispatch({
            type: FIRST_SEARCH_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: FIRST_SEARCH_FAILED
        });
        console.log(error);
      });
  };
}

//последующие запросы к серверу с пагинацией. Добавляем новые книги к существующим
export const nextSearch = (value:string,orderBy:string,filter:string,startIndex:number,qty:number) => { 
  return function (dispatch:AppDispatch) {
    dispatch({
      type: NEXT_SEARCH_REQUEST
    });

    let filterValue = '';
    if (filter !== FilterStates.Default) filterValue=`+subject:${filter}` //если запрашивается фильтр по дфеолтному значению, то вместо него пустую строку вставляем

    request(`${value}${filterValue}&key=${MY_API_KEY}&startIndex=${startIndex}&maxResults=${qty}&orderBy=${orderBy}`)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: NEXT_SEARCH_SUCCESS,
            data: res
          });
        } else {
          dispatch({
            type: NEXT_SEARCH_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: NEXT_SEARCH_FAILED
        });
        console.log(error);
      });
  };
}