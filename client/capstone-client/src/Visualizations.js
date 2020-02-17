import React from 'react';
import {
    Bar, BarChart, Legend, Tooltip, XAxis, YAxis, PieChart, Pie, Cell
} from 'recharts';
  
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Vis1 = ({data}) => {
    return (
      <BarChart width={550} height={250} data={data}>
        <XAxis dataKey="title" />
		    <YAxis />
		    <Bar dataKey="salary" fill="#8884d8" />
	    </BarChart>
    );
}

export const Vis2 = ({data}) => {
    return (
        <PieChart width={250} height={250}>
          <Pie data={data} dataKey="value" outerRadius={60} fill="#8884d8" label>
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
          </Pie>
        <Legend />
        </PieChart>
      );
}