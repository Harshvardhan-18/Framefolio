import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rnd } from 'react-rnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faBold, faPalette, faFont, faPlus } from '@fortawesome/free-solid-svg-icons';
import { db } from '../context/Firebase';
import { collection, addDoc } from 'firebase/firestore';



function Template2() {
  const [elements, setElements] = useState([
    {
      id: 1,
      type: 'image',
      x: 100,
      y: 100,
      width: 200,
      height: 350,
      style: { border: 'none' },
      content: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/silhouette-of-a-guy-with-a-cap-at-red-sky-sunset-free-image.jpeg?h=800&quality=80',
    },
    {
      id: 2,
      type: 'text',
      x: 150,
      y: 150,
      width: 150,
      height: 50,
      style: { color: 'black', fontWeight: 'normal' },
      content: 'Text',
      fontSize: 40,
    },

  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const notify = () => toast.success("Template Saved !");
  const notify2 = () => toast.error("Failed to save template.");

  const [selectedId, setSelectedId] = useState(null);

  const saveTemplate = async () => {
    try {
      const docRef = await addDoc(collection(db, 'templates'), {
        elements,
        timestamp: new Date(),
      });
      notify();
    } catch (error) {
      console.error("Error saving template: ", error);
      notify2();
    }
  };

  const handleResize = (id, newWidth) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? { ...el, fontSize: Math.max(12, newWidth / 5) }
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

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      const newImageElement = {
        id: Date.now(),
        type: 'image',
        x: 850,
        y: 150,
        width: 200,
        height: 350,
        content: reader.result,
        style: { border: 'none' },
      };
      setElements((prev) => [...prev, newImageElement]);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleAddText = () => {
    const newTextElement = {
      id: Date.now(),
      type: 'text',
      x: 850,
      y: 200,
      width: 150,
      height: 50,
      content: 'New Text',
      fontSize: 30,
      style: { color: 'black', fontFamily: 'Arial' },
    };

    setElements((prev) => [...prev, newTextElement]);
  };


  return (
    <div style={{ height: '200vh', width: '99vw', position: 'relative', backgroundColor: '#f0f0f0' }}>
      <button
        onClick={handleAddText}
        className="bg-green-500 bg-opacity-60 hover:bg-opacity-90 rounded-xl text-white font-mono text-sm absolute mt-2 ml-2 px-2 py-1 z-10"
        style={{ cursor: 'pointer' }}
      >
        <FontAwesomeIcon icon={faPlus} /> Add Text
      </button>
      <label htmlFor="file-upload" className="bg-green-500 bg-opacity-60 hover:bg-opacity-90 rounded-xl text-white font-mono text-sm absolute mt-2 ml-28 px-2 py-1 z-10">
        <FontAwesomeIcon icon={faPlus} /> Add Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleAddImage}
        className="hidden"
      />
      <button
        onClick={saveTemplate}
        className="bg-blue-500 bg-opacity-60 hover:bg-opacity-90 rounded-xl text-white font-mono text-sm absolute mt-2 ml-60 px-2 py-1 z-10"
        style={{ cursor: 'pointer' }}
      >
        Save Template
      </button>
      <div>
        <ToastContainer  />
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
          minHeight={50}
          minWidth={50}
          bounds="parent"
          onResizeStop={(e, direction, ref) => handleResize(el.id, ref.offsetWidth)}
          onClick={() => setSelectedId(el.id)}
          style={{
            ...el.style,
            boxShadow: selectedId === el.id ? '4px 4px 12px rgba(0, 0, 1, 0.6)' : '0px 4px 8px rgba(0, 0, 0, 0.05)',
            backgroundColor: el.type === 'text' ? 'transparent' : 'white',
            textAlign: 'left',
          }}
        >
          {el.type === 'image' ? (
            <img
              src={el.content}
              alt={`Element ${el.id}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              draggable="false"
            />
          ) : (
            <h1
              contentEditable="true"
              suppressContentEditableWarning={true}
              spellCheck={false}
              style={{
                fontSize: `${el.fontSize}px`,
                margin: 0,
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
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
