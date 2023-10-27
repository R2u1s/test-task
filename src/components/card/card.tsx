import React from 'react';
import styles from './card.module.css';
import { TBookInfo } from '../../types/types';

export const Card: React.FC<{ book: TBookInfo }> = ({ book }) => {
  return (
    <>
      <div className={`${styles['_content']}`}>
        <div className={`${styles['_picture-padding']}`}>
          <img src={book.volumeInfo?.imageLinks.smallThumbnail} className={`${styles['_picture']}`}/>
        </div>
        <div className={`${styles['_category']}`}>
          <p className={'text text_type_underline text_color_gray'}>{book.volumeInfo?.categories ? book.volumeInfo.categories : ' '}</p>
        </div>
        <div className={`${styles['_title']}`}>
          <p className={'text text_type_bold text_color_black'}>{book.volumeInfo?.title ? book.volumeInfo.title : ' '}</p>
        </div>
        <div className={`${styles['_authors']}`}>
          <p className={'text text_type_default text_color_gray'}>{book.volumeInfo?.authors ? book.volumeInfo.authors : ' '}</p>
        </div>
      </div>
    </>
  );
}

