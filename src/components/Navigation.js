import {Link} from 'react-router-dom';
import React from 'react';

const Navigation = ({ userObj }) => {
  return (
    <ul>
      <li>
        <Link to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/profile">
          {userObj.displayName}님의 프로필
        </Link>
      </li>
    </ul>
  )
}

export default Navigation;