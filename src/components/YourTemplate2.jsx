import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../context/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Spinner from './Loading';

function YourTemplate2({}) {
  const [elements, setElements] = useState([]);
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchTemplate = async (id) => {
    try {
      const docRef = doc(db, "templates", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        toast.error("Portfolio not found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      return null;
    }
  };

  const loadTemplate = async (id) => {
    setLoading(true);
    const templateData = await fetchTemplate(id);
    if (templateData) {
      setElements(templateData.elements || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTemplate(userId);
  }, [userId]);

  return (
    <div className='bg-gray-100 relative'>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='sticky top-4 h-[300vh]'>
      <header className="navbar1 mt-6 sticky top-4 ">
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
            
            <button  className="get-started-btn px-8 bg-slate-600 text-white rounded-full shadow-lg hover:bg-slate-700 transition duration-300">
              Connect
            </button>
          </header>
      

      {loading && <div><Spinner/></div> }
      

      <div style={{ marginTop: "100px" }}>
      
        {!loading &&
          elements.map((el, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
                
              }}
            >
              {el.type === 'image' && (
                <img
                  src={el.content}
                  alt={`Template Element ${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) } 
              {el.type === 'text'&&(
                <h1
                  style={{
                    color: el.style?.color || 'black',
                    fontSize: `${el.fontSize || 16}px`,
                    fontWeight: el.style?.fontWeight || 'normal',
                    fontFamily: el.style?.fontFamily || 'Arial',
                  }}
                >
                  {el.content}
                </h1>
              )}
              {el.type ==='video' && (
            <iframe
              src={el.content}
              style={{
              width:"100%",
              height:"100%"}}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              
            />
          ) }
            </div>
          ))}
      </div>
      </div>
    </div>
  );
}

export default YourTemplate2;
