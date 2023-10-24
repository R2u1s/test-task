import React from 'react';
import styles from './result.module.css';
import { DELAY_RESULT_SHOW } from '../../constants/delays';
import { Loader } from '../loader/loader';
import { bookInfoMock, bookListMock } from '../../utils/utils';
import { Card } from '../card/card';

export const Result: React.FC = () => {

  const [loaderState, setLoaderState] = React.useState<boolean>(true); //состояние, описывающее надо ли показывать лоадер, потом заменить на стэйт из хранилища

  setTimeout(() => {       // задержка для работы лоадера
    setLoaderState(false);
  }, DELAY_RESULT_SHOW * 1);

  return (
    <>
      <section className={`${styles['_content']}`}>

        {loaderState ? <Loader /> :  //если поиск удачный, то показываем его, иначе крутим лоадер (сейчас заглушка)
          <>
            <p className={'text text_type_bold text_color_black'}>Found {bookListMock.length} results</p>
            <ul className={`${styles['_cardsList']}`}>
              {bookListMock.length>0 && bookListMock.map((item, index) => {
                return <li key={index}>
                  <Card book={bookInfoMock} />
                </li>
              })}
            </ul>
          </>
        }
      </section>
    </>
  );
}

