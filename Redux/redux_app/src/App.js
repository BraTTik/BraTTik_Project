import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component{
  addTrack = () =>{
    console.log('addTrack', this.trackInput.value);
    this.props.onAddTrack(this.trackInput.value);
    this.trackInput.value = '';
  }
  render(){
    console.log(this.props.testStore)
    return (
      <div className="App">
        <input type="text" ref = {(input) => { this.trackInput = input }}/>
        <button onClick = { () => { this.addTrack() }}>Add track</button>
        <ul className="list">
          {
            this.props.testStore.map((track, index) => {
              return (<li key={index}>{track}</li>)
            })
          }
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({
    onAddTrack: (trackName) =>{
      dispatch({ type: 'ADD_TRACK', payload: trackName });
    }
  })
)(App);
