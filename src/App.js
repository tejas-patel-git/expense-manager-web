import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, AppContext } from './contexts/AppContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import SavingsGoals from './pages/SavingsGoals';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Separate component to use the context
function AppContent() {
  const { state, dispatch } = useContext(AppContext);

  // Simulate initial data fetch (replace with real API calls if available)
  useEffect(() => {
    if (!state.accounts.length) {
      dispatch({
        type: 'SET_ACCOUNTS',
        payload: [
          { id: 1, name: 'Bank', type: 'Savings', balance: 1000 },
          { id: 2, name: 'Cash', type: 'Cash', balance: 500 },
        ],
      });
      dispatch({
        type: 'SET_TRANSACTIONS',
        payload: [
          { id: 1, date: '2025-03-01', amount: 200, category: 'Food', accountId: 1, type: 'expense', description: 'Groceries' },
          { id: 2, date: '2025-03-02', amount: 300, category: 'Salary', accountId: 1, type: 'income', description: 'Paycheck' },
        ],
      });
      dispatch({
        type: 'SET_SAVINGS_GOALS',
        payload: [
          { id: 1, name: 'Vacation', targetAmount: 1000, currentAllocatedAmount: 300 },
        ],
      });
    }
  }, [dispatch, state.accounts.length]);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Expense Manager
          </Typography>
          {state.user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/transactions">
                Transactions
              </Button>
              <Button color="inherit" component={Link} to="/accounts">
                Accounts
              </Button>
              <Button color="inherit" component={Link} to="/savings-goals">
                Savings Goals
              </Button>
              <Button color="inherit" component={Link} to="/reports">
                Reports
              </Button>
              <Button color="inherit" component={Link} to="/settings">
                Settings
              </Button>
              <Button color="inherit" onClick={() => dispatch({ type: 'SET_USER', payload: null })}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={state.user ? <Dashboard /> : <Login />} />
          <Route path="/transactions" element={state.user ? <Transactions /> : <Login />} />
          <Route path="/accounts" element={state.user ? <Accounts /> : <Login />} />
          <Route path="/savings-goals" element={state.user ? <SavingsGoals /> : <Login />} />
          <Route path="/reports" element={state.user ? <Reports /> : <Login />} />
          <Route path="/settings" element={state.user ? <Settings /> : <Login />} />
          <Route path="/" element={state.user ? <Dashboard /> : <Login />} />
        </Routes>
      </Box>
    </Router>
  );
}

function App() {
  const [theme, setTheme] = React.useState('dark');

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <AppProvider>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;