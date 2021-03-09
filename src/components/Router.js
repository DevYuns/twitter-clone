import { HashRouter, Route, Switch } from 'react-router-dom';

import Auth from '../routes/Auth';
import EditProfile from '../routes/EditProfile';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import React from 'react';

const Router = ({isLoggedIn}) => {
  return (
    <HashRouter>
      <Switch>
        {isLoggedIn ? (
          <> 
            <Route exact path="/">
              <Home/>
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth/>
          </Route>
        )}
      </Switch>
    </HashRouter>
  )
}

export default Router;