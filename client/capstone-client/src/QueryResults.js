import React from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Grid,
    createMuiTheme,
} from '@material-ui/core';
import {
    withStyles,
    ThemeProvider,
} from '@material-ui/styles';
import {green, red, blue} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red,
        success: green
    }
});

const Result = ({JobSalary, JobLocation, JobTitle, JobSkills, skills, JobLink}) => {
    return (
        <Grid item>
            <Container maxWidth='md'>
                <Card raised>
                    <CardContent>
                        <Grid container spacing={1} alignItems='center' alignContent='flex-end'>
                            <Grid item>
                                <Typography variant='body1' component='h2'>Title:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' component='h2'>
                                    {JobTitle}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems='center' spacing={1}>
                            <Grid item>
                                <Typography variant='body1' component='h2'>Location:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' component='h2'>
                                    {JobLocation.charAt(0).toUpperCase() + JobLocation.substring(1)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems='center' spacing={1}>
                            <Grid item>
                                <Typography variant='body1' component='h2'>Salary:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' component='h2'>
                                    {JobSalary + "$"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container alignItems='center' spacing={1}>
                            <Grid item>
                                <Typography variant='body1' component='h2'>Skills:</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={1}>
                                    <JobSkill skillsInJob={JobSkills} skills={skills}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='primary' size='small' href={JobLink}>
                            Link to Job
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </Grid>
    );
}


const JobSkill = ({skillsInJob, skills}) => {
    return skillsInJob.map((skill, i) => {
        let color = 'secondary';
        if(skills.includes(skill)) color = 'primary';
        return (
            <Grid item>
                {/* <Typography
                    variant='h5'
                    style={{color : color}}
                    component='h2'
                    key={i}>
                    {skill}
               </Typography> */}
               <ThemeProvider theme={theme}>
                    <Button variant='outlined' styles={{color: 'black'}} color={color} size='small'>
                        {skill}
                    </Button>
               </ThemeProvider>
            </Grid>
        );
    });
}


const QueryResults = ({results, skills}) => {
    if(results.length === 0) return null;
    skills = skills.map((item) => item.toLowerCase());
    return (
        <Container maxWidth='lg'>
            <div className="page-query">
            <Grid container spacing={4} direction='column'>
                {results.map((result, i) => <Result skills={skills} {...result} key={i}/>)}
            </Grid>
            </div>
        </Container>
    );
}

export default QueryResults;