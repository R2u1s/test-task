import React from 'react';

interface TUseModal {
  isModalOpen: boolean;
  openModal:()=>void;
  closeModal:()=>void;
}

export const useModal = ():TUseModal => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};