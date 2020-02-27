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

const Search = ({skills, setSkills, salary, setSalary, locations, setlocations, feild, setFeild}) => {

    const handlelocations = event => {
        setlocations(event.target.value);
    }

    const handleSalary = event => {
        setSalary(event.target.value);
    }

    const handleFeild = event => {
        setFeild(event.target.value);
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

    const availableSkills = ['Python', 'SQL', 'R', 'Hadoop', 'spark', 'Java', 'SAS', 'tableau', 'hive', 'Scala', 'AWS', 'c++', 'matlab', 'tensorflow', 'C', 'excel', 'NoSql', 'Linux', 'azure', 'sclkit-learn', 'SPSS', 'pandas', 'JavaScript', 'Perl', 'C#', 'numpy', 'keras', 'git', 'docker', 'MySQL', 'hbase', 'mongodb', 'Cassandra', 'pytorch', 'd3', 'caffe'];
    const availableLocations = ['Chicago', 'San Francisco', 'New York City', 'Seattle', 'Houston'];
    const availableFeilds = ['Artificial Intelligence', 'deep learning', 'machine learning', 'data science'];
    return (
        <div className="page-serch">
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
                    <Grid item>
                        <Chips values={availableFeilds} label="Fields" value={feild} handleValue={handleFeild} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
        </div>
    );
}

export default Search;