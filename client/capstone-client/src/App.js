import React from 'react';
import './App.css';
import Home from './Home.js';
import Search from './Search.js';
import {Vis1} from './Visualizations.js';


import {getAllJobs} from './util/firebase.js';


function App() {
  const jobs = getAllJobs();
  return(
    <div>
        <Vis1 />
       <Search />
    </div>
  );
}

export default App;
