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

const Search = ({skills, setSkills, salary, setSalary, locations, setlocations, fields, setFields}) => {
    const handlelocations = event => {
        setlocations(event.target.value);
    }

    const handleSalary = event => {
        setSalary(event.target.value);
    }

    const handleField = event => {
        setFields(event.target.value);
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

    const availableSkills = ['Python', 'SQL', 'R', 'Hadoop', 'Spark', 'Java', 'SAS', 'Tableau', 'Hive', 'Scala', 'AWS', 'C++', 'MATLAB', 'TensorFlow', 'C', 'Excel', 'NoSQL', 'Linux', 'Azure', 'sclkit-learn', 'SPSS', 'Pandas', 'JavaScript', 'Perl', 'C#', 'NumPy', 'Keras', 'Git', 'Docker', 'MySQL', 'HBase', 'MongoDB', 'Cassandra', 'PyTorch', 'D3', 'Caffe'];
    const availableLocations = ['Chicago', 'San Francisco', 'New York City', 'Seattle', 'Houston'];
    const availableFields = ['Artificial Intelligence', 'Deep Learning', 'Machine Learning', 'Data Science'];
    return (
        <Box borderTop={0.5} marginTop={1} paddingTop={2} bgcolor="#fff">
            <Container maxWidth='xl' align='center'>
                <Grid container alignItems='flex-end' justify='center' spacing={2}>
                    <Grid item>
                        <Chips values={availableLocations} label="Locations" value={locations} handleValue={handlelocations} />
                    </Grid>
                    <Grid item>
                        <InputLabel>Salary</InputLabel>
                        <TextField placeholder='low-high' onChange={handleSalary}>{salary}</TextField>
                    </Grid>
                    <Grid item>
                        <Chips values={availableSkills} label="Skills" value={skills} handleValue={handleSkills}/>
                    </Grid>
                    <Grid item>
                        <Chips values={availableFields} label="fields" value={fields} handleValue={handleField} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Search;