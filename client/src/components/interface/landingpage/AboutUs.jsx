import React from 'react';
import about from '../../../assets/landingpage/about.png';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-[#006f38] mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-[15rem] rounded-xl text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center lg:flex-row lg:items-start lg:space-x-8">
        
        <div className="mt-8 lg:mt-0 lg:w-1/3">
          <img 
            src={about} 
            alt="About Us Image" 
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="lg:w-2/3 lg:mt-0 mt-8">
          <div className="items-center text-center lg:text-left">
            <p className="text-sm font-medium text-info">About Us</p>
            <h2 className="mt-2 max-w-2xl text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
              Let's Grow Together
            </h2>
            <p className="mt-4 max-w-2xl text-xl lg:mx-0">
              Yes, that's our motto <span className="text-dark font-bold">"Collaborate. Create. Grow."</span> We believe in forging partnerships that offer mutual benefits for everyone involved.
            </p>
            <p className="mt-4 max-w-2xl text-xl lg:mx-0">
              <span className="font-bold">What's in it for you?</span><br/>
              By working with us, you'll have the opportunity to develop new skills, enhance your work, and achieve financial growth faster and more significantly than before. Our collaboration will bolster your reputation, opening doors to more job opportunities in the future.
            </p>
            <p className="mt-4 max-w-2xl text-xl lg:mx-0">
              <span className="font-bold">Our Services</span><br/>
              We offer a range of services tailored to fit your needs, connecting you with the right service providers to help you succeed.
            </p>
          </div>
          <div className="mt-10 text-center lg:text-left">
            <Link 
              to="/register"
              className="inline-flex items-center px-6 py-3 border radius-3xl border-transparent text-lg font-semibold rounded-md text-dark bg-white hover:bg-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
