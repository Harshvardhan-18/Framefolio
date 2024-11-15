import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../context/Firebase';
import logo from '../components/logo.png';
import { useAuth } from '../context/AuthContext';
import {doSignInWithGoogle} from '../context/auth'
import SignUp from './Signup'

function Login({ closeModal}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [showModal2, setShowModal2] = useState(false);

  const toggleModal2 = () => {
    setShowModal2(!showModal2);
  };
  const closeModal2=()=>{
    setShowModal2(null);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth,email, password);
      closeModal();
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await doSignInWithGoogle();
      closeModal();
    } catch (error) {
      setError('Failed to log in with Google.');
      console.error('Google login error:', error);
    }
  };

  return (
    <div className="flex flex-col bg-transparent w-[27vw] h-[40vw] items-center justify-center ">
      
      
      <div className="backdrop-blur-lg shadow-lg rounded-lg p-8  w-full">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-black">Welcome Back</h1>
          <p className="mt-2 text-lg text-gray-300">Please login to your account</p>
        </div>

        {error && <p className="text-red-500 text-sm font-semibold ml-4 -mb-4 mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-xl font-medium text-black">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full mt-2 px-4 py-2 border-2 bg-transparent text-gray-200 border-black border-opacity-50 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xl  text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full mt-2 px-4 py-2 border-2 bg-transparent text-gray-200 border-black border-opacity-50 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-xl bg-black text-[#e6ded4]  rounded-3xl hover:bg-opacity-80 focus:ring-2 focus:ring-black focus:outline-none transition duration-300"
          >
            Log in
          </button>

          <div className="flex items-center justify-center">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-sm text-center text-white uppercase px-2">or</span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2 px-4 bg-transparent text-gray-200 text-2xl rounded-3xl border border-black focus:ring-2 focus:ring-black focus:outline-none transition duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/>
                <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"/>
                <path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"/>
                <path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"/>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
                </clipPath>
              </defs>
            </svg>
            Sign in with Google
          </button>

          <p className="text-xl text-center text-black mt-4">
            Don't have an account?{' '}
            <a  onClick={toggleModal2} className="text-gray-300 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
      {showModal2 && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="modal-content p-8 rounded-lg relative">
            <button
              onClick={toggleModal2}
              className="absolute top-0 right-10 text-white font-bold text-4xl"
            >
              &times;
            </button>
            <SignUp closeModal2={closeModal2}
                    closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
