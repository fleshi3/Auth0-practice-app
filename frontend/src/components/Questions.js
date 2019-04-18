import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Questions extends Component {
  constructor(props) {
    super(props);
    // set initial state
    this.state = {
      questions: null,
    };
  }

  async componentDidMount() {
    const questions = (await axios.get('http://localhost:8081')).data;
    this.setState({
      questions,
    });
  }

  // Questions element template
  questionCard = questions => {
    const {id, answers, title, description} = questions;
    return (
      <div class="questionCard" key={id}>
        <Link to={`/question/${id}`}>
          <div className="cardContainer">
            <div className="cardHeader">Answers: {answers.length}</div>
            <div className="cardBody">
              <h4 className="cardTitle">{title}</h4>
              <p className="cardText">{description}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  render() {
    const {questions} = this.state;
    return (
      <div class="questionsContainer">
        <div className="row">
          {questions === null && <p>Loading questions...</p>}
          {questions && questions.map(this.questionCard)}
      <div class="questionCard" key="NEW_QUESTION">
              <Link to="/new-question">
          <div className="cardContainer">
            <div className="cardHeader"></div>
            <div className="cardBody newQuestion">
              <h4 className="cardTitle">Have a question?</h4>
              <p className="cardText">Click here to sign in and submit a new question!</p>
            </div>
          </div>
        </Link>
      </div>
        </div>
      </div>
    );
  }
}

export default Questions;
