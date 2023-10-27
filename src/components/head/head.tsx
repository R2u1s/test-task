import React from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { Input, Select } from 'antd';
import styles from './head.module.css';
import { DELAY_RESULT_SHOW } from '../../constants/delays';
import { search } from '../../services/actions/books';

export const Head: React.FC<{setResultIsActive:(value: boolean)=>void}> = ({setResultIsActive}) => {

  const { Search } = Input;

  const dispatch = useDispatch();

  const [valueInput,setValueInput] = React.useState<string>(''); //состояние для работы инпута

  const [searchIsActive, setSearchIsActive] = React.useState<boolean>(false); //состояние, описывающее была ли нажата кнопка поиска
  const classHead = searchIsActive ? `${styles['head']} ${styles['height_reduced']}` : `${styles['head']}`; //если поиск активен скукоживаем высоту

  const onSearchClick = () => {
    setSearchIsActive(true); // сначала активируем сдвиг головной части сайта
    dispatch(search(valueInput));
    setTimeout(() => {       // а потом с задержкой отображаем резульатат, иначе будет появляться скролл на мгновение, ведь головная часть занимает всю высоту окна сначала, а результат под ней
      setResultIsActive(true);
    }, DELAY_RESULT_SHOW);
  };
  
  return (
    <section className={classHead}>
      <div className={`${styles['_overlay']}`}>
        <div className={`${styles['_content']}`}>
          <h1 className={`${styles['_title']}`}>Book Search</h1>
          <Search className={`${styles['_search']}`} placeholder="Enter book name" onSearch={onSearchClick} onChange={e => setValueInput(e.target.value)} />
          <div className={`${styles['_filter']}`}>
            <Select
              className={`${styles['_sort']}`}
              placeholder="Filter"
              allowClear
              options={[
                { value: 'abc', label: 'Abc' },
                { value: 'def', label: 'Def' },
                { value: 'klm', label: 'Klm' }
              ]}
            />
            <Select
              className={`${styles['_sort']}`}
              placeholder="Sort"
              allowClear
              options={[
                { value: 'abc', label: 'Abc' },
                { value: 'def', label: 'Def' },
                { value: 'klm', label: 'Klm' }
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Head;