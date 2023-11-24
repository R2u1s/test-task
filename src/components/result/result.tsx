import React from 'react';
import styles from './result.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { Loader } from '../loader/loader';
import { Card } from '../card/card';
import { nextSearch } from '../../services/actions/books';
import { PAGINATION_QTY } from '../../constants/api';

export const Result: React.FC = () => {

  const dispatch = useDispatch();

  const store = useSelector((store) => ({
    searchText: store.books.searchText,
    books: store.books.books,
    qty: store.books.qty,
    firstSearchRequest: store.books.firstSearchRequest,
    firstSearchFailed: store.books.firstSearchFailed,
    nextSearchRequest: store.books.nextSearchRequest,
    nextSearchFailed: store.books.nextSearchFailed,
  }));

  const onLoadMoreClick = () => {
    if (true) {   // если 
      dispatch(nextSearch(store.searchText, store.books.length, // отправляем экшн с запросом к серверу. Тот же текст запроса берем из стора
        store.qty - store.books.length < PAGINATION_QTY ?       // два числа указываем для реализации пагинации
        store.qty - store.books.length : PAGINATION_QTY)); 
    }
  };

  const content = React.useMemo(
    () => {
      return (
        store.firstSearchRequest ? <Loader /> :
          //если поиск удачный, то показываем его, иначе крутим лоадер.
          store.firstSearchFailed ? 'Ошибка соединения с сервером' :
            <>
              <p className={'text text_type_bold text_color_black'}>Found {store.qty} results</p>
              <ul className={`${styles['_cardsList']}`}>
                {store.books.length > 0 && store.books.map((item: any, index: number) => {
                  return <li key={index}>
                    <Card book={item} />
                  </li>
                })}
              </ul>
              {(store.books.length < store.qty && !store.nextSearchFailed) && (store.nextSearchRequest ? <Loader /> :
              //не показываем кнопку если уже отображены все книги или от сервера пришла ошибка. Крутим лоадер во время запроса
                store.firstSearchFailed ? 'Ошибка соединения с сервером' :
                  <p className={'text text_type_underline text_color_gray text_link'} onClick={onLoadMoreClick}>Load more</p>)}
            </>
      )
    },
    [store.books,store.firstSearchRequest,store.firstSearchFailed,store.nextSearchRequest]
  );

  return (
    <section className={`${styles['_content']}`}>
      {content}
    </section>
  );
}

