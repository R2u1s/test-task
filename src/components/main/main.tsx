import React from 'react';
import styles from './main.module.css';
import { Input } from 'antd';
import { Result } from "../result/result";
import { useModal } from '../../hooks/useModal';
import { useDispatch } from '../../services/hooks';
import { Modal } from '../modal/modal';
import { Info } from '../info/info';
import { clearPersonInfo } from '../../services/actions/persons';

export const Main: React.FC = () => {

  const dispatch = useDispatch();

  const { Search } = Input;

  const [valueInput, setValueInput] = React.useState<string>('');
  const [scroll, setScroll] = React.useState<any>(); //состояние, сохраняющее положение скролла

  const onSearchClick = () => {
  };

  const { isModalOpen, openModal, closeModal } = useModal();

  //добавляем к колбэкам модального окна сохранение положения скролла
  const onOpenModal = () => {
    setScroll(window.scrollY);
    openModal();
    console.log();
  };

  const onCloseModal = () => {
    closeModal();
    setTimeout(() => {
      window.scrollTo(0, scroll); //если без таймаута, то почему-то по кнопке закрытия окна скролл вверху страницы
      setScroll(0);
      dispatch(clearPersonInfo());
    }, 300)                       //видимо вызывается ререндер, но почему - не пойму
  };                              //вот здесь что-то есть https://dev.to/renegadedev/save-scroll-state-in-react-when-visiting-other-page-with-a-custom-hook-57nk

  return (
    <main className={`${styles['_content']}`}>
      <Search
        className={`${styles['_search']}`}
        placeholder="Введите имя"
        onSearch={onSearchClick}
        onChange={e => setValueInput(e.target.value)}
        value={valueInput}
        size={'large'}
      />
      <Result
        value={valueInput}
        onOpenModal={onOpenModal}
      />
      <Modal active={isModalOpen} setClose={onCloseModal}><Info /></Modal>
    </main>
  );
}