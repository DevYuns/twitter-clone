import { HashRouter, Route, Switch } from 'react-router-dom';

import Auth from 'routes/Auth';
import EditProfile from 'routes/EditProfile';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';
import React from 'react';

const Router = ({isLoggedIn, userObj}) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <> 
            <Route exact path="/">
              <Home userObj={userObj}/>
            </Route>
            <Route exact path="/profile">
              <Profile/>
            </Route>
            </>
            ) : (
            <>
              <Route exact path="/">
                <Auth/>
              </Route>
            </>
        )}
      </Switch>
    </HashRouter>
  )
}

export default Router;