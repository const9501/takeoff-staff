import React from 'react';
import {Link} from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className='not-found-page'>
      <h1>Not found</h1>
      <Link to='/'>Go home</Link>
    </div>
  );
};

export default NotFoundPage;