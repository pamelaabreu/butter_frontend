/*   REACT   */
import React from 'react';

const Error404 = (props) => {
  const { location } = props;
  return (
    <div>
      <div>
        <h1>Error 404</h1>
        <p>Page {location.pathname} not found</p>
      </div>
    </div>
  );
};

export default Error404;