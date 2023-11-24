import { MY_API_KEY } from "../../constants/api";
import { AppDispatch } from "../../types/types";
import { request } from "../../utils/utils";
import { PAGINATION_QTY } from "../../constants/api";

export const FIRST_SEARCH_REQUEST: 'FIRST_SEARCH_REQUEST' = 'FIRST_SEARCH_REQUEST';
export const FIRST_SEARCH_SUCCESS: 'FIRST_SEARCH_SUCCESS' = 'FIRST_SEARCH_SUCCESS';
export const FIRST_SEARCH_FAILED: 'FIRST_SEARCH_FAILED' = 'FIRST_SEARCH_FAILED';

export const NEXT_SEARCH_REQUEST: 'NEXT_SEARCH_REQUEST' = 'NEXT_SEARCH_REQUEST';
export const NEXT_SEARCH_SUCCESS: 'NEXT_SEARCH_SUCCESS' = 'NEXT_SEARCH_SUCCESS';
export const NEXT_SEARCH_FAILED: 'NEXT_SEARCH_FAILED' = 'NEXT_SEARCH_FAILED';

export const firstSearch = (value:string) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: FIRST_SEARCH_REQUEST
    });
    request(`${value}&key=${MY_API_KEY}&startIndex=0&maxResults=${PAGINATION_QTY}`)
      .then(res => {
        if (res && res.success) {
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

export const nextSearch = (value:string,startIndex:number,qty:number) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: NEXT_SEARCH_REQUEST
    });
    request(`${value}&key=${MY_API_KEY}&startIndex=${startIndex}&maxResults=${qty}`)
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