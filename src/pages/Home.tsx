import * as React from 'react';
import PageContent from '../components/PageContent';
import client from '../lib/ContentfulClient';
import { Entry } from 'contentful';
import convertMarkdown from '../lib/MarkdownConverter';

interface Props {}
interface State {
  content: {
    __html: string;
  };
  jersey: string;
}

interface State {
  jersey: string;
}

interface HomePage {
  pageContent ?: undefined | string;
}

class Home extends React.Component<Props, State> {
  state = {
    content: {
      __html: ''
    },
    jersey: ''
  };

  getContent = async () => {
    const entry: Entry<HomePage> = await client.getEntry('3DEk64jIQM6EAWkAqsIW6m');
    this.setState({ content: {__html: convertMarkdown(entry.fields.pageContent as string) }});
  }

  getJersey = async () => {
    const jersey = await client.getAsset('4tmTAsinv2AuquCWAi0iyW');
    this.setState({ jersey: `${jersey.fields.file.url}?w=400` });
  }

  componentDidMount() {
    this.getContent();
    this.getJersey();
  }

  render() {
    return (
      <PageContent>
        <div style={{ float: 'right', padding: 10, maxWidth: '100%' }}>
          <img style={{ maxWidth: 300 }} src={this.state.jersey} />
        </div>
        <div dangerouslySetInnerHTML={this.state.content} />
      </PageContent >
    );
  }
}

export default Home;