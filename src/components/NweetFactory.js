import React, { useState } from 'react';
import {dbService, storageService} from 'fbInstance';

import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');
  
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
    setAttachment('');
    const fileUploadInput = document.getElementById("file");
    fileUploadInput.value = null;
  }

  return (
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
  )
}

export default NweetFactory;