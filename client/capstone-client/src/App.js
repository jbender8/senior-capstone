import React from 'react';
import './App.css';
import Home from './Home.js';
import {
  Grid,
  Button
} from '@material-ui/core'
import Search from './Search.js';
import {Vis1, Vis2} from './Visualizations.js';
import {getAllJobs, userQuery, createFakeJobs} from './util/firebase.js';
import QueryResults from './QueryResults.js';

// createFakeJobs(10);
console.log(getAllJobs());

function App() {
  const [data, setData] = React.useState([]);
  const [location, setLocation] = React.useState('Chicago');
  const [salary, setSalary] = React.useState("75000");
  const [skills, setSkills] = React.useState(() => []);

  const submitQuery = () => {
    userQuery({
      location,
      salary,
      skills,
      data,
      setData
    });
  }

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

      <Grid container nowrap direction='column' alignContent='center' justify='center' alignItems='center' spacing={3}>
        <Grid item>
          <Search {...{location, setLocation, setSalary, salary, setSkills, skills}}/>
        </Grid>
        <Grid item>
          <Button variant='contained' onClick={submitQuery}>Submit</Button>
        </Grid>
        <Grid item>
          
        </Grid>
      </Grid>
      <QueryResults results={data}/>
    </div>
  );
}

export default App;
