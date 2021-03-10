import React, { useEffect, useState } from 'react';

import Router from 'components/Router';
import {authService} from 'fbInstance';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      {init 
        ? <Router isLoggedIn={Boolean(userObj)} userObj={userObj}/> 
        : "Initializing..."
      }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
