import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { Input, Select } from 'antd';
import styles from './head.module.css';
import { DELAY_RESULT_SHOW } from '../../constants/delays';
import { clearStore, firstSearch } from '../../services/actions/books';
import { FilterStates, SortStates } from '../../types/enums';
import { getByPlaceholderText } from '@testing-library/react';

export const Head: React.FC<{ 
  setResultIsActive: (value: boolean) => void,
  setFilter: (value:FilterStates)=>void,
  setSort: (value:SortStates)=>void,
  sort: SortStates,
  filter: FilterStates
}> = ({ setResultIsActive, setFilter, setSort, sort, filter }) => {

  const { Search } = Input;

  const dispatch = useDispatch();

  const [valueInput, setValueInput] = React.useState<string>(''); //состояние для работы инпута

  const [searchIsActive, setSearchIsActive] = React.useState<boolean>(false); //состояние, описывающее была ли нажата кнопка поиска
  const classHead = searchIsActive ? `${styles['head']} ${styles['height_reduced']}` : `${styles['head']}`; //если поиск активен скукоживаем высоту

  const onSearchClick = () => {
    if (valueInput !== '') {   // если строка пустая, то нажатие на кнопку поиска ничего не запускает
      setSearchIsActive(true); // сначала активируем сдвиг головной части сайта
      dispatch(firstSearch(valueInput,sort,filter)); // отправляем экшн с запросом к серверу
      setTimeout(() => {       // а потом с задержкой отображаем резульатат, иначе будет появляться скролл на мгновение, ведь головная часть занимает всю высоту окна сначала, а результат под ней
        setResultIsActive(true);
      }, DELAY_RESULT_SHOW);
    }
  };

  const onTitleClick = () => {
    setResultIsActive(false); //убираем отображение результата
    setSearchIsActive(false); //сдвигаем обратно вниз головную часть
    setValueInput('');        //очищаем инпут
    dispatch(clearStore());   //очищаем хранилище
    setFilter(FilterStates.Default);//очищаем фильтр
    setSort(SortStates.Default);//очищаем сортировку
  }

  return (
    <section className={classHead}>
      <div className={`${styles['_overlay']}`}>
        <div className={`${styles['_content']}`}>
          <h1 className={`${styles['_title']}`} onClick={onTitleClick}>Book Search</h1>
          <Search className={`${styles['_search']}`} placeholder="Enter book name" onSearch={onSearchClick} onChange={e => setValueInput(e.target.value)} value={valueInput}/>
          <div className={`${styles['_filter']}`}>
            <Select
              className={`${styles['_sort']}`}
              placeholder="Categories"
              options={Object.keys(FilterStates).map((item)=>{return { value: Object(FilterStates)[item], label: Object(FilterStates)[item] }})}
              onChange={setFilter}
              value={filter}
            />
            <Select
              className={`${styles['_sort']}`}
              placeholder="Sort"
              options={Object.keys(SortStates).map((item)=>{return { value: Object(SortStates)[item], label: Object(SortStates)[item] }})}
              onChange={setSort}
              value={sort}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Head;