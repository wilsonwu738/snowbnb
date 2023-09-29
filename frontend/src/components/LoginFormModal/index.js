// frontend/src/components/LoginFormModal/index.js

import React from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ onClose }) {

  return (
    <>
        <Modal onClose={onClose}>
          <div className='login-modal-content'>
            <LoginForm onClose={onClose}/>  
          </div>
        </Modal>
    </>
  );
}

export default LoginFormModal;

