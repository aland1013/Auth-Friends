import React, { useContext, useState, useEffect } from 'react';
import * as yup from 'yup';
import axiosWithAuth from '../utils/axiosWithAuth';
import { FriendsContext } from '../contexts/FriendsContext';

const FriendForm = () => {
  const { setFriends, friendToEdit, formState, setFormState } = useContext(
    FriendsContext
  );

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    email: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formSchema = yup.object().shape({
    name: yup.string().required('Friend name is required'),
    age: yup.number().required('Friend age is required'),
    email: yup.string().required('Friend email is required')
  });

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: '' });
      })
      .catch((err) => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
  };

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setIsButtonDisabled(!valid);
    });
  }, [formState]);

  useEffect(() => {
    if (friendToEdit) {
      setFormState(friendToEdit);
    }
  }, [friendToEdit]);

  const addFriend = (friend) => {
    if (friend.id) {
      axiosWithAuth()
        .put(`http://localhost:5000/api/friends/${friend.id}`, friend)
        .then((res) => {
          setFriends(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axiosWithAuth()
        .post('http://localhost:5000/api/friends', friend)
        .then((res) => {
          console.log(res);
          setFriends(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    addFriend(formState);

    // axiosWithAuth()
    //   .post('http://localhost:5000/api/friends', formState)
    //   .then((res) => {
    //     console.log(res);
    //     setFriends(res.data);
    //   })
    //   .catch((err) => console.log(err));

    setFormState({
      name: '',
      age: '',
      email: ''
    });
  };

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <>
      <h3 className='ui horizontal divider header'>
        <i className='user plus icon'></i>
        Add a Friend
      </h3>
      <form className='ui form' onSubmit={formSubmit}>
        <div className='six wide field'>
          <label htmlFor='name'>
            Name
            <input
              type='text'
              name='name'
              onChange={inputChange}
              value={formState.name}
            />
          </label>
        </div>
        <div className='two wide field'>
          <label htmlFor='age'>
            Age
            <input
              type='number'
              name='age'
              onChange={inputChange}
              value={formState.age}
            />
          </label>
        </div>
        <div className='six wide field'>
          <label htmlFor='email'>
            Email Address
            <input
              type='email'
              name='email'
              onChange={inputChange}
              value={formState.email}
            />
          </label>
        </div>
        <button
          className='ui button primary'
          disabled={isButtonDisabled}
          type='submit'
        >
          submit
        </button>
      </form>
    </>
  );
};

export default FriendForm;
