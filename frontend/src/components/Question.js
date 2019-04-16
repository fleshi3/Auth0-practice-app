import React, {Component} from 'react';
import axios from 'axios';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };
  }

  async componentDidMount() {
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
          <p className="answerSubHeading">Answers:</p>
          {question.answers.map((answer, idx) => (
            <p class="answerLead" key={idx}>
              {answer}
            </p>
          ))}
        </div>
      </div>
    );
  }
}
export default Question;
