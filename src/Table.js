import React, { Component } from 'react';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const paperStyle = {
  position: 'relative',
  minHeight: 150,
  minWidth: 150
};

const typographyStyle = {
  fontSize: 40,
  verticalAlign: 'middle',
  lineHeight: 3,
  padding: 10
}

class Table extends Component {
  constructor(props) {
    super(props);
    this.digitClick = this.digitClick.bind(this);
  }
  createTable = () => {
    let matrix = this.props.matrix;
    let table = [];
    let count = 0;
    for (let i = 0; i < matrix; i++) {
      let children = [];
      for (let j = 0; j < matrix; j++) {
        children.push(
          <td class='text-center'>
            <Paper className={count} onClick={this.digitClick} style={paperStyle}>
              <Typography id={count} className='cursor-pointer' style={typographyStyle}>
                {this.props.problem_state[count]}
              </Typography>
            </Paper>
          </td>
        );
        count++;
      }
      table.push(<tr>{children}</tr>);
    }
    return table;
  }
  digitClick(event) {
    this.props.digitClick(event);
  }
  render() {
    return (
      <table align="center">
        {this.createTable()}
      </table>
    );
  }
}

export default Table;