import React from 'react';
import {
    Container,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Grid,
}
from '@material-ui/core';
import {
    ToggleButtonGroup,
    ToggleButton
} from '@material-ui/lab';

const Search = () => {
    const [location, setLocation] = React.useState('Chicago');
    const [salary, setSalary] = React.useState("75000");
    const [skills, setSkills] = React.useState(() => []);
    const [level, setLevel] = React.useState("Junior");

    const handleLocation = event => {
        setLocation(event.target.value);
    }

    const handleSalary = event => {
        setSalary(event.target.value);
    }

    const handleLevel = event => {
        setLevel(event.target.value);
    }

    const handleSkills = (event, newSkill) => {
        setSkills(newSkill);
    }

    const availableSkills = ['Data Science', 'Machine Learning', 'R', 'Python'];
    const locations = ['Chicago', 'San Francisco', 'New York City'];
    const levels = ['Junior', 'Senior', 'Principal', 'Staff'];
    return (
        <Container maxWidth='xl' align='center'>
            <Grid container alignItems='flex-end' justify='center' spacing={2}>
                <Grid item>
                    <InputLabel>Location</InputLabel>
                    <Select
                        value={location}
                        onChange={handleLocation}
                    >
                        <MenuItem value={locations[0]}>{locations[0]}</MenuItem>
                        <MenuItem value={locations[1]}>{locations[1]}</MenuItem>
                        <MenuItem value={locations[2]}>{locations[2]}</MenuItem>
                    </Select>
                </Grid>
                <Grid item>
                    <InputLabel>Level</InputLabel>
                    <Select
                        value={level}
                        onChange={handleLevel}
                    >
                        <MenuItem value={levels[0]}>{levels[0]}</MenuItem>
                        <MenuItem value={levels[1]}>{levels[1]}</MenuItem>
                        <MenuItem value={levels[2]}>{levels[2]}</MenuItem>
                        <MenuItem value={levels[3]}>{levels[3]}</MenuItem>
                    </Select>
                </Grid>
                <Grid item>
                    <TextField placeholder='Salary' onChange={handleSalary}>{salary}</TextField>
                </Grid>
                <Grid item>
                    <ToggleButtonGroup value={skills} onChange={handleSkills}>
                        <ToggleButton value={availableSkills[0]}>
                            {availableSkills[0]}
                        </ToggleButton>
                        <ToggleButton value={availableSkills[1]}>
                            {availableSkills[1]}
                        </ToggleButton>
                        <ToggleButton value={availableSkills[2]}>
                            {availableSkills[2]}
                        </ToggleButton>
                        <ToggleButton value={availableSkills[3]}>
                            {availableSkills[3]}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Search;