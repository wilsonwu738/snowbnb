import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  // { isShow: flase}
  const [showMenu, setShowMenu] = useState(false);
  
  // const openMenu = () => {
  //   if (showMenu.isShown) return;
  //   setShowMenu({ isShow: true});
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
    
    <>
      <button className='profile-button' onClick={() => setShowMenu(!showMenu)}>
        <div className="icons">
          <span><i class="fa-solid fa-bars"></i></span>
          <span className="icon"><i className="fa-solid fa-user"></i></span>
        </div>
      </button>
      {showMenu && dropdownItems}
    </>
  );
}

export default ProfileButton;