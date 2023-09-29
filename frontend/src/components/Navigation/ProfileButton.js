import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (
        e.target.closest('.profile-dropdown') ||
        e.target.closest('.login-modal-content') ||
        e.target.closest('.signup-modal-content')
      ) 
      return;
      setShowMenu(false);  
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

 

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let dropdownItems;
  if (user) {
    dropdownItems = 
      <div className="profile-dropdown">
        <button onClick={logout}>Log Out</button>
      </div>
  } else {
    dropdownItems = 
      <div className="profile-dropdown">
        <button onClick= {() => {setShowMenu(false); setShowLogin(true)}}>Log In</button>
        <button onClick= {() => {setShowMenu(false); setShowSignup(true)}}>Sign Up</button>

      </div>
       
  }

  // <div><LoginFormModal hideMenu={() => setShowMenu(false)}/></div>
  // <div><SignupFormModal hideMenu={() => setShowMenu(false)}/></div>


  return (
    
    <>
      <button className='profile-button' onClick={() => setShowMenu(!showMenu)}>
        <div className="icons">
          <span><i className="fa-solid fa-bars"></i></span>
          <span className="icon"><i className="fa-solid fa-user"></i></span>
        </div>
      </button>
      {showMenu && dropdownItems}
      {showLogin && <LoginFormModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupFormModal onClose={() => setShowSignup(false)} />}

    </>
  );
}

export default ProfileButton;