import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Detail from './components/detail/detail';
import Home from './components/home/home';
import Search from './components/search/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/search' component={Search} />
          <Route path='/series/:id' component={Detail} />
          <Route path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
