import * as React from 'react';
// import client from '../lib/ContentfulClient';
import { Col } from 'reactstrap';
import styled from 'styled-components';

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
      <Col md={12} lg={3} className="p-2">
        <Wrapper>
          <h2>Visit our Sponsors</h2>
          {
            this.state.sponsors.map( sponsor =>
              (<Col lg={12} md={6} sm={6} xs={6}>
                <a href="http://www.norco.com/" target="_blank">
                  <img src="https://images.contentful.com/wn2l2ohr9qga/1a0o8EccuyG0G4AmOiWW6A/70b16ce2657886bf74dbab989c4bd710/norco.png" style={{ maxWidth: '100%' }}/>
                </a>
              </Col>)
            )
          }
        </Wrapper>
      </ Col>
    );
  }
}

export default SecondarySponsors;