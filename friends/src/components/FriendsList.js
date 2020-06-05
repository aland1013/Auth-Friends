import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import FriendForm from './FriendForm';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('http://localhost:5000/api/friends')
      .then((res) => {
        console.log(res);
        setFriends(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2 className='ui horizontal divider header'>
        <i className='users icon'></i>
        FriendsList
      </h2>
      <div className='ui cards'>
        {friends.map((friend) => {
          return (
            <div className='card'>
              <div className='content'>
                <div className='header'>{friend.name}</div>
                <div className='description'>
                  <p>Age: {friend.age}</p>
                  <p>Email: {friend.email}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='ui hidden divider'></div>
      <FriendForm />
    </>
  );
};

export default FriendsList;
