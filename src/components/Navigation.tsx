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
                              marginRight: 3,
                            }}
                          >
                            {nav.fields.navigationElementName}
                          </DropdownToggle>
                          <DropdownMenu right={true}>
                            {
                              nav.fields.children.map( (child, childIndex) => {
                                if (child.fields.isSpacer) {
                                  return <DropdownItem divider={true} key={childIndex}/>;
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
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    );
  }
}