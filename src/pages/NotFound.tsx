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
        Page Not Found
      </PageContent >
    );
  }
}

export default NotFound;