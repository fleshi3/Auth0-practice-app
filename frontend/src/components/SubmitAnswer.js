import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  updateAnswer = value => {
    this.setState({
      answer: value,
    });
  };

  submit() {
    this.props.submitAnswer(this.state.answer);
    this.setState({
      answer: '',
    });
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <div className="submitAnswer">
        <div>
          <label>A:</label>
          <input
            type="text"
            onChange={e => this.updateAnswer(e.target.value)}
            className="inputAnswer"
            placeholder="Share your answer"
            value={this.state.answer}
          />
        </div>
        <button onClick={() => this.submit()}>SUBMIT</button>
      </div>
    );
  }
}

export default withRouter(SubmitAnswer);
