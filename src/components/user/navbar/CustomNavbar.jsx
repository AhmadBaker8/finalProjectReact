import React, { useContext, useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import styles from './CustomNavbar.module.css'
import logo from '../../../assets/images/logoLogin.svg'
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from '../context/CartContext'
import { CgProfile } from "react-icons/cg";
import { UserContext } from '../context/UserContext'
import { FiLogOut } from "react-icons/fi";

export default function CustomNavbar() {

  const {cartCount} = useContext(CartContext);
  const token = localStorage.getItem("userToken");
  const {user,setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/auth/login"); 
  };



  return (
  <>
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Shop Logo" className="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex gap-3 align-items-center">
            <Nav.Link as={Link} to="/cart" className="cart-link">
              <FaCartShopping size={20} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Nav.Link>

            {token == null ? (
              <div className="auth-links">
                <Nav.Link as={Link} to="/auth/login">Login</Nav.Link>
                <span className="separator">|</span>
                <Nav.Link as={Link} to="/auth/register">Register</Nav.Link>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile" className="profile-link">
                  Welcome, <strong>{user?.userName}</strong> <CgProfile size={25} />
                </Nav.Link>
                <button onClick={handleLogout} className="logout-btn">
                  <FiLogOut size={20} /> Logout
                </button>
              </>
            )}
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
