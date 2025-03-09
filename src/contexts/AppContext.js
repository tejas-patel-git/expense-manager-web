import React, { createContext, useReducer } from 'react';

const initialState = {
  accounts: [],
  transactions: [],
  savingsGoals: [],
  allocations: [],
  user: null,
  theme: 'light',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return { ...state, accounts: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_SAVINGS_GOALS':
      return { ...state, savingsGoals: action.payload };
    case 'SET_ALLOCATIONS':
      return { ...state, allocations: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}