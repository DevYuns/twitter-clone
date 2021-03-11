import React, { useState } from 'react';
import { authService, dbService } from 'fbInstance';

import {useHistory} from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
  }

  const onChnage = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
    refreshUser();
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input 
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChnage}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
       Log Out
      </span>
    </div>
  )
};

export default Profile;