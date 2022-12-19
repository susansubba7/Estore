import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cart from './cart.png'


function MyNavbar(){

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
            <Nav.Link href="#action1" className='navLinks'>Home</Nav.Link>
            <Nav.Link href="#action2" className='navLinks'>Login</Nav.Link>
            <Nav.Link href="#action2" className='navLinks'>Sign Up</Nav.Link>
            <Nav.Link href="#action2" className='navLinks'> <img alt="cart" src={Cart} width="30" height="30" /> Cart</Nav.Link>
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
        </div>
      );
}
export default MyNavbar;