import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import './Header.css';
import logo from '../../assets/icon.webp';


const Header = () => {
    return (
      <>
        <Navbar collapseOnSelect expand="md" 
        bg="transparent text-body" className="bg-transparent"
        >
          <Container>
            <Navbar.Brand href="/" className="d-flex">
              <img
                src={logo}
                height="30"
                width="30"
                className="d-inline-block align-center rounded-circle"
                alt="logo"
                id='logo'
              />
              <Nav.Link href="/" id="name-of-site">
                Lucciola Books
              </Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="mr-auto">
                <Nav.Link id='nav-item' href="/about">О нас</Nav.Link>
                <Nav.Link id='nav-item' href="/shop">Магазин</Nav.Link>
                <Nav.Link id='nav-item' href="/library">Библиотека</Nav.Link>
                {/* <Nav.Link id='nav-item' href="/order">Предзаказ</Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }

export default Header;