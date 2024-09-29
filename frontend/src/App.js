import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      {/* Gold background that stays behind the content */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        backgroundColor="gold"
        zIndex="-1"  /* Ensure it is behind the header */
      />

      <div className="App">
        <header className="App-header">
          {/* Existing content of your app */}
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
