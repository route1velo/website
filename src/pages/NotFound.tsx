import * as React from 'react';
import PageContent from '../components/PageContent';

class NotFound extends React.Component {
  state = {
    content: {
      __html: ''
    },
    notFound: false
  };

  render() {
    return (
      <PageContent>
        <div className="text-center">
          <h1 className="display-1">404</h1>
          <div>
            <small className="text-muted">Oops, we can't find that page</small>
          </div>
          <a href="/" className="btn btn-secondary">Go Home</a>
        </div>
      </PageContent >
    );
  }
}

export default NotFound;