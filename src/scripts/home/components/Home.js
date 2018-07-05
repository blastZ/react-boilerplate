import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import homeStyles from '../home.css';

class Home extends Component {
  componentDidMount() {
    fetch('/api/getlist')
      .then((data) => data.text())
      .then((result) => {
        console.log(result);
      })
  }
  render() {
    const { sayHello } = this.props;
    return (
      <div className="home-container">
        <Link to="about" className="link-button">Home To About</Link>
        <p style={{color: 'rgba(255,0,0,0.6)'}}>Hello</p>
        <p className={homeStyles.colorBye}>Bye</p>
      </div>
    )
  }
}

export default Home;