import React from 'react';
import {Typography, Container, Grid} from '@material-ui/core';

export default class Home extends React.Component {
    render() {
        return (
            <Container maxWidth="xl">
                <Grid container direction='row' alignItems='center' justify='center' nowrap>
                    <Grid item>
                        <Typography color="body1" variant="h1" align='center'>
                            Job Search
                        </Typography>
                    </Grid>
                    
                </Grid>
            </Container>
        );
    }
}