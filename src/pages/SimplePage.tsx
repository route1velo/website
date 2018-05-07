import * as React from 'react';
import PageContent from '../components/PageContent';
import client from '../lib/ContentfulClient';
import { EntryCollection } from 'contentful';
import convertMarkdown from '../lib/MarkdownConverter';
import { Page } from './pageType';
import { Redirect } from 'react-router';

interface Props {
  match: {
    params: {
      pageName: string;
    }
    url: string;
  };
}
interface State {
  content: {
    __html: string;
  };
  notFound: boolean;
}

class SimplePage extends React.Component<Props, State> {
  state = {
    content: {
      __html: ''
    },
    notFound: false
  };

  getContent = async () => {
    let page = this.props.match.params.pageName;
    if (this.props.match.url.startsWith('/greenbelt')) {
      page = `greenbelt${page}`;
    }
    console.log(page);
    const entries: EntryCollection<Page> = await client.getEntries({
      content_type: 'staticPage',
      'fields.urlId': page,
    }) as EntryCollection<Page>;

    if (entries.items && entries.items.length) {
      this.setState({
        content: {
          __html: convertMarkdown(entries.items[0].fields.pageContent as string)
        }
      });
    } else {
      this.setState({ notFound: true });
    }
  }

  componentDidMount() {
    console.log();
    this.getContent();
  }

  render() {
    if (this.state.notFound) {
      return (
        <Redirect to="/404" />
      );
    }

    return (
      <span>
        <PageContent>
          <div dangerouslySetInnerHTML={this.state.content} />
        </PageContent >
      </span>
    );
  }
}

export default SimplePage;