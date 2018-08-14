import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
class Header extends Component {
  constructor(props) {
    super(props);
    this.handleMenuIconClick = this.handleMenuIconClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }
  handleMenuIconClick(event) {
    this.props.handleMenuIconClick(event);
  }
  handleMenuClose(event) {
    this.props.handleMenuClose(event);
  }
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu"
            aria-owns={this.props.isMenuOpen ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleMenuIconClick}>
            <MenuIcon />
          </IconButton>
          <Menu
              id="simple-menu"
              anchorEl={this.props.isMenuOpen}
              open={Boolean(this.props.isMenuOpen)}
              onClose={this.handleMenuClose}
            >
              <MenuItem className='menu-item' onClick={this.handleMenuClose} id='3'>3 * 3 Puzzle</MenuItem>
              <MenuItem className='menu-item' onClick={this.handleMenuClose} id='4'>4 * 4 Puzzle</MenuItem>
              <MenuItem className='menu-item' onClick={this.handleMenuClose} id='5'>5 * 5 Puzzle</MenuItem>
              <MenuItem className='menu-item' onClick={this.handleMenuClose} id='6'>6 * 6 Puzzle</MenuItem>
              <MenuItem className='menu-item' onClick={this.handleMenuClose} id='7'>7 * 7 Puzzle</MenuItem>
              <MenuItem className='menu-item' onClick={this.handleMenuClose} id='8'>8 * 8 Puzzle</MenuItem>
            </Menu>
          <Typography variant="title" color="inherit" style={{flex: 1}}>
            N-Puzzle
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Header;