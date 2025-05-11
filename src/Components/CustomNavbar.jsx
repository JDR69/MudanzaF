import React, { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CustomNavbar = () => {
  const { user } = useAuth();

 
  useEffect(() => {
    console.log("Estado actual del usuario:", user);
  }, [user]); // Añade user como dependencia para ver los cambios
  
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" collapseOnSelect>
      <Container style={{fontWeight: "bold"}}>
        {/* Logo / Marca */}
        <Navbar.Brand as={Link} to="/">
          Mi App
        </Navbar.Brand>

        {/* Botón para móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido colapsable */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>

            <Nav.Link as={Link} to="/catalogoVehiculo">
              Catálogo
            </Nav.Link>

            <Nav.Link as={Link} to="/comentarios">
              Comentarios
            </Nav.Link>

            <Nav.Link as={Link} to="/catalogoVehiculo">
              Seguros
            </Nav.Link>

            {/* Dropdown (opcional) */}
            {/* <NavDropdown title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/categorias/electronica">
                Electrónica
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categorias/ropa">
                Ropa
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/categorias">
                Ver todas
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>

          {/* Elementos alineados a la derecha (login, carrito) */}
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/dasboard/homeda">
                  Dashboard
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;