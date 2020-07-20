import React from 'react';
import { connect } from 'react-redux';
 

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <ul>
          {
            this.appStore.map((elem, index) => {
               
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    appStore: state,
  }),
  dispatch => ({})
)(App);
