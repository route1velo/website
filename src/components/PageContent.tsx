import * as React from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';
import SecondarySponsors from '../components/SecondarySponsors';

interface Props {
  children: any; // tslint:disable-line
}

const ContentBlock = styled.div`
  background-color: white;
`;

class PageContent extends React.Component<Props> {

  render() {
    return (
      <Row className="mt-2">
        <Col lg={12} xl={9}>
          <ContentBlock className="p-4">
            {this.props.children}
          </ContentBlock>
        </Col>
        <SecondarySponsors />
      </Row>
    );
  }
}

export default PageContent;