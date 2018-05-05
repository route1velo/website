import * as React from 'react';
import client from '../lib/ContentfulClient';
import { Row } from 'reactstrap';
import styled from 'styled-components';
interface Props {}
interface State {
  logo: string;
}

const CenteredDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

export class TitleSponsor extends React.Component<Props, State> {

  state = {
    logo: ''
  };

  async componentDidMount() {
    const logo = await client.getAsset('6OcACWah4Augwkc42AWecA'); // Arrow Logo
    this.setState({ logo: logo.fields.file.url });
  }

  render() {
    return (
      <Row>
        <CenteredDiv>
          <a href="http://www.arrowbicycle.com" target="_blank">
            <img src={this.state.logo} />
          </a>
        </ CenteredDiv>
      </ Row>
    );
  }
}

export default TitleSponsor;