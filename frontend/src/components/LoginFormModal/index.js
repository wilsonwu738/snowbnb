// frontend/src/components/LoginFormModal/index.js

import React from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ onClose }) {

  return (
    <>
        <Modal onClose={onClose}>
            <LoginForm onClose={onClose}/>  
        </Modal>
    </>
  );
}

export default LoginFormModal;

