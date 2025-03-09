import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FormControlLabel, Switch } from '@mui/material';

function Settings() {
  const { state, dispatch } = useContext(AppContext);

  const handleThemeChange = (event) => {
    dispatch({ type: 'SET_THEME', payload: event.target.checked ? 'dark' : 'light' });
  };

  return (
    <FormControlLabel
      control={<Switch checked={state.theme === 'dark'} onChange={handleThemeChange} />}
      label="Dark Mode"
    />
  );
}

export default Settings;