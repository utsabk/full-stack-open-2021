import React from 'react';

const Notification = ({ message, background }) => {
  const notificationStyle = {
    color: background ? 'green' : 'red',
    background: 'lightgrey',
    borderStyle: 'solid',
    fontStyle: 'bold',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 20,
  };

  if (message === null) {
    return null;
  }

  return (
    <div style={notificationStyle}>
      {message} <br />
    </div>
  );
};

export default Notification;
