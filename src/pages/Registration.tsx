import * as React from 'react';
import PageContent from '../components/PageContent';
import client from '../lib/ContentfulClient';
import { EntryCollection } from 'contentful';
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

class GreenbeltRegistration extends React.Component<Props> {
  state = {
    content: {
      __html: ''
    },
    notFound: false
  };

  getContent = async () => {
    let page = this.props.match.params.pageName;
    if (this.props.match.url.startsWith('/greenbelt')) {
      page = `greenbeltreg${page}`;
    }

    const entries: EntryCollection<Page> = await client.getEntries({
      content_type: 'staticPage',
      'fields.urlId': page,
    }) as EntryCollection<Page>;

    function addToDom() {
      var evt = document.createEvent('Event');
      evt.initEvent('load', false, false);
      window.dispatchEvent(evt);
    }

    if (entries.items && entries.items.length) {
      const eventId = entries.items[0].fields.pageContent;
      const script = document.createElement('script');
      script.src = 'https://www.bikereg.com/Scripts/athleteRegWidget.js';
      script.id = 'athleteRegWidget';
      // script.async = true;
      script.setAttribute('data-event', eventId as string);

      const content = document.getElementById('content');
      if (content) {
        content.appendChild(script);
        setTimeout(addToDom, 750);
      }
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

        <PageContent noSponsors={true}>
          <div id="content-1" />
          <script id="athleteRegWidget" src="https://www.bikereg.com/Scripts/athleteRegWidget.js" data-event="hycx2019"/>
        </PageContent >
      </span>
    );
  }
}

export default GreenbeltRegistration;