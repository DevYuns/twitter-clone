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
    <>
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChnage}
        />
        <input type="submit" value="Update Profile"/>
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  )
};

export default Profile;