import React from 'react';
import { Route, Switch} from 'react-router'
import Home from './components/home'
import AddMovie from './components/addMovie'
import EditMovie from './components/editMovie'
import './App.css';

class App extends React.Component {

  render(){
    return (
      <Switch>
        <Route
          exact
          path = "/"
          component = {Home} />
        <Route
          path = "/add-movie"
          component = {AddMovie} />
        <Route
          path = "/edit-movie/:movieId"
          component = {EditMovie} />
      </Switch>
    );
  }
}

export default App;
