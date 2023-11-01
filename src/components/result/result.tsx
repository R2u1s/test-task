import React from 'react';
import styles from './result.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { Loader } from '../loader/loader';
import { Card } from '../card/card';

export const Result: React.FC = () => {

  const { books } = useSelector((store) => ({
    books: store.books,
    searchRequest: store.books.searchRequest,
    searchFailed: store.books.searchFailed,
  }));

  return (
    <>
      <section className={`${styles['_content']}`}>

        {books.searchRequest ? <Loader /> :  //если поиск удачный, то показываем его, иначе крутим лоадер (сейчас заглушка)
          <>
            <p className={'text text_type_bold text_color_black'}>Found {books.qty} results</p>
            <ul className={`${styles['_cardsList']}`}>
              {books.books.length>0 && books.books.map((item:any, index:number) => {
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

