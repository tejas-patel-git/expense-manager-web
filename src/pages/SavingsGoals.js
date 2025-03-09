import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, LinearProgress } from '@mui/material';

function SavingsGoals() {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState({ id: null, name: '', targetAmount: 0, currentAllocatedAmount: 0 });

  const handleOpen = (g = null) => {
    setGoal(g || { id: null, name: '', targetAmount: 0, currentAllocatedAmount: 0 });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (goal.id) {
      const updatedGoals = state.savingsGoals.map((g) => (g.id === goal.id ? goal : g));
      dispatch({ type: 'SET_SAVINGS_GOALS', payload: updatedGoals });
    } else {
      const newGoal = { ...goal, id: Date.now() };
      dispatch({ type: 'SET_SAVINGS_GOALS', payload: [...state.savingsGoals, newGoal] });
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const updatedGoals = state.savingsGoals.filter((g) => g.id !== id);
    dispatch({ type: 'SET_SAVINGS_GOALS', payload: updatedGoals });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Savings Goal
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Target Amount</TableCell>
            <TableCell>Current Allocated</TableCell>
            <TableCell>Progress</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.savingsGoals.map((g) => (
            <TableRow key={g.id}>
              <TableCell>{g.name}</TableCell>
              <TableCell>{g.targetAmount}</TableCell>
              <TableCell>{g.currentAllocatedAmount}</TableCell>
              <TableCell>
                <LinearProgress variant="determinate" value={(g.currentAllocatedAmount / g.targetAmount) * 100} />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(g)}>Edit</Button>
                <Button onClick={() => handleDelete(g.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{goal.id ? 'Edit Savings Goal' : 'Add Savings Goal'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={goal.name}
            onChange={(e) => setGoal({ ...goal, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Target Amount"
            type="number"
            value={goal.targetAmount}
            onChange={(e) => setGoal({ ...goal, targetAmount: parseFloat(e.target.value) })}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SavingsGoals;