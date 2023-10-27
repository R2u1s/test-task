import { MY_API_KEY } from "../../constants/api";
import { AppDispatch } from "../../types/types";
import { request } from "../../utils/utils";

export const SEARCH_REQUEST: 'SEARCH_REQUEST' = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS: 'SEARCH_SUCCESS' = 'SEARCH_SUCCESS';
export const SEARCH_FAILED: 'SEARCH_FAILED' = 'SEARCH_FAILED';

export const search = (value:string) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: SEARCH_REQUEST
    });
    request(`${value}&key=${MY_API_KEY}`, {
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
      .then(res => {
        if (res && res.success) {
          console.log(res);
          dispatch({
            type: SEARCH_SUCCESS,
            data: res
          });
        } else {
          dispatch({
            type: SEARCH_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: SEARCH_FAILED
        });
        console.log(error);
      });
  };
}