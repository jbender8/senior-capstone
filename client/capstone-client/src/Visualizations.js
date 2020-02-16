import React from 'react';
import {
    Bar, BarChart, Legend, Tooltip, XAxis, YAxis, PieChart, Pie, Cell
} from 'recharts';
  


export const Vis1 = ({data}) => {
    return (
        <BarChart width={600} height={200} data={data}>
            <XAxis dataKey="title" />
		    <YAxis />
		    <Bar dataKey="salary" fill="#8884d8" />
	    </BarChart>
    );
}
  
  const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Vis2 = ({data}) => {
    return (
        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" label>
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
          </Pie>
        <Legend />
        </PieChart>
      );
}