import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import Header from './Header';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const cardStyle = {
  paddingTop: 40,
  paddingBottom: 40,
  paddingRight: 80,
  paddingLeft: 80

}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      goal_state: [],
      problem_state: [],
      moves: 0,
      isMenuOpen: null,
      matrix: 3
    };
    this.intiateState();
    this.digitClick = this.digitClick.bind(this);
    this.resetClick = this.resetClick.bind(this);
    this.handleMenuIconClick = this.handleMenuIconClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }
  intiateState = () => {
    this.state.problem_state = generateRandomNumbers(this.state.matrix);
    this.state.goal_state = this.state.problem_state.slice().sort();
  }
  resetState = (matrix) => {
    let new_problem = generateRandomNumbers(matrix);
    let newState = {
      goal_state: this.state.goal_state,
      problem_state: new_problem,
      moves: 0,
      isMenuOpen: null,
      matrix: matrix
    };
    this.setState(newState);
  }
  digitClick(event) {
    if(event.target.innerHTML != '') {
      let array_element = parseInt(event.target.id);
      let matrix = this.state.matrix;
      let row = Math.floor(array_element / matrix);
      let col = array_element % matrix;
      let position = getPosition(row, col, matrix);
      console.log(position);
      let neighbours = getNeighbours(position[0], position[1], array_element + 1, matrix);
      let index_to_move = value_to_be_moved(neighbours, this.state.problem_state);
      if(index_to_move != undefined) {
        this.state.moves++;
        this.setState(swapTheElements(array_element, index_to_move, this.state));
      }
      debugger;
      if(this.state.problem_state.join('') == this.state.goal_state.join('') ) {
        var won_string = "you won in " + this.state.moves + " moves !!";
        this.resetState(this.state.matrix);
        alert(won_string);
      }
    }
  }
  resetClick(event) {
    this.resetState(this.state.matrix);
  }
  handleMenuIconClick(event) {
    var currentState = this.state;
    currentState.isMenuOpen = event.currentTarget;
    this.setState(currentState);
  }
  handleMenuClose(event) {
    if(event.target.className.split(' ').pop() == "menu-item") {
      this.resetState(parseInt(event.target.id));
    } else {
      var currentState = this.state;
      currentState.isMenuOpen = null;
      this.setState(currentState);
    }
  }
  render() {
    return (
      <Grid container justify="center">
        <Header isMenuOpen={this.state.isMenuOpen} handleMenuIconClick={this.handleMenuIconClick} handleMenuClose={this.handleMenuClose} />
        <Grid item xs={5} container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}>
          <Card style={cardStyle}>
            <br />
            <Grid item xs={12} style={{textAlign: 'center'}}>
              <label>Moves: </label> {this.state.moves}
            </Grid>
            <Table problem_state={this.state.problem_state} digitClick={this.digitClick} matrix={this.state.matrix} />
            <br />
            <Grid item xs={12} style={{textAlign: 'center'}}>
              <Button variant="contained" color="secondary" onClick={this.resetClick}>
                Reset
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

function generateRandomNumbers(matrix) {
  var randomNums = Math.pow(matrix, 2) - 1;
  var random_arr = [];
  while(random_arr.length < randomNums){
    var randomnumber = Math.floor(Math.random() * randomNums) + 1;
    if(random_arr.indexOf(randomnumber) > -1) continue;
    random_arr[random_arr.length] = randomnumber;
  }
  random_arr.push('');
  return random_arr;
}
function getPosition(row, col, matrix) {
  let result = [];
  if (row == 0) {
    result[0] = 'not_up';
  }
  else if(row == (matrix - 1)) {
    result[0] = 'not_down';
  }
  else {
    result[0] = 'all'
  }
  if (col == 0) {
    result[1] = 'not_pre'
  }
  else if (col == (matrix - 1)){
    result[1] = 'not_next'
  }
  else {
    result[1] = 'all'
  }
  return result;
}

function getNeighbours(row, col, selected_postion, matrix) {
  let neighbourPosition = [];
  if (row == 'all') {
    neighbourPosition.push(selected_postion + matrix);
    neighbourPosition.push(selected_postion - matrix);
    if (col == 'all' || col == 'not_next'){
      neighbourPosition.push(selected_postion - 1);
    }
    if (col == 'all' || col == 'not_pre') {
      neighbourPosition.push(selected_postion + 1);
    }
  }
  else if(row == 'not_up') {
    neighbourPosition.push(selected_postion + matrix);
    if(col == 'all' || col == 'not_next') {
      neighbourPosition.push(selected_postion - 1);
    }
    if (col == 'all' || col == 'not_pre') {
      neighbourPosition.push(selected_postion + 1);
    }
  }
  else if (row == 'not_down') {
    neighbourPosition.push(selected_postion - matrix);
    if(col == 'all' || col == 'not_next') {
      neighbourPosition.push(selected_postion - 1);
    }
    if (col == 'all' || col == 'not_pre') {
      neighbourPosition.push(selected_postion + 1);
    }
  }
  return neighbourPosition;
}

function value_to_be_moved(neighbours, problem_state) {
  var result;
  neighbours.forEach(function(neighbour) {
    if (problem_state[neighbour - 1] == ''){
      result = neighbour - 1;
    }
  });
  return result;
}

function swapTheElements(clicked_index, blank_index, state) {
  var blank_ele = state.problem_state[blank_index];
  state.problem_state[blank_index] = state.problem_state[clicked_index];
  state.problem_state[clicked_index] = blank_ele;
  return state;
}

export default App;