import React from 'react';
import './AboutPage.css';
import profilePic from '../../utilites/profile-pic.jpg'
import resume from '../../utilites/Ahmad_Shaukat_resume.pdf'


export default function Aboutpage() {
  return <>
  <div className="about-me-main-cont">
      <div className="about-me-upper">
          <div className="about-me-left">
              <img className='profile-pic'src={profilePic}></img>
          </div>
          <div className="about-me-right">
              <div>
                  <p className='about-me-name'>Ahmad Shaukat</p>
              </div>
              <div>
                  <p className='about-me-subheading'>A Bit About Me</p>
              </div>
              <div>
                  <p className='about-me-text'>My name is Ahmad Shaukat, and I graduated from AppAcademy in September 2023. I have over two years of experience in designing, building, and deploying web applications, I've transitioned from a career as an Emergency Medical Technician to follow my passion for web development. What started as a hobby has now become my profession, and I'm excited to continue my journey in the world of Software Engineering. In addition to my web development skills, I'm eager to further expand my knowledge in the fields of cloud computing and artificial intelligence (AI).</p>
              </div>
          </div>

      </div>
      <div className="about-me-bottom">
          <a className='about-me-links about-me-portfolio' href='https://www.ahmadshaukat.net' target='_blank'>Portfolio</a>
          <a className='about-me-links about-me-linkedin' href='www.linkedin.com/in/ahmad-shaukatt' target='_blank'>Linkedin</a>
          <a className='about-me-links about-me-github' href='https://github.com/Ahmad-Shaukat' target='_blank'>GitHub</a>
          <a className='about-me-links about-me-resume' href={resume} target='_blank'>Resume</a>
      </div>
  </div>
  
  
  </>
}
