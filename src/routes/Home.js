import React, { useEffect, useState } from 'react';
import {dbService, storageService} from 'fbInstance';

import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({userObj}) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
     const getData = dbService.collection('nweets').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }));
      setNweets(nweetArray);
    });
    return () => getData();
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj}/>
      <div style={{ marginTop: 30 }}>
        {nweets.map(nweet => {
          return <Nweet nweetObj={nweet} key={nweet.id} isOwner={nweet.creatorId === userObj.uid}/>;
        })}
      </div>
    </div>
  );
}

export default Home;