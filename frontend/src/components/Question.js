import React, {Component} from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import auth0Client from '../Auth';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const {
      match: {params},
    } = this.props;
    const question = (await axios.get(
      `http://localhost:8081/question/${params.questionId}`,
    )).data;
    this.setState({
      question,
    });
  }

  async submitAnswer(answer) {
    await axios.post(
      `http://localhost:8081/answer/${this.state.question.id}`,
      {
        answer,
      },
      {
        headers: {Authorization: `Bearer ${auth0Client.getIdToken()}`},
      },
    );
    await this.refreshQuestion();
  }

  render() {
    const {question} = this.state;
    if (question === null) return <p>Loading...</p>;
    return (
      <div class="questionContainer">
        <div className="answerContainer">
          <span className="answerTitle">{question.title}</span>
          <p className="answerDescription">
            <b>Q:</b>
            &emsp;
            {question.description}
          </p>
          <hr className="separator" />
          <SubmitAnswer
            questionId={question.id}
            submitAnswer={this.submitAnswer}
          />
          <p className="answerSubHeading">Answers:</p>
          {question.answers.map((answer, idx) => (
            <p class="answerLead" key={idx}>
              "{answer.answer}" <b>-{answer.author}</b>
            </p>
          ))}
        </div>
      </div>
    );
  }
}
export default Question;
