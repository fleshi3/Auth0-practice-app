import React, {Component} from 'react';
import NavBar from './components/NavBar';
import Questions from './components/Questions';
import Question from './components/Question';
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
        </div>
      </div>
    );
  }
}

export default App;
