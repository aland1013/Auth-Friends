import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post('http://localhost:5000/api/login', credentials)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        console.log('token', res.data.payload);
      })
      .catch((err) => console.error('err.message: ', err.message));
    setIsLoading(false);
  };

  return (
    <form onSubmit={login}>
      <div className='ui equal width form'>
        <div className='fields'>
          <div className='field'>
            <label>Username</label>
            <input
              type='text'
              name='username'
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className='field'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button
        className={
          'ui submit ' + (isLoading ? 'loading' : '') + ' button primary'
        }
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
