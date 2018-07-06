import * as React from 'react';
// import client from '../lib/ContentfulClient';
import { Col, Card } from 'reactstrap';
import styled from 'styled-components';
// import './secondarySponsors.scss';

interface Props {}
interface State {
  sponsors: {}[];
}

const Wrapper = styled.div`
  background-color: white;
`;

export class SecondarySponsors extends React.Component<Props, State> {
  state = {
    sponsors: []
  };

  async componentDidMount() {
    // const logo = await client.getAsset('6OcACWah4Augwkc42AWecA'); // Arrow Logo
    this.setState({ sponsors: [1, 2, 3] });
  }

  render() {
    return (
      <Col lg={12} xl={3} className="mt-1">
        <Wrapper className="p-3">
          <h2>Visit our Sponsors</h2>
          <div className="d-flex flex-wrap align-items-center">
            {
              this.state.sponsors.map((sponsor, index) =>
                (
                  <a href="http://www.norco.com/" target="_blank" style={{ margin: '5px auto' }} key={index}>
                    <Card className="p-2 d-flex align-items-center">
                      <img src="https://images.contentful.com/wn2l2ohr9qga/1a0o8EccuyG0G4AmOiWW6A/70b16ce2657886bf74dbab989c4bd710/norco.png?w=200" style={{ maxWidth: '100%' }} />
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