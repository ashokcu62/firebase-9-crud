import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import{BrowserRouter as Router}from "react-router-dom"
import App from './App';
import {db,auth}from './firebase/Firebase-config'

import { FirebaseContext } from './firebase/Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{db,auth}}>
    <Router>
      <App />
    </Router>
  </FirebaseContext.Provider>
  
);


