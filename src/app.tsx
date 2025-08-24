import { FormControlled, FormUncontrolled, Modal, UserItem } from '@components';
import { useAppSelector } from '@redux/hooks';
import { selectAllUsers } from '@redux/userSlice';
import type { JSX } from 'react';
import { cloneElement, useState } from 'react';

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userForm, setUserForm] = useState<JSX.Element>(<FormControlled />);

  const usersList = useAppSelector(selectAllUsers);

  const openFormControlled = () => {
    setUserForm(<FormControlled />);
    setIsModalOpen(true);
  };

  const openFormUncontrolled = () => {
    setUserForm(<FormUncontrolled />);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <title>React Forms</title>
      <div className="flex h-dvh w-full flex-col gap-4 p-2">
        <header className="flex items-center justify-center gap-4">
          <button className="font-bold" onClick={openFormControlled} type="button">
            Controlled
          </button>
          <button className="font-bold" onClick={openFormUncontrolled} type="button">
            Uncontrolled
          </button>
        </header>
        <main className="flex flex-wrap justify-center gap-4">
          {usersList.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </main>
      </div>
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        {isModalOpen && cloneElement(userForm, { closeModal })}
      </Modal>
    </>
  );
};
