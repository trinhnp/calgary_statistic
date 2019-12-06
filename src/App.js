import React from 'react'
import './App.css';
import Population from './Population';
import MedianIncome from './MedianIncome';
import IncomeComparison from './IncomeComparison';
import UnemploymentVsCrime from './UnemploymentVsCrime';
import UnemploymentVsIncome from './UnemploymentVsIncome';
import AgeGroupPopulation from './AgeGroupPopulation';
import MaleFemale from './MaleFemale'

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
          <p style={{fontStyle: 'italic'}}> Data source: Alberta Open Government, Statistics Canada</p>
          <p> <br /></p>
        </div>
        <div>
          <Population  />
        </div>  
        <div>
          <AgeGroupPopulation />
         </div> 
         <div>
          <MaleFemale />
         </div> 
        <div>
          <MedianIncome />
        </div>  
        <div>
          <IncomeComparison />
        </div>
        <div>
          <UnemploymentVsCrime/>
        </div>
        <div>
          <UnemploymentVsIncome />
        </div>
                
      </div>
    );
  }
};
export default App;