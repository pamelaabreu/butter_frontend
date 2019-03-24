import React from 'react';

export default (props) => {
  const { location } = props;
  return (
    <div>
      <div>
        <h1>Error 404</h1>
        <p>Page {location.pathname} not found</p>
      </div>
    </div>
  );
}