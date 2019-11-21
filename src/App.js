import React from 'react'
import './App.css';
import Population from './Population';
import MedianIncome from './MedianIncome';
import IncomeComparison from './IncomeComparison'

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
        <div className="Text">
          <p> Mouse over the graph for more detail</p>
          <p style={{fontStyle: 'italic'}}> Data source: Alberta Open Government</p>
          <p> <br /></p>
        </div>
        <div>
          <Population  />
        </div>   
        <div>
          <MedianIncome />
        </div>  
        <div>
          <IncomeComparison />
        </div>
        
      </div>
    );
  }
};
export default App;