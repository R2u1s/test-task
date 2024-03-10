import React from 'react';
import styles from './main.module.css';
import Head from "../head/head";
import { Result } from "../result/result";
import { FilterStates, SortStates } from '../../types/enums';

export const Main: React.FC = () => {

  const [resultIsActive, setResultIsActive] = React.useState<boolean>(false); //состояние, описывающее надо ли показывать результат

  const [filter, setFilter] = React.useState<FilterStates>(FilterStates.Default); //состояние, хранящие значение выбранного фильтра
  const [sort, setSort] = React.useState<SortStates>(SortStates.Default); //состояние, хранящие значение выбранной сортировки

  return (
      <main className={`${styles['_content']}`}>
        <Head setResultIsActive={setResultIsActive} setFilter={setFilter} setSort={setSort} sort={sort} filter={filter} />
        {resultIsActive && <Result filter={filter} sort={sort} />}
      </main>
  );
}