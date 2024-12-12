// src/About.js
import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
  <div>
    <h1>Home</h1>
    <p>This is an SEO-friendly about page rendered on the server.</p>
    <Link to="/about">About</Link>
    <br />
    <Link to="/profile">Profile</Link>
    <br />
    <Link to="/users">Users</Link>
    <br />
    <Link to="/delayusers">Delayed Users</Link>
  </div>
);

export default Home;
