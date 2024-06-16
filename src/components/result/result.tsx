import React from 'react';
import styles from './result.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { Loader } from '../loader/loader';
import { Card } from '../card/card';
import { firstSearch, nextSearch } from '../../services/actions/persons';

export const Result: React.FC<{
  value: string,
  onOpenModal: () => void,
}> = ({ value, onOpenModal }) => {

  const dispatch = useDispatch();

  const getData = useSelector((store: any) => ({
    searchText: store.persons.searchText,
    persons: store.persons.persons,
    qty: store.persons.qty,
    firstSearchRequest: store.persons.firstSearchRequest,
    firstSearchFailed: store.persons.firstSearchFailed,
    nextSearchRequest: store.persons.nextSearchRequest,
    nextSearchFailed: store.persons.nextSearchFailed,
  }));

  //первый запрос при загрузке страницы
  React.useEffect(() => {
    dispatch(firstSearch());
  }, [dispatch]);

  //повторный запрос при вводе в поисковую строку
  React.useEffect(() => {
    const handler = setTimeout(() => dispatch(nextSearch(value)), 250);
    return () => clearTimeout(handler);
  }, [value,dispatch]);

  const content = React.useMemo(
    () => {
      return (
        getData.firstSearchRequest ? <Loader /> :
          //если поиск удачный, то показываем его, иначе крутим лоадер.
          getData.firstSearchFailed || getData.nextSearchFailed ? 'Ошибка соединения с сервером' :
          getData.persons.length < 1 ? 'Записей не найдено' :
            <>
              <ul className={`${styles['_cardsList']}`}>
                {getData.persons.length > 0 && getData.persons.map((item: any, index: number) => {
                  return <li key={index}>
                    <Card person={item} openModal={onOpenModal} />
                  </li>
                })}
              </ul>
            </>
      )
    },
    [getData.persons, getData.firstSearchRequest, getData.firstSearchFailed,getData.nextSearchFailed,onOpenModal]
  );

  return (
    <>
      <section className={`${styles['_content']}`}>
        <>{content}</>
      </section>
    </>
  );
}

