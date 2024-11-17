import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Page1 from './components/Page1';
import Marquee from './components/Marquee';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Eyes from './components/Eyes';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Form from './components/Form'
import Template1 from './components/Template1';
import Template2 from './components/Template2';
import YourTemplate from './components/YourTemplate'

function PortfolioCreation() {
  const { userId } = useParams();
  return <div>Portfolio creation page for user ID: {userId}</div>;
}

function App() {
  return (
    <Router>
      <AuthProvider> 
      <div className='w-full h-full bg-[#ede8f5]'>
    
        <Routes>
          <Route path="/" element={
            <>
              <Nav />
              <Page1 />
              <Marquee />
              <Page2 />
              <Page3 />
              <Eyes />
              
            </>
          } />
          
          <Route path="/form" element={<Form />} />
          <Route path="/template1" element={<Template1 />} />
          <Route path="/template2" element={<Template2 />} />
          <Route path="/portfolio/:userId" element={<YourTemplate />} />
          
        </Routes>



      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
