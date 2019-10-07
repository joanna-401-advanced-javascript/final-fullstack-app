import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';
import Score from './components/Score';

const API_URL = 'http://localhost:5000';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      score: 0,
    };
  }

  componentDidMount() {
    superagent.get(`${API_URL}/scores`)
      .then(results => {
        this.props.loadStore(results.body);
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    superagent.post(`${API_URL}/scores`)
      .send({ name: this.state.name, score: this.state.score })
      .set('Accept', 'application/json')
      .then(response => {
        this.props.addScore(response.body);
        return response.body;
      })
      .then(results => {
        this.props.loadStore(results);
      })
      .catch(console.log);
    this.setState({ name: '', score: 0 });
  };

  render(){
    return(
      <>
        <h1>High Scores</h1>

        <ul>
          {
            this.props.scores.map((score, i) => <Score key={score._id} score={score} rank={i} />)
          }
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label> Name
              <input
                name='name'
                type='text'
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <label> Score
              <input
                name='score'
                type='number'
                value={this.state.score}
                onChange={this.handleChange}
              />
            </label>
            <button type='submit'>Add Score</button>
        </form>

      </>
    )
  }
}

const mapStateToProps = (state) => ({
  scores: state.scores,
});

const mapDispatchToProps = (dispatch) => ({
  loadStore: (scores) => {
    const sortedData = scores.sort((a, b) => {
      return b.score - a.score;
    });
    dispatch({
      type: 'SCORE_GET',
      payload: sortedData,
    });
  },
  addScore: (data) => {
    dispatch({
      type: 'SCORE_ADD',
      payload: data
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
