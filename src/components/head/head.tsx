import React from 'react';
import { Input, Select } from 'antd';
import styles from './head.module.css';
import { DELAY_RESULT_SHOW } from '../../constants/delays';

export const Head: React.FC<{
  setResultIsActive:(value: boolean)=>void;
}> = ({setResultIsActive}) => {

  const { Search } = Input;

  const [searchIsActive, setSearchIsActive] = React.useState<boolean>(false); //состояние, описывающее была ли нажата кнопка поиска
  const classHead = searchIsActive ? `${styles['head']} ${styles['head_height_reduced']}` : `${styles['head']}`; //если поиск активен скукоживаем высоту

  const onSearchClick = () => {
    setSearchIsActive(true); // сначала активируем сдвиг головной части сайта
    setTimeout(() => {       // а потом с задержкой отображаем резульатат, иначе будет появляться скролл на мгновение, ведь головная часть занимает всю высоту окна сначала, а результат под ней
      setResultIsActive(true);
    }, DELAY_RESULT_SHOW);
  };
  
  return (
    <section className={classHead}>
      <div className={`${styles['head__overlay']}`}>
        <div className={`${styles['head__content']}`}>
          <h1 className={`${styles['head__title']}`}>Book Search</h1>
          <Search className={`${styles['head__search']}`} placeholder="Enter book name" onSearch={onSearchClick} />
          <div className={`${styles['head__filter']}`}>
            <Select
              className={`${styles['head__sort']}`}
              placeholder="Filter"
              allowClear
              options={[
                { value: 'abc', label: 'Abc' },
                { value: 'def', label: 'Def' },
                { value: 'klm', label: 'Klm' }
              ]}
            />
            <Select
              className={`${styles['head__sort']}`}
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