import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className='ui container'>
      <Router>
        <Route path='/login' component={Login} />
      </Router>
    </div>
  );
}

export default App;
