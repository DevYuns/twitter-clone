import React, { useEffect, useState } from 'react';
import {dbService, storageService} from 'fbInstance';

import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    let attachmentUrl = "";
    if(attachment != "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    }
    await dbService.collection('nweets').add(nweetObj);
    setNweet('');
    setAttachment('');
  }

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value); 
  }

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget : { result }
      } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttacthment = () => {
    setAttachment("");
    const fileUploadInput = document.getElementById("file");
    fileUploadInput.value = null;
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
          id="file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        <input
          type="submit"
          value="Nweet"
        />
        {attachment && (
          <div>
            <img
              arc={attachment}
              width="50px"
              height="50px"
            />
            <button onClick={onClearAttacthment}>Clear</button>
          </div>)}
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