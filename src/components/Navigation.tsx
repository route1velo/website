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
import { EntryCollection, Entry } from 'contentful';

interface NavigationItem {
  navigationElementName: string;
  url?: string;
  order?: number;
  isSpacer: boolean;
  children?: Array<Entry<NavigationItem>>;
}

interface Props {}

interface State {
  isOpen: boolean;
  logo: string;
  navigation: EntryCollection<NavigationItem>;
}

export default class Navigation extends React.Component<Props, State> {
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  state = {
    isOpen: false,
    logo: '',
    navigation: {} as EntryCollection<NavigationItem>,
  };

  async componentDidMount() {
    const logo = await client.getAsset('fueeC59d1CA2Eo0ScGI68'); // Route1VeloLogo
    const navigation: EntryCollection<NavigationItem> = await client.getEntries({
      content_type: 'navigation',
      order: 'fields.order',            
    }) as EntryCollection<NavigationItem>;
    console.log(navigation);
    this.setState({ 
      logo: logo.fields.file.url,
      navigation,
    });
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
              {
                this.state.navigation &&
                this.state.navigation.items && 
                this.state.navigation.items
                  .filter(nav => nav.fields.order)
                  .map((nav, index) => {
                    if (nav.fields.children && nav.fields.children.length) {
                      return (
                        <UncontrolledDropdown inNavbar={true} key={index}>
                          <DropdownToggle
                            caret={true}
                            style={{
                              color: 'rgba(0, 0, 0, 0.5)',
                              backgroundColor: 'white',
                              border: 'none',
                              marginTop: 2,
                            }}
                          >
                            {nav.fields.navigationElementName}
                          </DropdownToggle>
                          <DropdownMenu right={true}>
                            {
                              nav.fields.children.map( (child, childIndex) => {
                                if (child.fields.isSpacer) {
                                  return <DropdownItem divider={true} />;
                                } else {
                                  return (
                                    <a href={child.fields.url} key={childIndex} className="dropdown-item">
                                      {child.fields.navigationElementName}
                                    </a>
                                  );
                                }
                              })
                            }                                                                                  
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      );
                    } else {
                      return (
                        <NavItem key={index}>
                          <NavLink href={nav.fields.url}>{nav.fields.navigationElementName}</NavLink>
                        </NavItem>
                      );
                    }
                  })
              }
              {/* <NavItem>
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
                  <a href="/greenbelt/info" className="dropdown-item">Info</a>
                  <a href="/greenbelt/directions" className="dropdown-item">Directions</a>
                  <a href="/greenbelt/registration" className="dropdown-item">Registration</a>
                  <a href="/greenbelt/faq" className="dropdown-item">Frequently Asked Questions</a>
                  <a href="/greenbelt/newracers" className="dropdown-item">For New Racers</a>
                  <a href="/greenbelt/reg/4race" className="dropdown-item">Purchase 4 Race Pass</a>
                  <a href="/greenbelt/reg/season" className="dropdown-item">Purchase Season Pass</a>
                  <DropdownItem divider={true} />
                  <a href="/greenbelt/results" className="dropdown-item">Results</a>
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
              </NavItem> */}
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    );
  }
}