import React from 'react';
import './Template1.css';
import LocomotiveScroll from 'locomotive-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const convertYouTubeLink = (link) => {
  const videoIdRegex = /[?&]v=([a-zA-Z0-9_-]+)/;
  const match = link.match(videoIdRegex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?controls=0&autoplay=1&rel=0`;
  }
  return link;
};

const locomotiveScroll = new LocomotiveScroll();

function App() {
  return (
    <div>
      <div id='home' className="main">
        <div className="smol">
          <header className="navbar1">
            <div className="profile-container">
              <div className="logo">Portfolio</div>
            </div>
            <nav>
              <ul className="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#showreel">Work</a></li>
                <li><a href="#contact">Contack</a></li>

              </ul>
            </nav>
            <a href="/form">
            <button  className="get-started-btn px-8 bg-slate-600 text-white rounded-full shadow-lg hover:bg-slate-700 transition duration-300">
              Get Started
            </button></a>
          </header>

          <div className="hero-content">
            <h1 className="hero-title text-[10rem] font-bold font-serif mt-72 text-center">Hi there!</h1>
            <p className="hero-subtitle font-serif text-4xl font-medium text-center">Welcome to my portfolio! Let's connect and make great videos together.</p>
          </div>
        </div>
      </div>
      <div id='about' className='about text-gray-300 h-[100vh] bg-slate-600'>
        <h1 className='text-[10rem] pl-5 font-serif pt-52 text-left'>This is </h1>
        <h1 className='text-[10rem] font-extrabold font-serif -mt-60 ml-[28.5vw] text-left'> HARSH</h1>
        <h1 className='text-[15rem] -mt-40 pl-5'>.</h1>
        <p className='text-[2rem] -mt-[7vw] font-bold font-serif w-2/3 pl-24 text-left'>Description 1</p>
        <h1 className='text-[15rem] -mt-40 pl-5'>.</h1>
        <p className='text-[2rem] -mt-[7vw] font-bold font-serif w-2/3 pl-24 text-left'>Description 2</p>
        <h1 className='text-[15rem] -mt-40 pl-5'>.</h1>
        <p className='text-[2rem] -mt-[7vw] font-bold font-serif w-2/3 pl-24 text-left'>Description 3</p>
      </div>
      <div id='showreel' className='bg-[#1A1E25] h-[120vh]'>
        <h1 className='text-white text-[9rem] font-serif text-center'>Video 1</h1>
        <iframe
          width="90%"
          height="945"
          className='mb-4 ml-[5vw] rounded-[3vw]'
          src={'https://www.youtube.com/watch?v=7GssthztFZs'}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className='bg-[#1A1E25] h-[120vh]'>
        <h1 className='text-white text-[9rem] font-serif text-center'>Video 2</h1>
        <iframe
          width="90%"
          height="945"
          className='mb-4 ml-[5vw] rounded-[3vw]'
          src={'https://www.youtube.com/watch?v=7GssthztFZs'}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div id='socialmedia' className='social-media-section bg-[#f8f9fa] h-[50vh] flex flex-col items-center justify-center'>
        <h1 className='text-6xl font-serif mb-8'>Join the Editing Revolution!</h1>
        <div className='flex gap-8'>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon facebook">
            <FontAwesomeIcon icon={faFacebook} className="text-6xl text-blue-600 hover:scale-110 transition-transform" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon twitter">
            <FontAwesomeIcon icon={faTwitter} className="text-6xl text-blue-400 hover:scale-110 transition-transform" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon instagram">
            <FontAwesomeIcon icon={faInstagram} className="text-6xl text-pink-500 hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.youtube.com/c/sheryians" target="_blank" rel="noreferrer" className="social-icon youtube">
            <FontAwesomeIcon icon={faYoutube} className="text-6xl text-red-600 hover:scale-110 transition-transform" />
          </a>

        </div>
      </div>

      {/* Contact Section */}
      <div id='contact' className='contact-section bg-[#fdf7e5] h-[50vh] relative z-[9] flex flex-col items-center justify-center'>
        <h1 className='text-6xl font-serif mb-8'>Contact Me</h1>
        <div className='grid grid-cols-2 gap-8 w-3/4'>
          <div className='contact-box bg-white p-8 rounded-3xl shadow-lg'>
            <h3 className='text-3xl font-bold mb-4'>Phone</h3>
            <p className='text-xl'>+1-555-EDIT-123</p>
          </div>
          <div className='contact-box bg-white p-8 rounded-3xl shadow-lg'>
            <h3 className='text-3xl font-bold mb-4'>Email</h3>
            <p className='text-xl'>videoeditor@example.com</p>
          </div>
          <div className='contact-box bg-white p-8 rounded-3xl shadow-lg'>
            <h3 className='text-3xl font-bold mb-4'>Address</h3>
            <p className='text-xl'>India</p>
          </div>
          <div className='contact-box bg-white p-8 rounded-3xl shadow-lg'>
            <h3 className='text-3xl font-bold mb-4'>Languages</h3>
            <p className='text-xl'>English</p>
          </div>
        
        </div>
        <button className='botbtn bg-blue-500 mt-8 w-[20vw] hover:bg-blue-700 text-3xl text-white font-bold py-2 px-4 rounded-2xl transition duration-300'>
          Get in Touch 
        </button>
      </div>
    </div>
  );
}

export default App;
