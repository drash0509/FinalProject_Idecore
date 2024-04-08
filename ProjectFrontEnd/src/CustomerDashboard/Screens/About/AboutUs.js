
import React from 'react'
import Title from './Title'
import WelcomeAbout from './WelcomeAbout'
import ContactUs from '../HomeScreen/Contectus'
import Service from '../HomeScreen/Service'
const AboutUs = () => {
  return (
    <div style={{flex:1}}>
      <Title/>
      <WelcomeAbout/>
      <Service/>
      <ContactUs/>
    </div>
  )
}

export default AboutUs
