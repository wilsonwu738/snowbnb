import React from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({ onClose }) {
  // const [showModal, setShowModal] = useState(false);

  // const handleSignupClick = (e) => {
  //   e.stopPropagation();
  //   setShowModal(true)
  // }
  return (
    <>
        <Modal onClose={onClose}>
            <SignupForm onClose={onClose}/>
        </Modal>
    </>
  );
}

export default SignupFormModal;