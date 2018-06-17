import React, { Component } from 'react';


class Test extends Component {
  render() {
    return (
      <div className="container">
       1235
        {console.log(localStorage.getItem('access_token'))}
      </div>
    );
  }
}

export default Test;
