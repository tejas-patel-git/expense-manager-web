import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';

function Accounts() {
  const { state, dispatch } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState({ id: null, name: '', type: '', balance: 0 });

  const handleOpen = (acc = null) => {
    setAccount(acc || { id: null, name: '', type: '', balance: 0 });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (account.id) {
      const updatedAccounts = state.accounts.map((a) => (a.id === account.id ? account : a));
      dispatch({ type: 'SET_ACCOUNTS', payload: updatedAccounts });
    } else {
      const newAccount = { ...account, id: Date.now() };
      dispatch({ type: 'SET_ACCOUNTS', payload: [...state.accounts, newAccount] });
    }
    handleClose();
  };

  const handleDelete = (id) => {
    const updatedAccounts = state.accounts.filter((a) => a.id !== id);
    dispatch({ type: 'SET_ACCOUNTS', payload: updatedAccounts });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Account
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.accounts.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.name}</TableCell>
              <TableCell>{a.type}</TableCell>
              <TableCell>{a.balance}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(a)}>Edit</Button>
                <Button onClick={() => handleDelete(a.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{account.id ? 'Edit Account' : 'Add Account'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={account.name}
            onChange={(e) => setAccount({ ...account, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            value={account.type}
            onChange={(e) => setAccount({ ...account, type: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Balance"
            type="number"
            value={account.balance}
            onChange={(e) => setAccount({ ...account, balance: parseFloat(e.target.value) })}
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

export default Accounts;