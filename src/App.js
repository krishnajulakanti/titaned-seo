// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import About from './About.js';
import Profile from './Profile.js';
import Users from './Users.js';
import DelayedUsers from './DelayedUsers.js';

const App = () => (
  <div>
    <h1>Test Home</h1>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/delayusers" element={<DelayedUsers />}></Route>
    </Routes>
  </div>
);

export default App;
