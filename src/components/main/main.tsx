import React from 'react';
import styles from './main.module.css';
import Head from "../head/head";
import { Result } from "../result/result";
import { FilterStates, SortStates } from '../../types/enums';
import { useModal } from '../../hooks/useModal';
import { useDispatch } from '../../services/hooks';
import { clearBookInfo } from '../../services/actions/books';

export const Main: React.FC = () => {

  const dispatch = useDispatch();

  const [resultIsActive, setResultIsActive] = React.useState<boolean>(false); //состояние, описывающее надо ли показывать результат

  const [filter, setFilter] = React.useState<FilterStates>(FilterStates.Default); //состояние, хранящие значение выбранного фильтра
  const [sort, setSort] = React.useState<SortStates>(SortStates.Default); //состояние, хранящие значение выбранной сортировки


  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <main className={`${styles['_content']}`}>
      <Head
        setResultIsActive={setResultIsActive}
        setFilter={setFilter}
        setSort={setSort}
        sort={sort}
        filter={filter}
        onCloseModal={closeModal}
      />
      {resultIsActive && <Result
       filter={filter} 
       sort={sort}
       isModalOpen={isModalOpen} 
       openModal={openModal}
       closeModal={closeModal}
       />}
    </main>
  );
}