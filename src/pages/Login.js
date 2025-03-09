import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom'; // Changed useHistory to useNavigate
import { TextField, Button, Container, Typography } from '@mui/material'; // Using @mui/material as per previous recommendation

function Login() {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate(); // Changed from useHistory to useNavigate
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    dispatch({ type: 'SET_USER', payload: { username } });
    navigate('/dashboard'); // Changed history.push to navigate
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}

export default Login;