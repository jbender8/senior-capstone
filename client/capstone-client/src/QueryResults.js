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

const Result = ({JobSalary, JobLocation, JobTitle, JobSkills}) => {
    return (
        <Grid item>
            <Container maxWidth='md'>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} alignItems='center' alignContent='flex-end'>
                            <Grid item>
                                <Typography variant='body1' component='h2'>Title:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' component='h2'>
                                    {JobTitle}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid item>
                                <Typography variant='body1' component='h2'>Location:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' component='h2'>
                                    {JobLocation}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid item>
                                <Typography variant='body1' component='h2'>Salary:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' component='h2'>
                                    {JobSalary + "$"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid item>
                                <Typography variant='body1' component='h2'>Skills:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h5' component='h2'>
                                    {'[ ' + JobSkills.reduce((a, b) => a + ', ' + b) + ' ]'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button size='small'>
                            Link to Job
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </Grid>
    );
}

const QueryResults = ({results}) => {
    if(results.length === 0) return null;
    return (
        <Container maxWidth='lg'>
            <div className="page-query">
            <Grid container spacing={2} direction='column'>
                {results.map((result, i) => <Result {...result} key={i}/>)}
            </Grid>
            </div>
        </Container>
    );
}

export default QueryResults;