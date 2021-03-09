import {Link} from 'react-router-dom';
import React from 'react';

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/profile">
          my Profile
        </Link>
      </li>
    </ul>
  )
}

export default Navigation;