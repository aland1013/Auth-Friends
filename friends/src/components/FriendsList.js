import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { FriendsContext } from '../contexts/FriendsContext';
import FriendForm from './FriendForm';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [friendToEdit, setFriendToEdit] = useState({});
  const [formState, setFormState] = useState({
    name: '',
    age: '',
    email: ''
  });

  useEffect(() => {
    axiosWithAuth()
      .get('http://localhost:5000/api/friends')
      .then((res) => {
        console.log(res);
        setFriends(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteFriend = (id) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then((res) => {
        setFriends(res.data);
        setFormState({
          name: '',
          age: '',
          email: ''
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <FriendsContext.Provider
      value={{
        setFriends,
        friendToEdit,
        setFriendToEdit,
        formState,
        setFormState
      }}
    >
      <h2 className='ui horizontal divider header'>
        <i className='users icon'></i>
        FriendsList
      </h2>
      <div className='ui cards'>
        {friends.map((friend) => {
          return (
            <div className='card' key={friend.id}>
              <div className='content'>
                <div className='header'>{friend.name}</div>
                <div className='description'>
                  <p>Age: {friend.age}</p>
                  <p>Email: {friend.email}</p>
                </div>
              </div>
              <div className='extra content'>
                <div className='ui two buttons'>
                  <div
                    className='ui basic blue button'
                    onClick={() => setFriendToEdit(friend)}
                  >
                    edit
                  </div>
                  <div
                    className='ui basic red button'
                    onClick={() => deleteFriend(friend.id)}
                  >
                    delete
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='ui hidden divider'></div>
      <FriendForm />
    </FriendsContext.Provider>
  );
};

export default FriendsList;
