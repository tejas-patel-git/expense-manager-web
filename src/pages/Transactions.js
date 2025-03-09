import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem } from '@mui/material';

function Transactions() {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState({ id: null, date: '', amount: '', category: '', accountId: '', type: 'expense', description: '' });

  const handleOpen = (trans = null) => {
    setTransaction(trans || { id: null, date: '', amount: '', category: '', accountId: '', type: 'expense', description: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (transaction.id) {
      const updatedTransactions = state.transactions.map((t) => (t.id === transaction.id ? transaction : t));
      dispatch({ type: 'SET_TRANSACTIONS', payload: updatedTransactions });
    } else {
      const newTransaction = { ...transaction, id: Date.now() };
      dispatch({ type: 'SET_TRANSACTIONS', payload: [...state.transactions, newTransaction] });
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const updatedTransactions = state.transactions.filter((t) => t.id !== id);
    dispatch({ type: 'SET_TRANSACTIONS', payload: updatedTransactions });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Transaction
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.transactions.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.date}</TableCell>
              <TableCell>{t.amount}</TableCell>
              <TableCell>{t.category}</TableCell>
              <TableCell>{state.accounts.find((a) => a.id === t.accountId)?.name}</TableCell>
              <TableCell>{t.type}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(t)}>Edit</Button>
                <Button onClick={() => handleDelete(t.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{transaction.id ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            value={transaction.date}
            onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            type="number"
            value={transaction.amount}
            onChange={(e) => setTransaction({ ...transaction, amount: parseFloat(e.target.value) })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category"
            value={transaction.category}
            onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Account"
            value={transaction.accountId}
            onChange={(e) => setTransaction({ ...transaction, accountId: e.target.value })}
            fullWidth
            margin="normal"
          >
            {state.accounts.map((a) => (
              <MenuItem key={a.id} value={a.id}>
                {a.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Type"
            value={transaction.type}
            onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
            fullWidth
            margin="normal"
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
          <TextField
            label="Description"
            value={transaction.description}
            onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
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

export default Transactions;