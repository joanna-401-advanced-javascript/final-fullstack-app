import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';

const API_URL = 'http://localhost:5000';

const If = (props) => {
  return props.condition ? props.children : null;
};

class Score extends React.Component {

  handleDelete = (event) => {
    event.preventDefault();

    superagent.delete(`${API_URL}/scores/${this.props.score._id}`)
      .then(results => {
        this.props.loadStore(results.body);
      })
      .catch(console.log);
  };

  render(){
    return(
      <>
        <If condition={this.props.rank === 0}>
          <li key={this.props.score._id}>(TOP SCORE!) {this.props.score.name} - {this.props.score.score} </li>
          <button onClick={this.handleDelete}>Delete</button>
        </If>
        <If condition={this.props.rank > 0}>
          <li key={this.props._id}>{this.props.score.name} - {this.props.score.score} </li>
          <button onClick={this.handleDelete}>Delete</button>
        </If>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadStore : (scores) => {
    const sortedData = scores.sort((a, b) => {
      return b.score - a.score;
    });
    dispatch({
      type: 'SCORE_GET',
      payload: sortedData,
    });
  },
});

export default connect(null, mapDispatchToProps)(Score);
