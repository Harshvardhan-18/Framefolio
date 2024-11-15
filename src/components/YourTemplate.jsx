import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../context/Firebase';
import './Template1.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import LoadingSpinner from './Loading';

function YourTemplate() {
  const { userId } = useParams(); // Get userId from the route
  const [portfolio, setPortfolio] = useState(null);

  const convertYouTubeLink = (link) => {
    const videoIdRegex = /[?&]v=([a-zA-Z0-9_-]+)/;
    const match = link.match(videoIdRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?controls=0&autoplay=1&rel=0&mute=1`;
    }
    return link; 
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolioRef = doc(db, 'portfolios', userId); // Reference document based on userId
        const portfolioDoc = await getDoc(portfolioRef);

        if (portfolioDoc.exists()) {
          const data = portfolioDoc.data();
          setPortfolio({
            ...data,
            id: portfolioDoc.id,
            video1: convertYouTubeLink(data.video1),
            video2: convertYouTubeLink(data.video2),
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, [userId]); // Refetch data if userId changes

  if (!portfolio) {
    return <LoadingSpinner />;
  }

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
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#showreel">Work</a></li>
              </ul>
            </nav>
            <a href="#socialmedia" className="get-started-btn">Contact</a>
          </header>

          <div className="hero-content">
            <h1 className="hero-title text-[10rem] font-bold font-serif mt-72 text-center">Hi there!</h1>
            <p className="hero-subtitle font-serif text-4xl font-medium text-center">Welcome to my portfolio! Let's connect and make great videos together.</p>
          </div>
        </div>
      </div>
      <div id='about' className='about text-gray-300 h-[100vh] bg-slate-600'>
        <h1 className='text-[9rem] pl-5 font-serif pt-52 text-left'>This is </h1>
        <h1 className='text-[10rem] font-extrabold font-serif -mt-[12.3vw] ml-[25vw] text-left'>{portfolio.name}</h1>
        <h1 className='text-[15rem] -mt-40 pl-5'>.</h1>
        <p className='text-[2rem] -mt-[7vw] font-bold font-serif w-2/3 pl-24 text-left'>{portfolio.description1}</p>
        <h1 className='text-[15rem] -mt-40 pl-5'>.</h1>
        <p className='text-[2rem] -mt-[7vw] font-bold font-serif w-2/3 pl-24 text-left'>{portfolio.description2}</p>
        <h1 className='text-[15rem] -mt-40 pl-5'>.</h1>
        <p className='text-[2rem] -mt-[7vw] font-bold font-serif w-2/3 pl-24 text-left'>{portfolio.description3}</p>
      </div>
      <div id='showreel' className='bg-[#1A1E25] h-[120vh]'>
        <h1 className='text-white text-[9rem] font-serif text-center'>{portfolio.video1Title}</h1>
        <iframe
          width="90%"
          height="945"
          className='mb-4 ml-[5vw] rounded-[3vw]'
          src={portfolio.video1}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className='bg-[#1A1E25] h-[120vh]'>
        <h1 className='text-white text-[9rem] font-serif text-center'>{portfolio.video2Title}</h1>
        <iframe
          width="90%"
          height="945"
          className='mb-4 ml-[5vw] rounded-[3vw]'
          src={portfolio.video2}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div id='socialmedia' className='social-media-section bg-[#f8f9fa] h-[50vh] flex flex-col items-center justify-center'>
        <h1 className='text-6xl font-serif mb-8'>Join the Editing Revolution!</h1>
        <div className='flex gap-8'>
          <a href={portfolio.facebook} target="_blank" rel="noreferrer" className="social-icon facebook">
            <FontAwesomeIcon icon={faFacebook} className="text-6xl text-blue-600 hover:scale-110 transition-transform" />
          </a>
          <a href={portfolio.twitter} target="_blank" rel="noreferrer" className="social-icon twitter">
            <FontAwesomeIcon icon={faTwitter} className="text-6xl text-blue-400 hover:scale-110 transition-transform" />
          </a>
          <a href={portfolio.instagram} target="_blank" rel="noreferrer" className="social-icon instagram">
            <FontAwesomeIcon icon={faInstagram} className="text-6xl text-pink-500 hover:scale-110 transition-transform" />
          </a>
          <a href={portfolio.youtube} target="_blank" rel="noreferrer" className="social-icon youtube">
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
            <p className='text-xl'>{portfolio.contactNo}</p>
          </div>
          <div className='contact-box bg-white p-8 rounded-3xl shadow-lg'>
            <h3 className='text-3xl font-bold mb-4'>Email</h3>
            <p className='text-xl'>{portfolio.email}</p>
          </div>
          <div className='contact-box bg-white p-8 rounded-3xl shadow-lg'>
            <h3 className='text-3xl font-bold mb-4'>{portfolio.address}</h3>
            <p className='text-xl'>India</p>
          </div>
          <div className='contact-box bg-white p-8 rounded-3xl shadow-lg'>
            <h3 className='text-3xl font-bold mb-4'>{portfolio.languages}</h3>
            <p className='text-xl'>English</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourTemplate;
