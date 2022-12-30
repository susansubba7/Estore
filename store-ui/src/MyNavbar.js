import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cart from './cart.png'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function MyNavbar(){
    const [showModal, setShowModal] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'email']);
    const [showError, setShowError] = useState('');
    const hideModal = () => {setShowError('');setShowModal(false)};
    const [showLogOut, setShowLogOut] = useState(false);
    function userAuth(navClick){
      if(cookies.user === undefined){
        setShowModal(true)
      }
      else if(navClick === "cart"){
        navigate('/Cart')
      }
      else if(navClick === "account"){
        navigate('/MyAccount');
      }
    }
    function login () {
      fetch('http://127.0.0.1:5000/login',{
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(res => {
        if(!res.ok){
          throw Error('Login failed');
        }
        return res.json()
      })
      .then((data) => {
        setCookie('user', data, {path:'/'});
        setCookie('email', email, {path:'/'});
        setShowLogOut(false);
        setShowModal(false);
        navigate('/MyAccount');
      })
      .catch((error) =>{
        console.log(error.message)
        setShowError(error.message);
      })
    }
    const logOut = () => {
      removeCookie('user');
      removeCookie('email');
      navigate('/');
    }
    const viewSingUp = () =>{
      setShowModal(false);
      setShowSignUp(true);
    }
    const signUp = () =>{
      fetch('http://127.0.0.1:5000/signUp',{
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(res => {
        if(!res.ok){
          throw Error('Email already in use');
        }
        return res.json()
      })
      .then((data) => {
        console.log(data);
        setCookie('user', data, {path:'/'});
        setShowSignUp(false);
        setShowLogOut(false);
      })
      .catch((error) =>{
        console.log(error.message)
        setShowError(error.message);
      })
    }
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
            <Nav.Link href="" className='navLinks' onClick={()=>{userAuth("account")}}>My Account</Nav.Link>
            <Nav.Link href="" className='navLinks' onClick={()=>{userAuth("cart")}}> <img alt="cart" src={Cart} width="30" height="30" /> Cart</Nav.Link>
            <Nav.Link href="#" className='navLinks' onClick={logOut} hidden={showLogOut}>LogOut</Nav.Link>
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
        <Modal.Title>Login <p className='error'>{showError}</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group  className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' onChange={e =>{setEmail(e.target.value)}}/>
          </Form.Group>
          <Form.Group  className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e =>{setPassword(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" type="button" size='lg' onClick={login}> Login</Button>
          <p className='mb-3'>Don't have an account? <button type='button' className='signUp' onClick={viewSingUp}>Sign Up</button></p>
        </Form>
      </Modal.Body>
    </Modal>
    <Modal show={showSignUp} onHide={ () =>{setShowSignUp(false); setShowError('')}}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up <p className='error'>{showError}</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label> Enter Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' onChange={e =>{setEmail(e.target.value)}}/>
          </Form.Group>
          <Form.Group  className="mb-3">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e =>{setPassword(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" type="button" size='lg' onClick={signUp}> Sign Up</Button>
        </Form>
      </Modal.Body>
        
    </Modal>

        </div>
      );
}
export default MyNavbar;