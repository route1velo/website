import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Navigation from './components/Navigation';
import TitleSponsor from './components/TitleSponsor';
import Home from './pages/Home';
import GreenbeltResults from './pages/GreenbeltResults';
import SimplePage from './pages/SimplePage';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Registration from './pages/Registration';
import SiteAlert from './components/SiteAlert';
import styled from 'styled-components';

const AppContainer = styled.div`
  & img {
    max-width: 100%;
  }
`;

const Background = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  z-index: -1;
  background-color: #192e37;

& .firstStripe {
  background-color:#4FA51E;
  height:150px;
  top:250px;
  width:200%;
  position:fixed
}

& .secondStripe {
  background-color: #02a1cf;
  height: 25px;
  top:400px;
  width:200%;
  position:fixed;
}

& .thirdStripe {
  background-color: #007bb9;
  height: 100px;
  top: 425px;
  width:200%;
  position:fixed;
}
`;

class App extends React.Component {
  render() {
    return (
      <AppContainer className="App">
        <Background>
          <div className="firstStripe"/>
          <div className="secondStripe"/>
          <div className="thirdStripe"/>
        </Background>

        <Router>
          <Container>
            <Navigation />
            <TitleSponsor />
            <SiteAlert />
            <Switch>
              <Route exact={true} path="/404" component={NotFound} />
              <Route exact={true} path="/" component={Home} />
              <Route path="/greenbelt/results" component={GreenbeltResults} />
              <Route path="/greenbelt/reg/:pageName" component={Registration} />
              <Route path="/greenbelt/:pageName" component={SimplePage} />
              <Route path="/:pageName" component={SimplePage} />
            </Switch>
          </ Container>
        </Router>
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
