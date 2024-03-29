import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Container} from 'reactstrap';
import './Header.css'
import { logout } from '../modules/authManager';

export const Header = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='navContainer'>
    <Container className='d-flex justify-content-center'>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          <img src={`/logo.png`} alt={"drum deals logo"} style={{width: "75px", height: "auto"}}/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
              </>
            }
          </Nav>
          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/listings">All Listings</NavLink>
              </NavItem>
            }
          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/listings/mylistings">My Listings</NavLink>
              </NavItem>
            }
          </Nav>
          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/listings/favorites">View Favorites</NavLink>
              </NavItem>
            }
          </Nav>
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
      </Container>
      </div>
  );
}