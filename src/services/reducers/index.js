import { combineReducers } from 'redux';
import { personsReducer } from './persons';

// Корневой редьюсер
export const rootReducer = combineReducers({
    persons: personsReducer,
}) 