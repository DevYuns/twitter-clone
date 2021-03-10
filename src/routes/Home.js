import React, { useEffect, useState } from 'react';

import Nweet from 'components/Nweet';
import {dbService} from 'fbInstance';

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection('nweets').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }));
      setNweets(nweetArray);
    })
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet('');
  }

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value); 
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input
          type="submit"
          value="Nweet"
        />
      </form>
      <div>
        {nweets.map(nweet => {
          return <Nweet nweetObj={nweet} key={nweet.id} isOwner={nweet.creatorId === userObj.uid}/>;
        })}
      </div>
    </div>
  );
}

export default Home;