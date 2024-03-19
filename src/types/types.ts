import { store } from '../index';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { TBooksActions } from '../services/actions/books';

export interface TModal {
  active: boolean;
  setActive?: () => void;
  setClose: () => void;
  children?: React.ReactNode;
}

export type TBookCommon = {
  [key: string]: string | string[] | object[] | object;
}

export type TBookInfo = TBookCommon & {
  'volumeInfo'?: {
    'title': string;
    'authors': string[];
    'categories': string[];
    'imageLinks': {
      "smallThumbnail": string;
      "thumbnail": string;
      "small": string;
      "medium": string;
      "large": string;
      "extraLarge": string
    },
    'description':string,
    [key: string]: string | string[] | object[] | object | number;
  };
}

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TBooksActions;

// Типизация thunk в приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;