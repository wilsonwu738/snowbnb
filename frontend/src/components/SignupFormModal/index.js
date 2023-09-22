import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  const handleSignupClick = (e) => {
    e.stopPropagation();
    setShowModal(true)
  }


  return (
    <>
      <button onClick={handleSignupClick}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='signup-modal-content'>
            <SignupForm />

          </div>
          
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;