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

const Search = ({skills, setSkills, Minsalary,Maxsalary, setMinSalary, setMaxSalary, locations, setlocations, feild, setFeild}) => {

    const handlelocations = event => {
        setlocations(event.target.value);
    }

    const handleMinSalary = event => {
        setMinSalary(event.target.value);
    }
    const handleMaxSalary = event => {
        setMaxSalary(event.target.value);
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

    const availableSkills = ['Python', 'SQL', 'R', 'Hadoop', 'Spark', 'Java', 'SAS', 'Tableau', 'Hive', 'Scala', 'AWS', 'C++', 'MATLAB', 'TensorFlow', 'C', 'Excel', 'NoSQL', 'Linux', 'Azure', 'sclkit-learn', 'SPSS', 'Pandas', 'JavaScript', 'Perl', 'C#', 'NumPy', 'Keras', 'Git', 'Docker', 'MySQL', 'HBase', 'MongoDB', 'Cassandra', 'PyTorch', 'D3', 'Caffe'];
    const availableLocations = ['Chicago', 'San Francisco', 'New York City', 'Seattle', 'Houston'];
    const availableFeilds = ['Artificial Intelligence', 'Deep Learning', 'Machine Learning', 'Data Science'];
    return (
        <div className="page-serch">
        <Box borderTop={0.5} marginTop={1} paddingTop={2}>
            <Container maxWidth='xl' align='center'>
                <Grid container alignItems='flex-end' justify='center' spacing={2}>
                    <Grid item>
                        <Chips values={availableLocations} label="Locations" value={locations} handleValue={handlelocations} />
                    </Grid>
                    <Grid item>
                        <InputLabel>Min Salary</InputLabel>
                        <TextField placeholder='MinSalary' onChange={handleMinSalary}>{Minsalary}</TextField>
                    </Grid>
                    <Grid item>
                        <InputLabel>Max Salary</InputLabel>
                        <TextField placeholder='MaxSalary' onChange={handleMaxSalary}>{Maxsalary}</TextField>
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