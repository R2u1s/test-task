import React from 'react';
import styles from './result.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { DELAY_RESULT_SHOW } from '../../constants/delays';
import { Loader } from '../loader/loader';
import { bookInfoMock, bookListMock } from '../../constants/mock';
import { Card } from '../card/card';

export const Result: React.FC = () => {

  const [loaderState, setLoaderState] = React.useState<boolean>(true); //состояние, описывающее надо ли показывать лоадер, потом заменить на стэйт из хранилища

  const { books } = useSelector((store) => ({
    books: store.books
  }));

  setTimeout(() => {       // задержка для работы лоадера
    setLoaderState(false);
  }, DELAY_RESULT_SHOW * 1);

  return (
    <>
      <section className={`${styles['_content']}`}>

        {loaderState ? <Loader /> :  //если поиск удачный, то показываем его, иначе крутим лоадер (сейчас заглушка)
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

