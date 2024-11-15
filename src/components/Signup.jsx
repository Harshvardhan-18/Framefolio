import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../context/Firebase'; // Make sure this is initialized properly
import logo from '../components/logo.png';
import { doSignInWithGoogle } from '../context/auth';
import {createUserWithEmailAndPassword} from 'firebase/auth';

function SignUp({closeModal2 ,closeModal}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Ensure email and password fields are strings
    if (typeof email !== 'string' || typeof password !== 'string') {
        setError('Email and password must be valid strings');
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    try {
        // Call Firebase function to create a user
        await createUserWithEmailAndPassword(auth,email, password);
        closeModal2();
        closeModal();
    } catch (error) {
        if (error.code === 'auth/invalid-email') {
            setError('Invalid email format');
        } else if (error.code === 'auth/weak-password') {
            setError('Password is too weak');
        } else {
            setError('Failed to create an account: ' + error.message);
        }
        console.error('Signup error:', error);
    }
};

  const handleGoogleSignUp = async () => {
    try {
      await doSignInWithGoogle();
      closeModal2();
      closeModal();
    } catch (error) {
      setError('Failed to sign up with Google.');
      console.error('Google signup error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-[27vw] h-[40vw] justify-center  ">
      
      <div className="backdrop-blur-lg shadow-lg rounded-lg p-8  w-full">
        <div className="text-center">
          <h1 className="text-[42px] font-semibold text-black">Create an Account</h1>
          <p className="mt-2 text-lg text-gray-300">Sign up with your email and password</p>
        </div>

        {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}

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
              className="w-full mt-2 px-4 py-2 border-2 bg-transparent text-gray-200 border-black border-opacity-30 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xl font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full mt-2 px-4 py-2 border-2 bg-transparent text-gray-200 border-black border-opacity-30 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="confirm_password" className="block text-xl font-medium text-black">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full mt-2 px-4 py-2 border-2 bg-transparent text-gray-200 border-black border-opacity-30 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-[#e6ded4] text-lg font-medium rounded-3xl hover:bg-opacity-80 focus:ring-2 focus:ring-black focus:outline-none transition duration-300"
          >
            Sign Up
          </button>

          <div className="flex items-center justify-center">
            <hr className="w-36 border-t border-gray-300" />
            <span className="px-3 text-md text-gray-300">OR</span>
            <hr className="w-36 border-t border-gray-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full py-2 px-4 bg-transparent text-[1.5em] text-white font-medium rounded-3xl border border-black  focus:ring-2 focus:ring-black focus:outline-none transition duration-300 flex items-center justify-center"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>

          <p className="text-xl text-center text-black mt-4">
            Already have an account?{' '}
            <a onClick={closeModal2}  className="text-gray-300 hover:underline font-semibold">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
