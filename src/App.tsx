import * as React from 'react';
import './App.css';
import Navigation from './components/Navigation';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div id="bg">
          <div className="firstStripe"/>
          <div className="secondStripe"/>
          <div className="thirdStripe"/>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default App;
