import * as React from 'react';
import {
  Container,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from 'reactstrap';
import client from '../lib/ContentfulClient';
import './Navigation.css';
// import styled from 'styled-components';

interface Props {}

interface State {
  isOpen: boolean;
  logo: string;
}

// const StyledDropdownToggle = styled(DropdownToggle)`
//   color: red;
// `;

export default class Navigation extends React.Component<Props, State> {
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  state = {
    isOpen: false,
    logo: ''
  };

  async componentDidMount() {
    const logo = await client.getAsset('fueeC59d1CA2Eo0ScGI68'); // Route1VeloLogo
    this.setState({ logo: logo.fields.file.url });
  }

  render() {
    return (
      <Container className="mt-3">
        <Navbar color="white" light={true} expand="lg">
          <NavbarBrand href="/">
            <img src={this.state.logo} alt=""/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <UncontrolledDropdown inNavbar={true}>
                <DropdownToggle
                  caret={true}
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: 'white',
                    border: 'none',
                    marginTop: 2,
                  }}
                >
                  Greenbelt Series
                </DropdownToggle>
                <DropdownMenu right={true}>
                  <DropdownItem>
                    <NavLink href="/greenbelt/info">Info</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/greenbelt/directions">Directions</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/greenbelt/registration">Registration</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/greenbelt/faq">Frequently Asked Questions</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/greenbelt/newracers">For New Racers</NavLink>
                  </DropdownItem>
                  <DropdownItem divider={true} />
                  <DropdownItem>
                    <NavLink href="/greenbelt/results">Results</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/hyattsvillecx">Hyattsville CX</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/membership">Membership</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/calendar">Calendar</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/rides">Rides</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contactus">Contact Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    );
  }
}