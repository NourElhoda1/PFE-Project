import React from 'react'
import Navbar from '../../layout/Navbar/Navbar'
import Header from '../../components/interface/landingpage/Header'
import Steps from '../../components/interface/landingpage/Steps'
import AboutUs from '../../components/interface/landingpage/AboutUs'
import Category from '../../components/interface/landingpage/Category'
import Footer from '../../layout/Footer/Footer'



function Home() {
  return (
    <div >
        <Navbar />
        <Header />
        <Steps />
        <AboutUs />
        <Category/>
       
        <Footer />
        
    </div>
  )
}

export default Home