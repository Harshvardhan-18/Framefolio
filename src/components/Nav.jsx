import React, { useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import logo from '../components/logo.png';
import Headroom from 'react-headroom';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

function Nav() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false); 
  const [showModal2, setShowModal2] = useState(false); 

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div className='bg-[#ede8f5]'>
      <Headroom style={{ transition: 'all 0.3s ease-in-out' }}>
        <div className='navbar w-full px-20 flex justify-between backdrop-blur-sm bg-transparent items-center  sticky z-10'>
          <div className='logo w-40 pt-0'>
            <a href="#home">
              <img src={logo} alt="Logo" className="h-24 w-24 cursor-pointer pt-0 object-contain scale-90" />
            </a>
          </div>
          <div id='link' className='flex gap-5 text-lg items-center'>
            {["Home", "Templates", "Contact"].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                id='links'
                style={{ scrollBehavior: 'smooth' }}
                className="relative tracking-tight border border-opacity-25 border-black text-black font-medium overflow-hidden hover:text-[#e6ded4] rounded-3xl px-4 py-2"
              >
                {item}
              </a>
            ))}
            {currentUser ? (
              <div className="ml-20 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-semibold text-gray-700">
                    {currentUser.email[0].toUpperCase()}
                  </span>
                )}
              </div>
            ) : (
              <button
                onClick={toggleModal}
                id="links"
                className=" loginbtn ml-20 relative tracking-tight border border-opacity-25 border-black text-black font-medium overflow-hidden hover:text-[#e6ded4] rounded-3xl px-4 py-2"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </Headroom>
      {showModal && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-content p-8 rounded-lg relative">
            <button
              onClick={toggleModal}
              className="absolute top-16 right-10 text-white font-bold text-4xl"
            >
              &times;
            </button>
            <Login closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
