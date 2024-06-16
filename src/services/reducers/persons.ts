import { personInfoEmptyMock } from "../../constants/mock";
import { TPersonInfo } from "../../types/types";
import { 
  FIRST_SEARCH_REQUEST,
  FIRST_SEARCH_SUCCESS,
  FIRST_SEARCH_FAILED,
  NEXT_SEARCH_REQUEST,
  NEXT_SEARCH_SUCCESS,
  NEXT_SEARCH_FAILED,
  CLEAR_STORE,
  TPersonsActions,
  WRITE_PERSONINFO,
  CLEAR_PERSONINFO
 } from "../actions/persons";

export type TPersonsState = {
  persons:Object[],
  qty:number,
  current:TPersonInfo,
  firstSearchRequest: boolean,
  firstSearchFailed: boolean,
  nextSearchRequest: boolean,
  nextSearchFailed: boolean,
};

const initialState: TPersonsState = {
  persons:[],
  qty:0,
  current: personInfoEmptyMock,
  firstSearchRequest: false,
  firstSearchFailed: false,
  nextSearchRequest:false,
  nextSearchFailed: false,
};

export const personsReducer = (state = initialState, action:TPersonsActions):TPersonsState => {
  
  switch (action.type) {

    case FIRST_SEARCH_REQUEST: {
      return {
        ...state,
        firstSearchRequest: true
      };
    }
    case FIRST_SEARCH_SUCCESS: {
      return {
        ...state,
        persons:action.data,
        qty:action.data.length,
        
        firstSearchFailed: false,
        firstSearchRequest: false
      };
    }
    case FIRST_SEARCH_FAILED: {
      return {
        ...state,
        firstSearchFailed: true,
        firstSearchRequest: false
      };
    }
    case NEXT_SEARCH_REQUEST: {
      return {
        ...state,
        nextSearchRequest: true
      };
    }
    case NEXT_SEARCH_SUCCESS: {
      return {
        ...state,
        persons:action.data,
        
        nextSearchFailed: false,
        nextSearchRequest: false
      };
    }
    case NEXT_SEARCH_FAILED: {
      return {
        ...state,
        nextSearchFailed: true,
        nextSearchRequest: false
      };
    }
    case WRITE_PERSONINFO: {
      return { ...state, current: action.currentPerson };
    }
    case CLEAR_PERSONINFO:{
      return { ...state, current: personInfoEmptyMock };
    }
    case CLEAR_STORE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};