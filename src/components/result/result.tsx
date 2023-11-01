import React from 'react';
import styles from './result.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { Loader } from '../loader/loader';
import { Card } from '../card/card';

export const Result: React.FC = () => {

  const store = useSelector((store) => ({
    books: store.books.books,
    qty: store.books.qty,
    searchRequest: store.books.searchRequest,
    searchFailed: store.books.searchFailed,
  }));

  return (
    <>
      <section className={`${styles['_content']}`}>

        {store.searchRequest ? <Loader /> :  //если поиск удачный, то показываем его, иначе крутим лоадер
          store.searchFailed ? 'Ошибка соединения с сервером' :
          <>
            <p className={'text text_type_bold text_color_black'}>Found {store.qty} results</p>
            <ul className={`${styles['_cardsList']}`}>
              {store.books.length>0 && store.books.map((item:any, index:number) => {
                return <li key={index}>
                  <Card book={item} />
                </li>
              })}
            </ul>
          </>
        }
      </section>
    </>
  );
}

