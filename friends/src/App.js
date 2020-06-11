import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <div className='ui container'>
      <Router>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/friendsList' component={FriendsList} />
      </Router>
    </div>
  );
}

export default App;
