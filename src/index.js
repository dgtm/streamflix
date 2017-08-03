import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Router, Route, IndexRoute } from 'react-router'
import { createBrowserHistory } from 'history';

import App from './containers/App';
import Admin from './containers/admin';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './index.css';
const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/admin" component={Admin}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
