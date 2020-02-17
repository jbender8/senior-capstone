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

const Search = ({skills, setSkills, salary, setSalary, location, setLocation}) => {
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

    const RenderSkills = ({skills, availableSkills, handleSkills}) => {
        return (
            <ToggleButtonGroup value={skills} onChange={handleSkills}>
                {availableSkills.map((skill, i) => <ToggleButton key={i} value={skill}>{skill}</ToggleButton>)}
            </ToggleButtonGroup>
        );
    }

    const MenuItems = ({items, value, handler}) => {
        return (
            <Select value={value} onChange={handler}>
                {items.map((item, key) => <MenuItem value={item} key={key}>{item}</MenuItem>)}
            </Select>
        );
    }

    const availableSkills = ['Data Science', 'Machine Learning', 'R', 'Python'];
    const locations = ['Chicago', 'San Francisco', 'New York City', 'Seattle', 'Houghston'];
    const levels = ['Junior', 'Senior', 'Principal', 'Staff'];
    return (
        <Container maxWidth='xl' align='center'>
            <Grid container alignItems='flex-end' justify='center' spacing={2}>
                <Grid item>
                    <InputLabel>Location</InputLabel>
                    <MenuItems items={locations} value={location} handler={handleLocation}/>
                </Grid>
                <Grid item>
                    <InputLabel>Level</InputLabel>
                    <MenuItems items={levels} handler={handleLevel} value={level}/>
                </Grid>
                <Grid item>
                    <TextField placeholder='Salary' onChange={handleSalary}>{salary}</TextField>
                </Grid>
                <Grid item>
                    <RenderSkills
                        skills={skills}
                        availableSkills={availableSkills}
                        handleSkills={handleSkills}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Search;