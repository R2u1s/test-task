import { AppDispatch, TPersonInfo } from "../../types/types";
import { request } from "../../utils/utils";

export const FIRST_SEARCH_REQUEST: 'FIRST_SEARCH_REQUEST' = 'FIRST_SEARCH_REQUEST';
export const FIRST_SEARCH_SUCCESS: 'FIRST_SEARCH_SUCCESS' = 'FIRST_SEARCH_SUCCESS';
export const FIRST_SEARCH_FAILED: 'FIRST_SEARCH_FAILED' = 'FIRST_SEARCH_FAILED';

export const NEXT_SEARCH_REQUEST: 'NEXT_SEARCH_REQUEST' = 'NEXT_SEARCH_REQUEST';
export const NEXT_SEARCH_SUCCESS: 'NEXT_SEARCH_SUCCESS' = 'NEXT_SEARCH_SUCCESS';
export const NEXT_SEARCH_FAILED: 'NEXT_SEARCH_FAILED' = 'NEXT_SEARCH_FAILED';

export const WRITE_PERSONINFO: 'WRITE_PERSONINFO' = 'WRITE_PERSONINFO';
export const CLEAR_PERSONINFO: 'CLEAR_PERSONINFO' = 'CLEAR_PERSONINFO';

export const CLEAR_STORE: 'CLEAR_STORE' = 'CLEAR_STORE';

export type TPersonsActions =
  | IFirstSearchErrorAction
  | IFirstSearchRequestAction
  | IFirstSearchSuccessAction
  | INextSearchErrorAction
  | INextSearchRequestAction
  | INextSearchSuccessAction
  | IWritePersonInfoAction
  | IClearPersonInfoAction
  | IClearStoreAction

export interface IFirstSearchRequestAction { readonly type: typeof FIRST_SEARCH_REQUEST }
export interface IFirstSearchSuccessAction {
  readonly type: typeof FIRST_SEARCH_SUCCESS,
  readonly data: Object[]
}
export interface IFirstSearchErrorAction { readonly type: typeof FIRST_SEARCH_FAILED }

export interface INextSearchRequestAction { readonly type: typeof NEXT_SEARCH_REQUEST }
export interface INextSearchSuccessAction {
  readonly type: typeof NEXT_SEARCH_SUCCESS,
  readonly data: Object[]
}
export interface INextSearchErrorAction { readonly type: typeof NEXT_SEARCH_FAILED }

export interface IWritePersonInfoAction {
  readonly type: typeof WRITE_PERSONINFO,
  readonly currentPerson: TPersonInfo
}
export interface IClearPersonInfoAction { readonly type: typeof CLEAR_PERSONINFO }

export interface IClearStoreAction { readonly type: typeof CLEAR_STORE }

export const firstSearch = () => { //первый запрос к серверу. Загружаем в хранилище первые книги
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FIRST_SEARCH_REQUEST
    });

    request('')
      .then(res => {
        if (res) {
          dispatch({
            type: FIRST_SEARCH_SUCCESS,
            data: res
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
        console.log(JSON.stringify(error));
      });
  };
}

//последующие запросы к серверу во время ввода запроса в поисковую строку
export const nextSearch = (value: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: NEXT_SEARCH_REQUEST
    });

    request(`?term=${value}`)
      .then(res => {
        if (res) {
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
        console.log(JSON.stringify(error));
      });
  };
}

//записываем инфо о просматриваемой книге в хранилище
export const writePersonInfo = (person: TPersonInfo) => ({
  type: WRITE_PERSONINFO,
  currentPerson: person
});
//очищаем инфо о просматриваемой книге в хранилище
export const clearPersonInfo = () => ({
  type: CLEAR_PERSONINFO
});
//очищаем хранилище
export const clearStore = () => ({
  type: CLEAR_STORE,
});
