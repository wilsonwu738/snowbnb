import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  // const openMenu = () => {
    
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };
  // // this useeffect is causing the modal to disappear
  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);
  
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  

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
        <div className="login-modal"><LoginFormModal /></div>
        <div className="signup-modal"><SignupFormModal /></div>
      </div>
  }
 


  return (
    
    <div className="profile">
      <button className='profile-button' onClick={() => setShowMenu(!showMenu)}>
        <i className="fa-solid fa-user"></i>
      </button>
      {showMenu && dropdownItems}
    </div>
  );
}

export default ProfileButton;