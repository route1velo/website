import * as React from 'react';
import client from '../lib/ContentfulClient';
import { Col, Card } from 'reactstrap';
import styled from 'styled-components';
import { Entry } from 'contentful';
// import './secondarySponsors.scss';

interface Props {}
interface Sponsor {
  fields: {
    logo: {
      fields: {
        file: {
          url: string;
        }
      }
    };
    sponsorName: string;
    url: string;
  };
}
interface State {
  sponsors: Entry<Sponsor>[];
}

const Wrapper = styled.div`
  background-color: white;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100px;
`;

export class SecondarySponsors extends React.Component<Props, State> {
  state = {
    sponsors: []
  };

  async componentDidMount() {
    const response = await client.getEntries({
      content_type: 'secondarySponsor',
      order: 'fields.order',
      'fields.forHyattsvilleCx': window.location.pathname.includes('hyattsvillecx'),
    });
    this.setState({ sponsors: response.items as Entry<Sponsor>[] });
  }

  render() {
    return (
      <Col lg={12} xl={3} className="mt-1">
        <Wrapper className="p-3">
          <h3>Visit our Sponsors</h3>
          <div className="d-flex flex-wrap align-items-center">
            {
              this.state.sponsors.map((sponsor: Sponsor, index) =>
                (
                  <a href={sponsor.fields.url} target="_blank" style={{ margin: '5px auto' }} key={index}>
                    <Card className="p-2 d-flex align-items-center">
                      <Image src={sponsor.fields.logo.fields.file.url}/>
                    </Card>
                  </a>
                )
              )
            }
          </div>
        </Wrapper>
      </ Col>
    );
  }
}

export default SecondarySponsors;