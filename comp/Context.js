import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { createContext, useState, useEffect } from 'react'

export const Context = createContext()

const Context = ({ children }) => {

  const [theme, setTheme] = useState('light');
    
  const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Context.Provider value={{theme,toggleTheme}}>
      {children}
    </Context.Provider>
  )
}

export default Context