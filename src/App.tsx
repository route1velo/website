import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import * as Loadable from 'react-loadable';
import Loading from './components/Loading';

const AppContainer = styled.div`
  & img {
    max-width: 100%;
  }
`;

const LoadableNavigation = Loadable({
  loader: () => import('./components/Navigation'),
  loading: Loading,
});

const LoadableTitleSponsor = Loadable({
  loader: () => import('./components/TitleSponsor'),
  loading: Loading,
});

const LoadableNotFound = Loadable({
  loader: () => import('./pages/NotFound'),
  loading: Loading,
});

const LoadableHome = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading,
});

const LoadableRegistration = Loadable({
  loader: () => import('./pages/Registration'),
  loading: Loading,
});

const LoadableGreenBeltResults = Loadable({
  loader: () => import('./pages/GreenbeltResults'),
  loading: Loading,
});

const LoadableSimplePage = Loadable({
  loader: () => import('./pages/SimplePage'),
  loading: Loading,
});

const LoadableSiteAlert = Loadable({
  loader: () => import('./components/SiteAlert'),
  loading: Loading,
});

const LoadableFooter = Loadable({
  loader: () => import('./components/Footer'),
  loading: Loading,
});

class App extends React.Component {
  render() {
    return (
      <AppContainer className="App">

        <Router>
          <Container>
            <LoadableNavigation />
            <LoadableTitleSponsor />
            <LoadableSiteAlert />
            <Switch>
              <Route exact={true} path="/404" component={LoadableNotFound} />
              <Route exact={true} path="/" component={LoadableHome} />
              <Route path="/greenbelt/results" component={LoadableGreenBeltResults} />
              <Route path="/greenbelt/reg/:pageName" component={LoadableRegistration} />
              <Route path="/reg/:pageName" component={LoadableRegistration} />
              <Route path="/greenbelt/:pageName" component={LoadableSimplePage} />
              <Route exact={true} path="/:pageName" component={LoadableSimplePage} />
            </Switch>
          </ Container>
        </Router>
        <LoadableFooter />
      </AppContainer>
    );
  }
}

export default App;
