import * as React from 'react';
import PageContent from '../components/PageContent';
import client from '../lib/ContentfulClient';
import { Entry } from 'contentful';
import * as showdown from 'showdown';

interface Props {}
interface State {
  content: {
    __html: string;
  };
}

interface HomePage {
  pageContent ?: undefined | string;
}

class Home extends React.Component<Props, State> {
  state = {
    content: {
      __html: ''
    }
  };

  getContent = async () => {
    const entry: Entry<HomePage> = await client.getEntry('3DEk64jIQM6EAWkAqsIW6m');
    const converter = new showdown.Converter();
    this.setState({ content: {__html: converter.makeHtml(entry.fields.pageContent as string) }});
  }

  componentDidMount() {
    this.getContent();
  }

  render() {
    return (
      <PageContent>
        <div dangerouslySetInnerHTML={this.state.content} />
      </PageContent >
    );
  }
}

export default Home;