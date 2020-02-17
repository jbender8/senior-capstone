import React from 'react';
import {
    Container,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Grid,
    Input,
    Box
}
from '@material-ui/core';
import {
    ToggleButtonGroup,
    ToggleButton
} from '@material-ui/lab';

const Search = ({skills, setSkills, salary, setSalary, locations, setlocations}) => {
    const [level, setLevel] = React.useState("Junior");

    const handlelocations = event => {
        setlocations(event.target.value);
    }

    const handleSalary = event => {
        setSalary(event.target.value);
    }

    const handleLevel = event => {
        setLevel(event.target.value);
    }

    const handleSkills = (event) => {
        setSkills(event.target.value);
    }

    const Chips = ({values, value, handleValue, label}) => {
        return (
            <React.Fragment>
                <InputLabel>{label}</InputLabel>
                <Select
                    multiple
                    value={value}
                    onChange={handleValue}
                    input={<Input/>}

                >
                    {values.map(v => {
                        return <MenuItem key={v} value={v}>{v}</MenuItem>
                    })}
                </Select>
            </React.Fragment>
        );
    }

    const availableSkills = ['Data Science', 'Machine Learning', 'R', 'Python'];
    const availableLocations = ['Chicago', 'San Francisco', 'New York City', 'Seattle', 'Houghston'];
    const levels = ['Junior', 'Senior', 'Principal', 'Staff'];
    return (
        <Box borderTop={0.5} marginTop={1} paddingTop={2}>
            <Container maxWidth='xl' align='center'>
                <Grid container alignItems='flex-end' justify='center' spacing={2}>
                    <Grid item>
                        <Chips values={availableLocations} label="Locations" value={locations} handleValue={handlelocations} />
                    </Grid>
                    
                    <Grid item>
                        <InputLabel>Salary</InputLabel>
                        <TextField placeholder='Salary' onChange={handleSalary}>{salary}</TextField>
                    </Grid>
                    <Grid item>
                        <Chips values={availableSkills} label="Skills" value={skills} handleValue={handleSkills}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Search;