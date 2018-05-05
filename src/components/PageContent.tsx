import * as React from 'react';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

interface Props {
  children: any; // tslint:disable-line
}

const ContentBlock = styled.div`
  background-color: white;
`;

class PageContent extends React.Component<Props> {

  render() {
    return (
      <Row>
        <Col md={12} lg={9}>
          <ContentBlock>
            {this.props.children}
          </ContentBlock>
        </Col>
      </Row>
    );
  }
}

export default PageContent;