import React from 'react';
import './App.css';
import Home from './Home.js';
import Grid from '@material-ui/core/Grid'
import Search from './Search.js';
import {Vis1, Vis2} from './Visualizations.js';
import {getAllJobs, userQuery} from './util/firebase.js';

console.log(getAllJobs());

console.log(userQuery({
  salary: '75000',
  location: 'chicago',
  skills: ['Python'],
  level: 'junior'
}));

function App() {
  const jobs = [];
  jobs.push({title : 'Data Analyst', salary : '73000'});
  jobs.push({title : 'QA Analyst', salary : '68000'});
  jobs.push({title : 'Software Engineer', salary : '81500'});
  jobs.push({title : 'Data Scientist', salary : '79200'});

  const cities = [
    { name: 'Chicago', value: 178 }, { name: 'Houston', value: 129 },
    { name: 'New York City', value: 203 }, { name: 'San Francisco', value: 247 },
  ];
  
return(
    <div>
      <Grid container spacing={3} alignItems='center' alignContent='center' justify='center'>
        <Grid item>
          <Vis1 data={jobs}/>
        </Grid>
        <Grid item>
          <Vis2 data={cities}/>
        </Grid>
      </Grid>

      <Search />
    </div>
  );
}

export default App;
