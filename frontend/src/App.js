import React, {Component} from 'react';
import NavBar from './components/NavBar';
import Questions from './components/Questions';
import Question from './components/Question';
import Callback from './Callback';
import {Route} from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="placeholderText">
          <Route exact path="/" component={Questions} />
          <Route exact path="/question/:questionId" component={Question} />
          <Route exact path="/callback" component={Callback} />
        </div>
      </div>
    );
  }
}

export default App;
