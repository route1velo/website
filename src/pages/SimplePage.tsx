import * as React from 'react';
import PageContent from '../components/PageContent';
import client from '../lib/ContentfulClient';
import { EntryCollection } from 'contentful';
import { Page } from './pageType';
import { Redirect } from 'react-router';
const showdown = require('showdown');

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
    showdown.setOption('tables', true);
    let page = this.props.match.params.pageName;
    if (this.props.match.url.startsWith(1, 10) === 'greenbelt') {
      page = `greenbelt${page}`;
    }

    const entries: EntryCollection<Page> = await client.getEntries({
      content_type: 'staticPage',
      'fields.urlId': page,
    }) as EntryCollection<Page>;

    if (entries.items && entries.items.length) {
      this.setState({
        content: {
          __html: new showdown.Converter().makeHtml(entries.items[0].fields.pageContent as string)
        }
      });
    } else {
      this.setState({ notFound: true });
    }
  }

  componentDidMount() {
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