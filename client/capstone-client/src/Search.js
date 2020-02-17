import React from 'react';
import {
    Container,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Grid,
    Input
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

    // <Grid item>
    //                 <InputLabel>Level</InputLabel>
    //                 <MenuItems items={levels} handler={handleLevel} value={level}/>
    //             </Grid>

    const availableSkills = ['Data Science', 'Machine Learning', 'R', 'Python'];
    const locationss = ['Chicago', 'San Francisco', 'New York City', 'Seattle', 'Houghston'];
    const levels = ['Junior', 'Senior', 'Principal', 'Staff'];
    return (
        <Container maxWidth='xl' align='center'>
            <Grid container alignItems='flex-end' justify='center' spacing={2}>
                <Grid item>
                    <Chips values={locationss} label="Locations" value={locations} handleValue={handlelocations} />
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
    );
}

export default Search;