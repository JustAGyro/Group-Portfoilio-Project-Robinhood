import React from 'react';
import './AboutPage.css';

export default function Aboutpage() {
  return (
    <div className="homepage-container">
      <div className="about-header">
        <h3>Kamran Qureshi - Software Engineer</h3>
        <h4>About Me!</h4>
        <h6>How I started</h6>
        <p className="about-text">
          I spent the first 6 years of my professional life as an accountant. I
          went from a small regional firm in New York to controlling the
          financial reporting for the north american region of MHI. Throughout
          this time I tried to challenge my self as much as possible taking on
          new projects, new career paths I didn't ever think I was capable of
          when I first graduated. Towards the end of 2020 I wanted to do more in
          my career. I wanted something that brought back the original feeling I
          felt when I started in accounting. I realized that what I loved about
          my first 4 years was never going to be present with my current career
          path. So I went off to look for something that was a viable
          transition. I eventually stumbled on something I didn't realize I
          loved yet. I found software development. The more I looked into the
          field, the more I felt enthralled by the space. The unique problems,
          the pace, the constant evolution in technology and design. Each
          project I undertake opens new paths and I am constantly absorbing as
          much as I can on this journey as a engineer.
        </p>
        <h6>Looking to the future</h6>
        <p className="about-text">
          I hope to further my skills and work with the best and brightest
          within this space to bring the public new sets of tools to take on
          everyday life. Whether it is front end or back end develop (or both!),
          I am always open to take on a new project and dive head first into
          something that might make most uncomfortable, because thats where I
          feel my most comfortable.
        </p>
      </div>

      <div className="about-me-bottom">
        <a
          className="about-me-links about-me-portfolio"
          href="https://justagyro.github.io/portfolio-website/"
          target="_blank"
        >
          Portfolio
        </a>
        <a
          className="about-me-links about-me-github"
          href="https://github.com/JustAGyro/Group-Portfoilio-Project-Robinhood"
          target="_blank"
        >
          GitHub
        </a>
        <a
          className="about-me-links about-me-resume"
          href="https://www.linkedin.com/in/kamranzqureshi/"
          target="_blank"
        >
          Linked-in
        </a>
      </div>
    </div>
  );
}
