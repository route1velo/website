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
    this.setState({ content: {__html: convertMarkdown(entry.fields.pageContent as string) }});
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