
import React from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import Login from './Login';
import "./Page1.css";





function Page1() {
  const locomotiveScroll=new LocomotiveScroll();
  return (
    <section  id="home">

    <div data-scroll
    data-scroll-section
    data-scroll-speed="-0.5"  className=' h-3/5 m-12 pb-[3vw] flex pt-36  items-end justify-between  border-b border-slate-600 border-opacity-60 '>
      <div className='left text-4xl w-4/12  '>Present your creativity seamlessly with expertly tailored professional portfolios designed to highlight your unique style.
      </div>
      <h1 className='rightfont -mb-8 p-5  w-4/12 flex justify-end tracking-tight font-bold leading-[9vw] text-right text-[9em]'>PORTFOLIO THAT ATTRACTS</h1>

    </div>
    </section>

  )
}

export default Page1