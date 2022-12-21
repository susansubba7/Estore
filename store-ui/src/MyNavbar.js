import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cart from './cart.png'


function MyNavbar(){
    const [showModal, setShowModal] = useState(false);
    const viewModal = () => setShowModal(true);
    const hideModal = () => setShowModal(false);
    return (
        <div>
         <Navbar bg="primary" expand="lg" fixed='top'>
         <Container fluid>
        <Navbar.Brand style={{color:'Gold', fontFamily:"fantasy", fontWeight:"bold", letterSpacing:".1em"}}>FCJS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/" className='navLinks' >Home</Nav.Link>
            <Nav.Link href="#action2" className='navLinks' onClick={viewModal}>My Account</Nav.Link>
            <Nav.Link href="#action3" className='navLinks'> <img alt="cart" src={Cart} width="30" height="30" /> Cart</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className='searchButton'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Login </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group  className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email'/>
          </Form.Group>
          <Form.Group  className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" size='lg'> Login</Button>
          <p className='mb-3'>Don't have an account? <a className='signUp' onClick={()=>{console.log("clicked")}}>Sign Up</a></p>
        </Form>
        
      </Modal.Body>
    </Modal>
        </div>
      );
}
export default MyNavbar;