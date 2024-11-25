import React, { useState, useEffect } from 'react';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../context/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function YourTemplate2({ templateId = "uFejjESb6ynsehtf7zln" }) {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTemplate = async (id) => {
    try {
      const docRef = doc(db, "templates", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        toast.error("Template not found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching template:", error);
      toast.error("Failed to load template.");
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
    loadTemplate(templateId);
  }, [templateId]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      

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
              {el.type === 'image' ? (
                <img
                  src={el.content}
                  alt={`Template Element ${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
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
            </div>
          ))}
      </div>
    </div>
  );
}

export default YourTemplate2;
