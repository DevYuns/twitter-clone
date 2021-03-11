import React, { useEffect, useState } from 'react';

import Router from 'components/Router';
import {authService} from 'fbInstance';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  
  return (
    <>
      {init 
        ? (<Router
          refreshUser={refreshUser} 
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />) 
        : "Initializing..."
      }
    </>
  );
}

export default App;
