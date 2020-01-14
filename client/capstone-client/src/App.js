import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home.js';
import {
  Container,
  Typography,
  Link
} from '@material-ui/core';

const Panel = ({site, link}) => {
  return (
    <Container maxWidth="sm">
      <Typography color="secondary" variant="p">
        {site}
      </Typography>
      <p>
        <Link href={link}>
          {site}
        </Link>
      </p>
    </Container>
  );
}

function App() {
  const sites = [{
                  site: 'indeed.com',
                  link: 'https://indeed.com/'
                },
                {
                  site: 'monster.com',
                  link: 'https://monster.com/'
                }
              ]
  return (
    <div className="App">
      <Home />
      {
        sites.map(site => <Panel {...site} />)
      }
    </div>
  );
}

export default App;
