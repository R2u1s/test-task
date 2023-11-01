import { SEARCH_REQUEST,SEARCH_SUCCESS,SEARCH_FAILED } from "../actions/books";

type TSearchState = {
  books:Object[],
  qty:number
  searchRequest: boolean,
  searchFailed: boolean,
};

const initialState: TSearchState = {
  books:[],
  qty:0,
  searchRequest: false,
  searchFailed: false,
};

export const booksReducer = (state = initialState, action:any):any => {
  
  switch (action.type) {

    case SEARCH_REQUEST: {
      return {
        ...state,
        searchRequest: true
      };
    }
    case SEARCH_SUCCESS: {
      return {
        ...state,
        books:action.data.items,
        qty:action.data.totalItems,
        
        searchFailed: false,
        searchRequest: false
      };
    }
    case SEARCH_FAILED: {
      return {
        ...state,
        searchFailed: true,
        searchRequest: false
      };
    }
    default: {
      return state;
    }
  }
};