import React from 'react';
import './App.css';
import Home from './Home.js';
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core'
import Search from './Search.js';
import Header from './header';
import Footer from './footer';
import {Vis1, Vis2} from './Visualizations.js';
import {getAllJobs, userQuery, createFakeJobs} from './util/firebase.js';
import QueryResults from './QueryResults.js';
import analytics from './util/analytics.js';


console.log(getAllJobs());

function App() {
  const [data, setData] = React.useState([]);
  const [locations, setlocations] = React.useState(['Chicago', 'New York City']);
  const [salary, setSalary] = React.useState("75000");
  const [skills, setSkills] = React.useState(['Python']);
  const [field, setField] = React.useState(["Artificial Intelligence"]);


  const submitQuery = () => {
    setData(prev => []);
    userQuery({
      locations,
      salary,
      skills,
      data,
      setData
    });
  }

  const citiesByFreq = analytics.citiesByFreq(data);
  const titlesByAve = analytics.jobTitlesByAveSalary(data);
  
return(
    <div className="return">
      <Header />
      
      <div className="search">
      <Grid container nowrap direction='column' alignContent='center' justify='center' alignItems='center' spacing={3}>
        <Grid item>
          <Search {...{locations, setlocations, setSalary, salary, setSkills, skills, field, setField}}/>
        </Grid>
        <Grid item>
          <Button variant='contained' color='primary' onClick={submitQuery}>Submit</Button>
        </Grid>
        <Grid item>
          
        </Grid>
      </Grid>
      </div>
      <div className="return">
      <Grid container spacing={3} alignItems='center' alignContent='center' justify='center'>
        <Grid item>
          <Vis1 data={titlesByAve}/>
        </Grid>
        <Grid item>
          <Vis2 data={citiesByFreq}/>
        </Grid>
      </Grid>
      </div>
      <QueryResults results={data} inputSkills={skills}/>
      <Footer />
    </div>
  );
}


export function demoOnClick(e) {
	alert(e.name);
}
 

export default App;
