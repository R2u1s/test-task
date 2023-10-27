import { combineReducers } from 'redux';
import { booksReducer } from './books';

// Корневой редьюсер
export const rootReducer = combineReducers({
    books: booksReducer,
}) 