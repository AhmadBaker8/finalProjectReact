import React, { useContext, useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './CustomNavbar.module.css'
import logo from '../../../assets/images/logoLogin.svg'
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from '../context/CartContext'

export default function CustomNavbar() {

  const {cartCount} = useContext(CartContext);


  return (
  <>
  <Navbar expand="lg" className={`bg-body-tertiary ${styles.firstNavbar}`}>
    <Container>
      <Navbar.Brand href="#home">
        <img src={logo} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex gap-2">
          <Nav.Link as={Link} to={""} className='d-block'>
            <FaCartShopping />
            <span>{cartCount}</span>
          </Nav.Link>
          <Nav.Link as={Link} to={"/auth/login"}>$
          <span>59</span>
          </Nav.Link>
          <Nav.Link as={Link} to={"/profile"}>profile</Nav.Link>
          <Nav.Link as={Link} to={"/auth/login"}>Login</Nav.Link>
          <Nav.Link as={Link} to={"/auth/register"}>Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  <Navbar expand="lg" className={`bg-body-tertiary ${styles.secondNavbar}`}>
    <Container>
      <Nav.Link as={Link} to={"/auth/login"} className='d-flex align-items-center justify-content-center gap-2 fw-medium'>
      </Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto gap-4 fw-medium">
          <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
          <Nav.Link as={Link} to={"/shop"}>Shop</Nav.Link>
          <Nav.Link as={Link} to={"/cart"}>Cart</Nav.Link>
          <Nav.Link as={Link} to={"/wishlist"}>Wishlist</Nav.Link>
          <Nav.Link as={Link} to={"/checkout"}>Checkout</Nav.Link>
          <Nav.Link as={Link} to={"/contact"}>Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
   
   
   
   
   
   </>
  )
}
