import React from 'react'
import './App.css';
import Population from './Population';

class App extends React.Component {
  
  state = {
    width: 700,
    height: 500,
    id: 'root'
  }

  render() {
    return (

      <div className="App">
        <div> 
          <h1> Statistics Calgary </h1>
        </div>
        <div>
          <Population data={this.state.data} width={this.state.width} height={this.state.height} />
        </div>   
       
        <div className="Text">
          <p> Mouse over the graph for more detail</p>
          <p style={{fontStyle: 'italic'}}> Data source: Alberta Open Government</p>
          <p> <br /></p>
        </div>
      </div>
    );
  }
};
export default App;