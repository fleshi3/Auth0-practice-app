import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../../Auth';
import axios from 'axios';

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      description: '',
    };
  }

  updateDescription = value => {
    this.setState({
      description: value,
    });
  };

  updateTitle = value => {
    this.setState({
      title: value,
    });
  };

  async submit() {
    this.setState({
      disabled: true,
    });
    await axios.post(
      'http://localhost:8081',
      {
        title: this.state.title,
        description: this.state.description,
      },
      {
        headers: {Authorization: `Bearer ${auth0Client.getIdToken()}`},
      },
    );
    this.props.history.push('/');
  }

  render() {
    return (
      <div class="newQuestionContainer">
        <div className="formGroup">
          <label htmlFor="questionTitle">Title:</label>
          <input
            type="text"
            disabled={this.state.disabled}
            onBlur={e => this.updateTitle(e.target.value)}
            className="formTitle"
            placeholder="Give your question a title"
            id="questionTitle"
          />
          <label htmlFor="questionDesc">Description:</label>
          <input
            type="text"
            disabled={this.state.disabled}
            onBlur={e => this.updateDescription(e.target.value)}
            className="formDesc"
            placeholder="Give more context to your question"
            id="questionDesc"
          />
          <button
            disabled={this.state.disabled}
            className="formButton"
            onClick={() => this.submit()}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(NewQuestion);
