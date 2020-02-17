import React from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@material-ui/core';

const Result = ({JobSalary, JobLocation, JobTitle, Jobskills}) => {
    console.log(JobLocation, JobSalary)
    return (
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
    );
}

const QueryResults = ({results}) => {
    return (
        <Container maxWidth='lg'>
            <Typography>Results</Typography>
            {results.map((result, i) => <Result {...result} key={i}/>)}
        </Container>
    );
}

export default QueryResults;