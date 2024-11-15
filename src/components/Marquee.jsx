import React from 'react'
import { motion } from "framer-motion"
import LocomotiveScroll from 'locomotive-scroll'
import './Marquee.css';


function Marquee() {
    const locomotiveScroll=new LocomotiveScroll();
    return (
        <div data-scroll
        data-scroll-section
        data-scroll-speeed="0" className='w-full relative pt-14 pb-16 rounded-t-3xl bg-[#8697c4]'>
            <div className='text border-t text-[#ede8f5] border-b flex overflow-hidden whitespace-nowrap font-thin  border-[#ede8f5]'>
                <motion.h1 initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 6 }} className=' text-[17.5vw] tracking-tighter pr-10 leading-none font-bold uppercase mb-6 -mt-1  '>FRAMEFOLIO</motion.h1>
                <motion.h1 initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration:6}} className='text-[17.5vw] tracking-tighter pr-10 leading-none font-bold uppercase mb-6 -mt-1 '>FRAMEFOLIO</motion.h1>
                <motion.h1 initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ ease: "linear", repeat: Infinity, duration: 6 }} className='text-[17.5vw] tracking-tighter pr-10 leading-none font-bold uppercase mb-6 -mt-1 '>FRAMEFOLIO</motion.h1>

            </div>
        </div>
    )
}

export default Marquee
