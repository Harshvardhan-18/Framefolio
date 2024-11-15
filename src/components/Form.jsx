import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../context/Firebase';

function Form() {
  const [name, setName] = useState('');
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const [description3, setDescription3] = useState('');
  const [video1Title, setVideo1Title] = useState('');
  const [video2Title, setVideo2Title] = useState('');
  const [video1, setVideo1] = useState('');
  const [video2, setVideo2] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [languages, setLanguages] = useState('');
  const [email, setEmail] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    try {
      const db = getFirestore(app);
      const portfolioRef = collection(db, 'portfolios');
      await addDoc(portfolioRef, {
        userId: currentUser.uid,
        name,
        description1,
        description2,
        description3,
        video1Title,
        video1,
        video2Title,
        video2,
        instagram,
        facebook,
        youtube,
        twitter,
        contactNo,
        address,
        languages,
        email,
        createdAt: serverTimestamp()
      });

      // Clear the form
      setName('');
      setDescription1('');
      setDescription2('');
      setDescription3('');
      setVideo1Title('');
      setVideo1('');
      setVideo2Title('');
      setVideo2('');
      setInstagram('');
      setFacebook('');
      setYoutube('');
      setTwitter('');
      setContactNo('');
      setAddress('');
      setLanguages('');
      setEmail('');

      // Navigate to a success page or dashboard
      navigate('/portfolio/:userId');
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ede8f5]">
  <div className="bg-white shadow-lg rounded-3xl p-6 max-w-screen-2xl w-full">
    <h2 className="text-3xl font-semibold font-serif text-black text-center mb-6">Create Your Portfolio</h2>
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-black">
          First Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="description1" className="block text-sm font-medium text-black">
          Description-1
        </label>
        <textarea
          id="description1"
          value={description1}
          onChange={(e) => setDescription1(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
          rows="2"
        ></textarea>
      </div>

      <div>
        <label htmlFor="description2" className="block text-sm font-medium text-black">
          Description-2
        </label>
        <textarea
          id="description2"
          value={description2}
          onChange={(e) => setDescription2(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
          rows="2"
        ></textarea>
      </div>

      <div>
        <label htmlFor="description3" className="block text-sm font-medium text-black">
          Description-3
        </label>
        <textarea
          id="description3"
          value={description3}
          onChange={(e) => setDescription3(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
          rows="2"
        ></textarea>
      </div>

      <div>
        <label htmlFor="video1Title" className="block text-sm font-medium text-black">
          Video 1 Title
        </label>
        <input
          type="text"
          id="video1Title"
          value={video1Title}
          onChange={(e) => setVideo1Title(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
        <label htmlFor="video1" className="block text-sm font-medium text-black mt-4">
          Video 1 URL
        </label>
        <input
          type="url"
          id="video1"
          value={video1}
          onChange={(e) => setVideo1(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="video2Title" className="block text-sm font-medium text-black">
          Video 2 Title
        </label>
        <input
          type="text"
          id="video2Title"
          value={video2Title}
          onChange={(e) => setVideo2Title(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
        <label htmlFor="video2" className="block text-sm font-medium text-black mt-4">
          Video 2 URL
        </label>
        <input
          type="url"
          id="video2"
          value={video2}
          onChange={(e) => setVideo2(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      {/* Social Media Links */}
      <div>
        <label htmlFor="instagram" className="block text-sm font-medium text-black">
          Instagram Link
        </label>
        <input
          type="url"
          id="instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="facebook" className="block text-sm font-medium text-black">
          Facebook Link
        </label>
        <input
          type="url"
          id="facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="youtube" className="block text-sm font-medium text-black">
          YouTube Link
        </label>
        <input
          type="url"
          id="youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="twitter" className="block text-sm font-medium text-black">
          Twitter Link
        </label>
        <input
          type="url"
          id="twitter"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="contactNo" className="block text-sm font-medium text-black">
          Contact Number
        </label>
        <input
          type="tel"
          id="contactNo"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-black">
          Address
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
          rows="2"
        ></textarea>
      </div>

      <div>
        <label htmlFor="languages" className="block text-sm font-medium text-black">
          Languages
        </label>
        <textarea
          id="languages"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
          rows="2"
        ></textarea>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black">
          Email ID
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-2 px-4 py-2 border border-black border-opacity-25 rounded-3xl focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          className="w-80 ml-[30vw] py-2 px-4 bg-black text-[#ede8f5] text-xl font-serif font-bold rounded-3xl hover:bg-[#2e2d2d] transition-colors duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default Form;
