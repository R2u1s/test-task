import { 
  FIRST_SEARCH_REQUEST,
  FIRST_SEARCH_SUCCESS,
  FIRST_SEARCH_FAILED,
  NEXT_SEARCH_REQUEST,
  NEXT_SEARCH_SUCCESS,
  NEXT_SEARCH_FAILED
 } from "../actions/books";

export type TSearchState = {
  searchText: string,
  books:Object[],
  qty:number
  firstSearchRequest: boolean,
  firstSearchFailed: boolean,
  nextSearchRequest: boolean,
  nextSearchFailed: boolean,
};

const initialState: TSearchState = {
  searchText:'',
  books:[],
  qty:0,
  firstSearchRequest: false,
  firstSearchFailed: false,
  nextSearchRequest:false,
  nextSearchFailed: false,
};

export const booksReducer = (state = initialState, action:any):any => {
  
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
        searchText:action.text,
        books:action.data.items,
        qty:action.data.totalItems,
        
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
        books:[...state.books,...action.data.items],
        
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
    default: {
      return state;
    }
  }
};