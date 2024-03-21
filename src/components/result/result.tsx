import React from 'react';
import styles from './result.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { Loader } from '../loader/loader';
import { Card } from '../card/card';
import { firstSearch, nextSearch } from '../../services/actions/books';
import { PAGINATION_QTY } from '../../constants/api';
import { FilterStates, SortStates } from '../../types/enums';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import { Info } from '../info/info';
import { clearBookInfo } from '../../services/actions/books';

export const Result: React.FC<{
  filter: FilterStates,
  sort: SortStates,
  isModalOpen: boolean,
  openModal: () => void,
  closeModal: () => void
}> = ({ filter, sort, isModalOpen, openModal, closeModal }) => {

  const dispatch = useDispatch();

  const [scroll, setScroll] = React.useState<any>(); //состояние, сохраняющее положение скролла

  //добавляем к колбэкам модального окна сохранение положения скролла
  const onOpenModal = () => {
    setScroll(window.scrollY);
    openModal();
  };

  const onCloseModal = () => {
    closeModal();
    dispatch(clearBookInfo());
    setTimeout(() => {
      window.scrollTo(0, scroll); //если без таймаута, то почему-то по кнопке закрытия окна скролл вверху страницы
    }, 50)                          //видимо вызывается ререндер, но почему - не пойму
  };                              //вот здесь что-то есть https://dev.to/renegadedev/save-scroll-state-in-react-when-visiting-other-page-with-a-custom-hook-57nk

  const store = useSelector((store) => ({
    searchText: store.books.searchText,
    books: store.books.books,
    qty: store.books.qty,
    firstSearchRequest: store.books.firstSearchRequest,
    firstSearchFailed: store.books.firstSearchFailed,
    nextSearchRequest: store.books.nextSearchRequest,
    nextSearchFailed: store.books.nextSearchFailed,
  }));

  const onLoadMoreClick = () => {
    dispatch(nextSearch(
      store.searchText,
      sort,
      filter,
      store.books.length, // отправляем экшн с запросом к серверу. Тот же текст запроса берем из стора
      store.qty - store.books.length < PAGINATION_QTY ?       // два числа указываем для реализации пагинации
        store.qty - store.books.length :
        PAGINATION_QTY,
    ));
  };

  React.useEffect(() => {
    if (store.books.length > 0) {
      dispatch(firstSearch(
        store.searchText,
        sort,
        filter
      ));
    }
  }, [sort, filter]);

  const content = React.useMemo(
    () => {
      return (
        store.firstSearchRequest ? <Loader /> :
          //если поиск удачный, то показываем его, иначе крутим лоадер.
          store.firstSearchFailed ? 'Ошибка соединения с сервером' :
            <>
              <p className={'text text_type_bold text_color_black margin-top_15'}>Found {store.qty} results</p>
              <ul className={`${styles['_cardsList']}`}>
                {store.books.length > 0 && store.books.map((item: any, index: number) => {
                  return <li key={index}>
                    <Card book={item} openModal={onOpenModal} />
                  </li>
                })}
              </ul>
              {(store.books.length < store.qty && !store.nextSearchFailed) && (store.nextSearchRequest ? <Loader /> :
                //не показываем кнопку если уже отображены все книги или от сервера пришла ошибка. Крутим лоадер во время запроса
                store.firstSearchFailed ? 'Ошибка соединения с сервером' :
                  <p className={'text text_type_underline text_color_gray text_link'} onClick={onLoadMoreClick}>Load more</p>)}
            </>
      )
    },
    [store.books, store.firstSearchRequest, store.firstSearchFailed, store.nextSearchRequest]
  );

  return (
    <>
      <section className={`${styles['_content']}`}>
        {isModalOpen ?
          <Modal active={isModalOpen} setClose={onCloseModal}><Info setClose={onCloseModal} /></Modal>
          :
          <>{content}</>}
      </section>
    </>
  );
}

