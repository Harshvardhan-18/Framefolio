import React, { useEffect, useState } from "react";
import './Eyes.css';
import { useAuth } from "../context/AuthContext";

const Eyes = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = mouseX - window.innerWidth / 2;
      const deltaY = mouseY - window.innerHeight / 2;

      const angle = Math.atan2(deltaY, deltaX);
      const angleDeg = angle * (180 / Math.PI);

      // Set the translation values based on mouse position
      setTranslate({ x: deltaX * 0.03, y: deltaY * 0.03 });

      // Set the rotation angle
      setRotate(angleDeg - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const handleButtonClick = () => {
    if (currentUser) {
      window.location.href = "/form"; // Redirect to form if logged in
    } else {
      setShowLoginPopup(true); // Show login popup if not logged in
      
    }
  };

  const closePopup = () =>{setShowLoginPopup(false),window.location.hash='#home'}
  

  return (
    <div className="eyes  bg-[#ede8f5] w-full -z-10 h-screen overflow-hidden">
      <div data-scroll data-scroll-speed='-1' className=' relative h-full w-full'>
        <h1 className="font-bold tracking-tighter text-[11vw] pt-10 text-center">READY TO MAKE </h1>
        <h1 className="font-bold  tracking-tighter text-[11vw] pl-12 ">  YOUR <span className="pl-[33vw]">OWN</span></h1>
        <h1 className="font-bold tracking-tighter text-[11vw] text-center">PORTFOLIO?</h1>
        <div className="absolute flex  items-center justify-between gap-10 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
          <a onClick={handleButtonClick}><div className="relative w-[14vw] h-[14vw] bg-zinc-100 cursor-pointer rounded-full  flex items-center justify-center overflow-hidden">
            <div
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px)`,
                transition: "transform 0.1s easein",  
              }}
              className="relative w-[9vw] h-[9vw] rounded-full bg-zinc-900 overflow-hidden"
            >
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                }}
                className={`line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full px-[2px]`}
              >
                <div className="w-[1.7vw] h-[1.7vw] rounded-full bg-zinc-100"></div>
              </div>
              
            </div>
            <span className="absolute top-1/2 left-1/2 uppercase text-white font-semibold text-3xl -translate-x-[50%] -translate-y-[50%]">
                Let's
              </span>
          </div></a>

          <div className="relative w-[14vw] h-[14vw] bg-zinc-100 cursor-pointer rounded-full flex items-center justify-center">
            <div
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px)`,
                transition: "transform 0.1s easein",
              }}
              className="relative w-[9vw] h-[9vw] rounded-full bg-zinc-900 overflow-hidden"
            >
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                }}
                className="line absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-full px-[2px]"
              >
                <div className="w-[1.7vw] h-[1.7vw] rounded-full bg-zinc-100"></div>
              </div>
              
            </div>
            <span className="absolute top-1/2 left-1/2 uppercase text-white font-semibold text-3xl -translate-x-[50%] -translate-y-[50%]">
                Go
              </span>
          </div>
        </div>
        {showLoginPopup && (
          <div className="popup-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-40 z-20">
            <div className="popup bg-transparent backdrop-blur-md p-8 text-3xl rounded-3xl shadow-lg text-center">
              <p className="mb-4 text-3xl text-[#d8e1f4] font-semibold">Please log in to create a portfolio</p>
              <button onClick={() => {
                                closePopup();
                                window.location.href = "#home"; // Navigate to #home on close
                            }} className="bg-[#3d52a0] text-[#d0ddf8] py-2 px-4 rounded-xl">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eyes;
