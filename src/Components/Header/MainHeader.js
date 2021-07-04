import React from 'react';
import logo from '../../undraw_adventure_4hum 1.svg';
import './main-header.scss';
const MainHeader = ({ correct }) => {
  return (
    <header className='main-header'>
      <p className='main-header-text'>Country quiz</p>
      {correct !== false && (
        <img src={logo} alt='logo' className='main-header-logo' />
      )}
    </header>
  );
};

export default MainHeader;
