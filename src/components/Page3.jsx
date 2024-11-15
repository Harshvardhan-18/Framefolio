import { motion, useAnimation } from 'framer-motion';
import React, { useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useAuth } from "../context/AuthContext"; // Import the auth context to check login

function Page3() {
    const cards = [useAnimation(), useAnimation()];
    const texts = [useAnimation(), useAnimation()];
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const { currentUser } = useAuth(); // Get current user from auth context

    const handleHover = (index) => {
        texts[index].start({
            y: "0",
        });
    }

    const handleHoverEnd = (index) => {
        texts[index].start({
            y: "100%"
        });
    }

    const handleTemplateClick = (templateUrl) => {
        if (currentUser) {
            window.location.href = templateUrl; // Redirect to the template if logged in
        } else {
            setShowLoginPopup(true); // Show login popup if not logged in
        }
    };

    const closePopup = () => setShowLoginPopup(false);

    return (
        <div
            data-scroll
            data-scroll-section
            data-scroll-speed="0.2"
            className="w-full pt-12 pb-10 rounded-br-3xl rounded-bl-3xl -mt-56 bg-[#3d52a0]"
        >
            <div className="w-full px-10">
                <div className="cards w-full flex gap-10">
                    {/* Template 3 Card */}
                    <motion.div
                        onHoverStart={() => handleHover(0)}
                        onHoverEnd={() => handleHoverEnd(0)}
                        onClick={() => handleTemplateClick("/template3")}
                        className="cardcontainer overflow-visible relative w-1/2 cursor-pointer z-8"
                    >
                        <motion.div className="card rounded-lg h-[75vh] bg-red-500">
                            <h1 className="absolute flex overflow-hidden left-full -translate-x-1/2 -translate-y-1/2 top-1/2 text-[#a5bcf5] z-[9] leading-none tracking-tighter text-[7vw] font-bold">
                                {"TEMPLATE3".split("").map((item, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ y: "100%" }}
                                        animate={texts[0]}
                                        transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
                                        className="inline-block"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </h1>
                        </motion.div>
                    </motion.div>

                    {/* Template 4 Card */}
                    <motion.div
                        onHoverStart={() => handleHover(1)}
                        onHoverEnd={() => handleHoverEnd(1)}
                        onClick={() => handleTemplateClick("/template4")}
                        className="cardcontainer overflow-visible w-1/2 relative cursor-pointer z-8"
                    >
                        <motion.div className="card rounded-lg h-[75vh] bg-red-500">
                            <h1 className="absolute flex overflow-hidden right-full translate-x-1/2 -translate-y-1/2 top-1/2 text-[#a5bcf5] z-[9] leading-none tracking-tighter text-[7vw] font-bold">
                                {"TEMPLATE4".split("").map((item, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ y: "100%" }}
                                        animate={texts[1]}
                                        transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
                                        className="inline-block"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </h1>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Login Popup */}
            {showLoginPopup && (
                        <div className="popup-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-40 z-20">
                            <div className="popup bg-transparent backdrop-blur-md p-8 text-3xl rounded-3xl shadow-lg text-center">
                                <p className="mb-4 text-3xl font-serif text-[#d8e1f4] font-semibold">Please log in to view a template.</p>
                                <button onClick={() => {
                                closePopup();
                                window.location.href = "#home"; // Navigate to #home on close
                            }} className="bg-[#3d52a0] font-serif text-[#d0ddf8] py-2 px-4 rounded-xl">
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
        </div>
    );
}

export default Page3;
