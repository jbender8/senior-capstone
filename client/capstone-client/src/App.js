import React from 'react';
import './App.css';
import Home from './Home.js';
import Search from './Search.js';

import {getAllJobs, userQuery} from './util/firebase.js';

console.log(getAllJobs());

console.log(userQuery({
  salary: '75000',
  location: 'chicago',
  skills: ['python'],
  level: 'junior'
}));

function App() {
  return(
    <Search />
  );
}

export default App;
