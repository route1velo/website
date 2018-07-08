import * as React from 'react';
import { Entry } from 'contentful';
import styled from 'styled-components';
import client from '../lib/ContentfulClient';

interface Props {}

interface FooterItem {
  logo: {
    fields: {
      file: {
        url: string;
      }
    }
  };
  url: string;
}

interface State {
  footerItems: Entry<FooterItem>[];
}

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  background: #192e37;
  text-align: center;
  padding: 5px 0;
  max-width: 100%;
  & > a {
    margin: 5px 10px;
  }
`;

class Footer extends React.Component<Props, State> {
  state = {
    footerItems: [],
  };

  async componentDidMount() {
    const response = await client.getEntries({
      content_type: 'footerLink',
      order: 'fields.order',
    });
    this.setState({ footerItems: response.items as Entry<FooterItem>[] });
  }

  render() {
    return (
      <FooterWrapper id="social-bar" className="container">
        {
          this.state.footerItems.map( (item: Entry<FooterItem>, index) => (
            <a href={item.fields.url} target="_blank">
              <img src={`${item.fields.logo.fields.file.url}?w=40`} width="40px" />
            </a>
          ))
        }
      </FooterWrapper>
    );
  }
}

export default Footer;