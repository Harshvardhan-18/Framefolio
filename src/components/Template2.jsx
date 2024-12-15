import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rnd } from 'react-rnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SingleLevelDropdownMenu } from './SingleLevelDropdownMenu';
import { faTrashCan, faBold, faPalette, faFont, faPlus, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { db } from '../context/Firebase';
import { collection, addDoc, getDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';



function Template2() {
  const navigate = useNavigate();
  const [elements, setElements] = useState([
    
    
    {
      id: uuidv4(),
      type: 'text',
      x: 650,
      y: 300,
      width: 500,
      height: 50,
      style: { color: 'black', fontWeight: 'bold', fontFamily: 'Georgia' },
      content: 'Hi There!',
      fontSize: 40,
    },

  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  const notify = () => toast.success("Template Saved !");
  const notify2 = () => toast.error("Failed to save template.");

  const [selectedId, setSelectedId] = useState(null);

  const saveTemplate = async () => {

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        await setDoc(doc(db, "templates", userId), {
          elements,
          timestamp: new Date(),
        });
        notify();
        navigate(`/portfolio/${userId}`);
      } else {
        console.error("No user is logged in.");
        notify2();
      }
    } catch (error) {
      console.error("Error saving template: ", error);
      notify2();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && selectedId) {
        handleDelete(selectedId);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const handleResize = (id, newHeight) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? { ...el, fontSize: Math.max(12, newHeight / 1.5) }
          : el
      )
    );
  };

  const toggleTextColor = (id) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? { ...el, style: { ...el.style, color: el.style.color === 'black' ? 'white' : 'black' } }
          : el
      )
    );
  };

  const handleDelete = (id) => {
    setElements(elements.filter((el) => el.id !== id));
    setSelectedId(null);
  };

  const fonts = ['Georgia', 'Courier New', 'Monospace', 'Segoe UI', 'Gill Sans', 'Lucida Sans'];
  const toggleFont = (id) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id && el.type === 'text'
          ? {
            ...el,
            style: {
              ...el.style,
              fontFamily: fonts[(fonts.indexOf(el.style.fontFamily) + 1) % fonts.length],
            },
          }
          : el
      )
    );
  };

  const toggleBold = (id) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id && el.type === 'text'
          ? {
            ...el,
            style: {
              ...el.style,
              fontWeight: el.style.fontWeight === 'normal' ? 'bold' : 'normal',
            },
          }
          : el
      )
    );
  };
  const uploadImageToGitHub = async (file, repo, path, token) => {
    const base64 = await fileToBase64(file);
    const url = `https://api.github.com/repos/${repo}/contents/${path}`;

    try {
      const response = await axios.put(
        url,
        {
          message: `Upload ${file.name}`,
          content: base64.split(',')[1], // Remove "data:image/*;base64," prefix
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.content.download_url; // Return the raw image URL
    } catch (error) {
      toast.error('Error uploading image:');
    }
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
      toast.error('File size exceeds the 5MB limit.');
      return;
    }

    const repo = 'Harshvardhan-18/static-images';
    const path = `images/${Date.now()}-${file.name}`;
    const token = import.meta.env.VITE_TOKEN;

    try {
      const imageUrl = await uploadImageToGitHub(file, repo, path, token);
      const newImage = {
        id: uuidv4(),
        type: 'image',
        content: imageUrl,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
      };
      setElements((prev) => [...prev, newImage]);
    } catch (error) {
      toast.error('Error uploading image: ' + error.message);
    }
  };
  const handleAddText = () => {
    const newTextElement = {
      id: uuidv4(),
      type: 'text',
      x: 850,
      y: 200,
      width: 150,
      height: 70,
      content: 'New Text',
      fontSize: 30,
      style: { color: 'black', fontFamily: 'Arial' },
    };

    setElements((prev) => [...prev, newTextElement]);
  };




  const handleTextInputEfficient = (id, event) => {
    const updatedText = event.currentTarget.textContent;
    const element = event.currentTarget;

    // Get current selection and caret position
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const caretPosition = range.startOffset;

    // Update the text content in state
    setElements((prev) =>
      prev.map((item) =>
        item.id === id && item.content !== updatedText
          ? { ...item, content: updatedText }
          : item
      )
    );

    // Restore the caret position
    requestAnimationFrame(() => {
      if (element.childNodes[0]) {
        const newRange = document.createRange();
        newRange.setStart(element.childNodes[0], Math.min(caretPosition, updatedText.length));
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    });
  };
  const menuItems = [
    {
      title: 'Add Text',
      icon: <FontAwesomeIcon icon={faFont} />,
      action: handleAddText,
    },
    {
      title: 'Add Image',
      icon: <FontAwesomeIcon icon={faImage} />,
      action: () => document.getElementById('file-upload').click(),
    },
    {
      title: 'Add Video',
      icon: <FontAwesomeIcon icon={faVideo} />,
      action: () => setShowVideoPopup(true),
    },
  ];



  const [videoUrl, setVideoUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  const handleEmbed = () => {
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    if (videoId) {
      const newVideo = {
        id: uuidv4(),
        type: 'video',
        content: `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0`,
        x: 100,
        y: 100,
        width: 300,
        height: 200,
      };
      setElements((prev) => [...prev, newVideo]);
      setShowVideoPopup(false);
      setVideoUrl('');
    } else {
      toast.error('Invalid YouTube URL');
    }
  };



  return (
    <div style={{ height: '200vh', width: '98.9vw', position: 'relative', backgroundColor: '#f0f0f0' }}>
      <div className="menu-container sticky flex top-2  ml-[1vw] z-20">
        <SingleLevelDropdownMenu items={menuItems} />
        <button
          onClick={saveTemplate}
          className="bg-gray-500 bg-opacity-60 hover:bg-opacity-90 rounded-xl text-white font-serif text-md sticky top-2 ml-[85.5vw] mr-2 w-[20vw] h-8 px-2 py-1 z-10"
          style={{ cursor: 'pointer' }}
        >
          Save Template
        </button>
      </div>
      <div>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleAddImage}
        />
        <ToastContainer />
      </div>

      <header className="navbar1 -mt-4">
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

        <button className="get-started-btn px-8 bg-slate-600 text-white rounded-full shadow-lg hover:bg-slate-700 transition duration-300">
          Connect
        </button>
      </header>
      {showVideoPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
          onClick={() => setShowVideoPopup(false)}
        >
          <div
            className="bg-transparent backdrop-blur-lg border-2  p-4 rounded-lg shadow-md w-[30vw]"
            onClick={(e) => e.stopPropagation()}
          // Prevent closing when clicking inside
          >
            <h2 className="text-2xl font-bold font-serif mb-4">Add YouTube Video</h2>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube link here"
              className="w-full px-2 py-1 border-2 bg-transparent text-white font-mono rounded-lg mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowVideoPopup(false)}
                className="bg-red-500 hover:bg-red-600 text-white  text-lg font-serif px-3 py-1 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleEmbed}
                className="bg-green-500 hover:bg-green-60  text-white text-lg font-serif px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}


      <div>
        <ToastContainer />
      </div>
      {elements.map((el) => (
        <Rnd
          key={el.id}
          default={{
            x: el.x,
            y: el.y,
            width: el.width,
            height: el.height,
          }}
          minHeight={30}
          minWidth={50}
          bounds="parent"
          onDragStop={(e, data) =>
            setElements((prev) =>
              prev.map((item) =>
                item.id === el.id
                  ? { ...item, x: data.x, y: data.y }
                  : item
              )
            )
          }
          onResizeStop={(e, direction, ref, delta, position) => {
            handleResize(el.id, ref.offsetHeight);
            setElements((prev) =>
              prev.map((item) =>
                item.id === el.id
                  ? {
                    ...item,
                    width: parseFloat(ref.style.width),
                    height: parseFloat(ref.style.height),
                    x: position.x,
                    y: position.y,
                  }
                  : item
              )

            );
          }}

          onClick={() => setSelectedId(el.id)}
          style={{
            ...el.style,
            boxShadow: selectedId === el.id ? '4px 4px 12px rgba(0, 0, 1, 0.6)' : '0px 4px 8px rgba(0, 0, 0, 0.05)',
            backgroundColor: el.type === 'text' ? 'transparent' : 'white',
            textAlign: 'left',
          }}
        >
          {el.type === 'image' && (
            <img
              src={el.content}
              alt={`Element${el.id}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              draggable="false"
            />)}

          {el.type === 'video' && (
            <iframe
              src={el.content}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              draggable="false"
              allowFullScreen
            />
          )}

          {el.type === 'text' && (
            <h1
              contentEditable="true"
              suppressContentEditableWarning={true}
              spellCheck={false}
              style={{
                fontSize: `${el.fontSize}px`,
                margin: 0,
                height: '100%',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'baseline',

              }}
              onInput={(e) => handleTextInputEfficient(el.id, e)}
            >
              {el.content}
            </h1>
          )}
          {selectedId === el.id && (
            <button
              onClick={() => handleDelete(el.id)}
              className="bg-red-500 bg-opacity-60 hover:bg-opacity-90 rounded-xl text-white font-mono text-sm absolute mt-2  px-2 py-1 z-10"
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>)}
          {selectedId === el.id && el.type === 'text' && (
            <button
              onClick={() => toggleTextColor(el.id)}
              className="bg-lime-600 bg-opacity-60 hover:bg-opacity-90 rounded-xl text-white font-mono text-sm absolute mt-2 ml-16 px-2 py-1 z-10"
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faPalette} />
            </button>)}
          {selectedId === el.id && el.type === 'text' && (
            <button
              onClick={() => toggleFont(el.id)}
              className="bg-orange-700 bg-opacity-60 hover:bg-opacity-90 rounded-xl text-white font-mono text-sm absolute mt-2 ml-24  px-2 py-1 z-10"
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faFont} />
            </button>)}
          {selectedId === el.id && el.type === 'text' && (
            <button
              onClick={() => toggleBold(el.id)}
              className="bg-gray-700 bg-opacity-60 hover:bg-opacity-90 rounded-xl text-white font-mono text-sm absolute mt-2 ml-8  px-2 py-1 z-10"
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faBold} />
            </button>)}

        </Rnd>

      ))}


    </div>

  );
}

export default Template2;
