import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">SRM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/suppliers">Fornecedores</Nav.Link>
            <Nav.Link as={Link} to="/customers">Clientes</Nav.Link>
            <Nav.Link as={Link} to="/supplierCategories">Categoria de Fornecedor</Nav.Link>
            <Nav.Link as={Link} to="/customerCategories">Categoria de Cliente</Nav.Link>
            <Nav.Link as={Link} to="/evaluations">Avaliação</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
