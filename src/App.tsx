import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import './App.css';
import Navigation from './components/Navigation';
import TitleSponsor from './components/TitleSponsor';
import Home from './pages/Home';
import GreenbeltResults from './pages/GreenbeltResults';
import SimplePage from './pages/SimplePage';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    console.log( 'public url', process.env.PUBLIC_URL );
    return (
      <div className="App">
        <div id="bg">
          <div className="firstStripe"/>
          <div className="secondStripe"/>
          <div className="thirdStripe"/>
        </div>

        {/* <Router basename={process.env.PUBLIC_URL}> */}
        <Router>
          <Container>
            <Navigation />
            <TitleSponsor />
            <Switch>
              <Route exact={true} path="/404" component={NotFound} />
              <Route exact={true} path="/" component={Home} />
              <Route path="/greenbelt/results" component={GreenbeltResults} />
              <Route path="/greenbelt/:pageName" component={SimplePage} />
              <Route path="/:pageName" component={SimplePage} />
            </Switch>
          </ Container>
        </Router>

        <Footer />

      </div>
    );
  }
}

export default App;
