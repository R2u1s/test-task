import { store } from '../index';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch, EmptyObject } from 'redux';
import { TPersonsActions } from '../services/actions/persons';

export interface TModal {
  active: boolean;
  setActive?: () => void;
  setClose: () => void;
  children?: React.ReactNode;
}

export type TPersonInfo = {
  name: string,
  phone: string,
  email: string,
  hire_date: string,
  position_name: string,
  department: string,
  address: string
};

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TPersonsActions;

// Типизация thunk в приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;