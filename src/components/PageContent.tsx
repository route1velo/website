import * as React from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import SecondarySponsors from '../components/SecondarySponsors';

interface Props {
  children: any; // tslint:disable-line
  noSponsors?: boolean;
}

const ContentBlock = styled.div`
  background-color: white;
`;

class PageContent extends React.Component<Props> {

  render() {
    return (
      <Row className="mt-2">
        <Col lg={12} xl={this.props.noSponsors ? 12 : 9}>
          <ContentBlock className="p-4">
            {this.props.children}
          </ContentBlock>
        </Col>
        {!this.props.noSponsors && <SecondarySponsors />}
      </Row>
    );
  }
}

export default PageContent;