import * as React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import TitleSponsor from './components/TitleSponsor';
import Home from './pages/Home';

import { Container } from 'reactstrap';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div id="bg">
          <div className="firstStripe"/>
          <div className="secondStripe"/>
          <div className="thirdStripe"/>
        </div>
        <Container>
          <Navigation />
          <TitleSponsor />
          <Home />
        </ Container>
      </div>
    );
  }
}

export default App;
