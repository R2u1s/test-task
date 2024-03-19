import React from 'react';
import styles from './info.module.css';
import { useSelector } from '../../services/hooks';

export const Info: React.FC<any> = ({ setClose }) => {

  const store = useSelector((store) => ({
    book: store.books.current,
  }));

  const picture = store.book.volumeInfo?.imageLinks?.thumbnail ? store.book.volumeInfo?.imageLinks?.thumbnail : 'No image';
  const categories = store.book.volumeInfo?.categories ? store.book.volumeInfo?.categories.join(', ') : 'No category';
  const title = store.book.volumeInfo?.title ? store.book.volumeInfo?.title : 'No title';
  const authors = store.book.volumeInfo?.authors ? store.book.volumeInfo?.authors.join(', ') : 'No authors';
  const description = store.book.volumeInfo?.description ? store.book.volumeInfo?.description : 'No description';

  return (
    <>
      <div className={`${styles['_info']}`}>
        <div className={`${styles['_info-picture-padding']}`}>
          <img src={picture} className={`${styles['_info-picture']}`} />
        </div>
        <div className={`${styles['_info-text']}`}>
          <button className={styles['_close-button']} onClick={setClose}>
            <p className={'text text_type_default text_color_black text_overflow_one'}>← back to the list</p>
          </button>
          <div className={`${styles['_info__category']}`}>
            <p className={'text text_type_default text_color_black text_overflow_one'}>{categories}</p>
          </div>
          <div className={`${styles['_info__title']}`}>
            <p className={'text text_type_large_bold text_color_black text_overflow_two'}>{title}</p>
          </div>
          <div className={`${styles['_info__author']}`}>
            <p className={'text text_type_underline text_color_gray text_overflow_one'}>{authors}</p>
          </div>
          <div className={`${styles['_info__description']}`}>
            <p className={'text text_type_default text_color_black text_overflow'}>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

