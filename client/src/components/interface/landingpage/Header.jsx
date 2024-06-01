import React from 'react';
import { Link } from 'react-router-dom';
import avatar1 from '../../../assets/landingpage/header2.png';
import avatar2 from '../../../assets/landingpage/header3.png';
import avatar3 from '../../../assets/landingpage/header1.png';
import avatar4 from '../../../assets/landingpage/avatar4.png';
import avatar5 from '../../../assets/landingpage/header4.png';

const Header = () => {
  return (
    <header className=" py-8 px-8">
      <h2 className="text-7xl text-green-550 font-bold mb-4 pl-[16%]">Working with U: <br /></h2>
      <h3 className='text-6xl  font-bold mb-6 pl-[26%]' >
      <span className="text-green-800">Collaborate.</span> <span className="text-green-550 ">Create.</span> <span className="text-green-600">Grow.</span>
      </h3>
      <p className="mt-4 text-dark text-2xl font-medium text-center">
      Find Your Favorite Job with No Pain and No Gain
      </p>

      <div className="mt-8 flex justify-center">
          <Link to="/register" className="bg-green-500 text-white text-2xl font-medium px-10 py-5 rounded-3xl hover:bg-green-600 transition-colors duration-300">Get Started</Link>
      </div>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div class="p-4 text-center"><img src={avatar1} alt="avatar"  /></div>
        <div class="p-4 text-center"><img src={avatar2} alt="avatar"  /></div>
        <div class="p-4 text-center"><img src={avatar3} alt="avatar"  /></div>
        <div class="p-4 text-center"><img src={avatar4} alt="avatar"  /></div>
        <div class="p-4 text-center"><img src={avatar5} alt="avatar"  /></div>
     </div>


    </header>
  );
};

export default Header;
