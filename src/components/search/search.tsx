import React from 'react';
import styles from './search.module.css';
import searchIcon from '../../icons/search_icon.svg';

export const Search: React.FC<{
  onChange:(value:any) => void,
}> = ({ onChange }) => {

  return (
    <>
      <form className={`${styles['search__form']}`}>
        <input
          type="text"
          placeholder=""
          className={`${styles['search__input']} text text_type_large`}
          onChange={e => onChange(e.target.value)}
        />
        <img className={`${styles['search__icon']}`} src={searchIcon as string} />
      </form>
    </>
  );
}

