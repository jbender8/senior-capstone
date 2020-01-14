import React from 'react';
import {Typography, Container} from '@material-ui/core';

export default class Home extends React.Component {

    render() {
        return (
            <Container maxWidth="lg">
                <Typography color="primary" variant="h1">
                    Uber Super Job Search 100000000
                </Typography>
            </Container>
        );
    }
}