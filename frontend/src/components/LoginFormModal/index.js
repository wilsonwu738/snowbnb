// frontend/src/components/LoginFormModal/index.js

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  }
// Will log true after the state is set to true and the component re-renders
  // useEffect(() => {
  //   console.log("Modal state:", showModal); 
  // }, [showModal]);

  return (
    <>
      <button onClick={handleLoginClick}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='login-modal-content'>
            <LoginForm />  
          </div>
          
          
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

