import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './components/search/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/search' component={Search} />
          <Route path='/' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
