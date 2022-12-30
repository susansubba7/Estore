import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import Col from "react-bootstrap/esm/Col";
import Stack from 'react-bootstrap/Stack';
import Button from "react-bootstrap/esm/Button";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';



function Cart(){
    const[cart, setCart] = useState(null);
    const [cookies] = useCookies(['user', 'email']);
    const[total, setTotal] = useState(0);
    const[quantity, setQuantity] = useState(1);
    useEffect(()=>{
        fetch('http://127.0.0.1:5000/cart/' +cookies.email, {headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then(res => {
            return res.json()
        })
        .then((data) => {

            if(data !== "empty"){
                setCart(data);
                setTotal(data[0][4])
            }
        });
    }, [])

    function removeItem(id, price){
        fetch('http://127.0.0.1:5000/cart', {
            method:'DELETE',
            body: JSON.stringify({
                email:cookies.email,
                id:id,
                price:price
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(res => {
                return res.json()
            })
            .then((data) => {
    
                if(data !== "empty"){
                    setCart(data);
                    setTotal(data[0][4]);
                }
                else{
                    setCart(null);

                }
            });
    }
    return(
        <div className="cart">
            <div className="total">
                {cart &&<Card style={{height:180, width:300}}>
                    <Card.Body>
                        <Card.Title>
                            Total: ${total}
                        </Card.Title>
                        <Card.Body>
                            <Card.Text>Taxes calculated at checkout</Card.Text>
                            <Button className='checkout'>Check Out</Button>
                        </Card.Body>
                    </Card.Body>
                </Card>}
            </div>
            {cart && <Container style={{marginTop:"3%"}}>
                <h1>Shopping Cart</h1><br></br>

                <Stack direction='horizontal' gap={5} class>
                    <div style={{height:'100%', width:'90%'}} className='items'>
                        <Row lg={1} style={{height:'100%', width:'100%'}}>
                            <Card style={{height:'100%', width:'100%'}}>
                                <Card.Header style={{backgroundColor:'white'}}>
                                        <h3>Items: {cart.length} </h3>
                                   
                                </Card.Header>
                            {
                                cart.map((product) => (
                                    <div>
                                    <Row>
                                    <Col>
                                    <Card  style={{ border:'none'}}>
                                        <Card.Body style={{ border:'none'}}>
                                                <Card.Title>
                                                    <Card.Img style={{height:"50%", width:"50%"}}  src={product[2]} />
                                                </Card.Title>
                                                <Card.Body>
                                                     <div>
                                                        <h5>{product[0]}</h5>
                                                        <h4>${product[1]}</h4>
                                                    </div>
                                                </Card.Body>
                                        </Card.Body>
                                        
                                    </Card>
                                    </Col>
                                    <Col>
                                    <Card style={{width:'50%', marginLeft:'50%', border:'none'}}>
                                        <Card.Body>
                                            <div className="myButtons">
                                                <Button variant="danger" onClick={()=>{removeItem(product[5], product[1])}}>Remove</Button>
                                                <DropdownButton title={"Qty: " + quantity} className='d-inline mx-2'>
                                                    <div>
                                                    <Dropdown.Item>2</Dropdown.Item>
                                                    <Dropdown.Item>3</Dropdown.Item>
                                                    <Dropdown.Item>4</Dropdown.Item>
                                                    <Dropdown.Item>5</Dropdown.Item>
                                                    <Dropdown.Item>6</Dropdown.Item>
                                                    <Dropdown.Item>7</Dropdown.Item>
                                                    </div>
                                                </DropdownButton>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    </Col>
                                   </Row>
                                   <hr></hr>
                                   </div>
                                ))
                            }
                            </Card>
                        
                        </Row>
                    </div>
                </Stack>
                    
            </Container>}
            {cart === null &&<h1 style={{marginTop:'3%', backgroundColor:'rgb(240, 242, 243)', textAlign:'center'}}>empty cart </h1>}
        </div>
    );
}
export default Cart;