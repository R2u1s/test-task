import React from 'react';
import styles from './card.module.css';
import { TPersonInfo } from '../../types/types';
import { useDispatch } from '../../services/hooks';
import { writePersonInfo } from '../../services/actions/persons';
import phoneIcon from '../../icons/phone.svg';
import mailIcon from '../../icons/mail.svg';

export const Card: React.FC<{ person: TPersonInfo, openModal: () => void }> = ({ person, openModal}) => {

  const dispatch = useDispatch();

  const name = person.name ? person.name : 'Нет имени';
  const phone = person.phone ? person.phone : 'нет номера';
  const mail = person.email ? person.email : 'нет почты';

  return (
    <>
      <div
        className={`${styles['_content']}`}
        onClick={() => {
          openModal();
          dispatch(writePersonInfo(person)); //записываем инфо о книге в хранилище, чтобы открыть в отдельном окне
        }}
        >
        <div className={`${styles['_name']}`}>
          <p className={'text text_type_large_bold text_color_black text_overflow_one'}>{name as string}</p>
        </div>
        <div className={`${styles['_phone']}`}>
          <div className={`${styles['_contact']}`}>
            <img className={`${styles['_icon']}`} src={phoneIcon as string} />
            <p className={'text text_type_little text_color_gray text_overflow_one'}>{phone}</p>
          </div>
        </div>
        <div className={`${styles['_mail']}`}>
          <div className={`${styles['_contact']}`}>
            <img className={`${styles['_icon']}`} src={mailIcon as string} />
            <p className={'text text_type_little text_color_gray text_overflow_one'}>{mail}</p>
          </div>
        </div>
      </div>
    </>
  );
}

