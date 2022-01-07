import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/home';

import './App.css';
import Spinner from './components/spinner/spinner';
const Search = React.lazy(() => import('./components/search/Search'));
const Detail = React.lazy(() => import('./components/detail/detail'));
const Favourite = React.lazy(() => import('./components/favourite/favourite'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/search' exact render={() => <Suspense fallback={<Spinner />}><Search /></Suspense>} />
          <Route path='/series/:id' exact render={() => <Suspense fallback={<Spinner />}><Detail /></Suspense>} />
          <Route path='/favourites' exact render={() => <Suspense fallback={<Spinner />}><Favourite /></Suspense>} />
          <Route path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
