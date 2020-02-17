import React from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Grid
} from '@material-ui/core';

const Result = ({JobSalary, JobLocation, JobTitle, Jobskills}) => {
    console.log(JobLocation, JobSalary)
    return (
        <Grid item>
            <Card>
                <CardContent>
                    <Typography variant='h5' component='h2'>
                        {JobTitle}
                    </Typography>
                    <Typography variant='h5' component='h2'>
                        {JobLocation}
                    </Typography>
                    <Typography variant='h5' component='h2'>
                        {JobSalary}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small'>
                        Link to Job
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

const QueryResults = ({results}) => {
    if(results.length === 0) return null;
    return (
        <Container maxWidth='lg'>
            <Typography>Results</Typography>
            <Grid container spacing={2} direction='column'>
                {results.map((result, i) => <Result {...result} key={i}/>)}
            </Grid>
            
        </Container>
    );
}

export default QueryResults;