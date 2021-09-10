import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './../components/GoogleAuth';

const Header = () => {
  return (
    <div className="Header flex justify-between items-center border-b-4 border-purple-500 py-3 mb-4">
      <Link className="text-xl" to="/">
        Streamy
      </Link>
      <div className="right_menu flex space-x-3 items-center">
        <Link to="/">All Streams</Link>
        <GoogleAuth />
      </div>
    </div>
  );
};
export default Header;
