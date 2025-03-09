import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Grid, Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function Dashboard() {
  const { state } = useContext(AppContext);
  const totalBalance = state.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalAllocated = state.allocations.reduce((sum, alloc) => sum + alloc.amount, 0);
  const availableBalance = totalBalance - totalAllocated;

  const expenseData = state.transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expenseData).map(([name, value]) => ({ name, value }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper>
          <Typography variant="h6">Total Balance</Typography>
          <Typography>${totalBalance.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper>
          <Typography variant="h6">Available Balance</Typography>
          <Typography>${availableBalance.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h6">Expenses by Category</Typography>
          <PieChart width={400} height={400}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;