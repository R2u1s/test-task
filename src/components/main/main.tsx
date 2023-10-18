import React from 'react';
import styles from './main.module.css';
import Head from "../head/head";
import { Result } from "../result/result";

export const Main: React.FC = () => {

  const [resultIsActive, setResultIsActive] = React.useState<boolean>(false); //состояние, описывающее надо ли показывать результат

  return (
    <main className={`${styles.main}`}>
      <Head setResultIsActive={setResultIsActive} />
      {resultIsActive && <Result />}
    </main>
  ); 
}