import React from 'react';

const About = () => (
  <div className="content-container">
    <div className="content-title-group not-found">
      <h2 className="title">Tour of Heroes</h2>
      <p>
        This project was created to help represent a fundamental app written
        with React. The heroes and villains theme is used throughout the app.
      </p>
      <p>
        by 
        <a href="https://github.com/nhutlbuit"> Nhut Le</a>
      </p>
      <br />
      <h2 className="title">Why</h2>
      <p>
        I love JavaScript and the Web! One of the most common questions I hear
        is "which framework is best?". I like to flip this around and ask you
        "which is best for you?". The best way to know this is to try it for
        yourself. I'll follow up with some articles on my experiences with these
        frameworks but in the meantime, please try it for yourself to gain your
        own experience with each.
      </p>
      <br />
      <h2 className="title">Comparative Apps</h2>
      <ul>
        <li>
          <a href="https://github.com/nhutlbuit/trainingAngular">
           Angular
          </a>
        </li>
        <li>
          <a href="https://github.com/nhutlbuit/reactJs">
            ReactJs
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default About;
