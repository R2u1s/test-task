import React from 'react';
import styles from './result.module.css';
import { DELAY_RESULT_SHOW } from '../../constants/delays';
import { Loader } from '../loader/loader';

export const Result: React.FC = () => {

  const [loaderState, setLoaderState] = React.useState<boolean>(true); //состояние, описывающее надо ли показывать результат

  setTimeout(() => {       // задержка для работы лоадера
    setLoaderState(false);
  }, DELAY_RESULT_SHOW*5);

  return (
    <>
      <section className={`${styles.result}`}>
        {loaderState ? <Loader/> : <p>Result</p>}
      </section>
    </>
  );
}

