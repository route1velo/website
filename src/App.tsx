import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import './App.css';
import Navigation from './components/Navigation';
import TitleSponsor from './components/TitleSponsor';
import Home from './pages/Home';
import SimplePage from './pages/SimplePage';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div id="bg">
          <div className="firstStripe"/>
          <div className="secondStripe"/>
          <div className="thirdStripe"/>
        </div>

        <Router>
          <Container>
            <Navigation />
            <TitleSponsor />
            <Switch>
              <Route exact={true} path="/404" component={NotFound} />
              <Route exact={true} path="/" component={Home} />
              <Route path="/greenbelt/:pageName" component={SimplePage} />
              <Route path="/:pageName" component={SimplePage} />
            </Switch>
          </ Container>
        </Router>
      </div>
    );
  }
}

export default App;
