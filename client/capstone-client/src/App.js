import React from 'react';
import './App.css';
import Home from './Home.js';
import Search from './Search.js';
import {Vis1, Vis2} from './Visualizations.js';


import {getAllJobs} from './util/firebase.js';




function App() {
  //const jobs = getAllJobs();
  const jobs = [];
  jobs.push({title : 'Data Analyst', salary : '73000'});
  jobs.push({title : 'QA Analyst', salary : '68000'});
  jobs.push({title : 'Software Engineer', salary : '81500'});
  jobs.push({title : 'Data Scientist', salary : '79200'});

  const cities = [
    { name: 'Chicago', value: 178 }, { name: 'Houston', value: 129 },
    { name: 'New York City', value: 203 }, { name: 'San Francisco', value: 247 },
  ];
  


  //for (let i = 0; i < jobs.length; i++) {
    //data01.push(name: jobs[i][""])
  //}

  
return(
    <div>
        <Vis1 data={jobs}/>
        <Vis2 data={cities}/>
       <Search />
    </div>
  );
}

export default App;
