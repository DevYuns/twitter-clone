import React, {useState} from 'react';
import {dbService, storageService} from 'fbInstance';

const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this nweet?');
    if(isConfirmed) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  }

  const onChange = (e) => {
    const {
      target: {value},
    } = e;
    setNewNweet(value);
  }

  const toggleEditing = () => setEditing(prev => !prev);
  
  return (
    <div>
      {editing ? (
        <>
        {
          isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="edit your nweet" 
                  value={newNweet}
                  onChange={onChange}
                  required
                />
                <input type="submit" value="Update Nweet"/>
              </form> 
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )
        }
        </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete Nweet</button>
                <button onClick={toggleEditing}>Edit Nweet</button>
              </>
            )}
          </>
        )}
    </div>
  );
}

export default Nweet;