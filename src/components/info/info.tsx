import React from 'react';
import styles from './info.module.css';
import { useSelector } from '../../services/hooks';

export const Info: React.FC = () => {

  const store = useSelector((store) => ({
    person: store.persons.current,
  }));

  const name = store.person.name ? store.person.name : 'Нет имени';
  const phone = store.person.phone ? store.person.phone : 'нет номера';
  const mail = store.person.email ? store.person.email : 'нет почты';
  const hireDate = store.person.hire_date ? store.person.hire_date : 'Нет даты';
  const position = store.person.position_name ? store.person.position_name : 'нет должности';
  const department = store.person.department ? store.person.department : 'нет подразделения';
  const info = store.person.address ? store.person.address : 'нет доп.информации';

  return (
    <>
      <div className={`${styles['_content']}`}>
        <p className={'text text_type_large_bold text_color_black text_overflow_one'}>{name as string}</p>
        <div className={`${styles['_contacts-field']}`}>
          <div className={`${styles['_contact']}`}>
            <p className={`${styles['_contact-title']} text text_type_large`}>Телефон:</p>
            <p className={'text text_type_medium text_color_gray text_overflow_one'}>{phone}</p>
          </div>
          <div className={`${styles['_contact']}`}>
            <p className={`${styles['_contact-title']} text text_type_large`}>Почта:</p>
            <p className={'text text_type_medium text_color_gray text_overflow_one'}>{mail}</p>
          </div>
          <div className={`${styles['_contact']}`}>
            <p className={`${styles['_contact-title']} text text_type_large`}>Дата приема:</p>
            <p className={'text text_type_medium text_color_gray text_overflow_one'}>{hireDate}</p>
          </div>
          <div className={`${styles['_contact']}`}>
            <p className={`${styles['_contact-title']} text text_type_large`}>Должность:</p>
            <p className={'text text_type_medium text_color_gray text_overflow_one'}>{position}</p>
          </div>
          <div className={`${styles['_contact']}`}>
            <p className={`${styles['_contact-title']} text text_type_large`}>Подразделение:</p>
            <p className={'text text_type_medium text_color_gray text_overflow_three'}>{department}</p>
          </div>
        </div>
        <div className={`${styles['_additional-info']}`}>
          <p className={'text text_type_large'}>Дополнительная информация:</p>
          <p className={'text text_type_medium text_color_gray text_overflow_three'}>{info}</p>
        </div>
      </div>
    </>
  );
}

