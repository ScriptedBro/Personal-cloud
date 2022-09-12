import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarComponent() {
  return (
    <Navbar bg='light' expand='sm'>
      <Container fluid>
      <Navbar.Brand as={Link} to="/">PK Drive</Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;