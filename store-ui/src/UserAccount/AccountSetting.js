import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function AcocuntSetting(){
    const [cookies, setCookies] = useCookies(['user', 'userid', 'email']);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState(null);
    const changeEmail = () =>{
        fetch('http://127.0.0.1:5000/settings',{
            method:"PUT",
            body:JSON.stringify({
                userid:cookies.userid,
                email:email
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res =>{
            return res.json();
        })
        .then((data)=>{
            setCookies('email', data);
            setShowModal(false);
        })
    }

    return(
        <div>
            <h1 className="title">Account Setting</h1>
                <Card className='myCard'>
                    <Row style={{border:'none'}}>
                        <div>
                            <Card className='userInfo'>
                                <Card.Body>
                                <h6>Email: {cookies.email} </h6>
                                <Button className='editButton' onClick={() =>{setShowModal(true)}}>Edit</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <Card className='userInfo'>
                                <Card.Body>
                                <h6>Password: *****</h6>
                                <Button className='editButton'>Edit</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>
                </Card>
        <Modal show={showModal} onHide={() =>{setShowModal(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>Change Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group  className="mb-3">
            <Form.Label> New Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' onChange={e =>{setEmail(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" type="button" size='lg' onClick={changeEmail}> Change</Button>
        </Form>
      </Modal.Body>
    </Modal>
        </div>
        
    )}
export default AcocuntSetting;