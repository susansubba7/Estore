import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCookies } from 'react-cookie';


function ProductComponent(props){
    const [cookies] = useCookies(['user', 'userid']);
    const title = props.details[1];
    const price = props.details[2];
    const image = props.details[4];
    const description = props.details[5];
    const addToCart = ( ()=>{
        console.log(cookies.userid);
        fetch('http://127.0.0.1:5000/home', {
            method:'POST',
            body: JSON.stringify({
                userid:cookies.userid,
                id: props.details[0],
                price: price
            }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res => {
            return res.json()
        })
    });
    return(
        <div>
            <Card style={{height:520, width:"100%"}} className='mt-4'>
                <Card.Img style={{height:"60%", width:"90%"}} variant='top' src={image}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text style={{fontWeight:'bold'}}>${price}</Card.Text>
                </Card.Body>
                
                <Button variant='primary' onClick={addToCart}>Add to Cart</Button>
            </Card>
        </div>
    );
}

export default ProductComponent;


/*
 <Row style={{border:'none'}}>
                                    <Col>
                                    <Card>
                                         <Card.Img style={{height:"80%", width:"25%"}}  src={product[2]} />
                                    </Card>
                                    </Col>
                                    <Col>
                                    <Card  style={{height:'100%', width:'100%', border:'none'}} className='flex-fill'>
                                        <Card.Body>
                                        
                                                <Card.Title style={{ marginLeft:'30%'}} variant='top'>{product[0]}</Card.Title>
                                                <Card.Text style={{fontWeight:'bold',  marginLeft:'40%'}}>${product[1]}</Card.Text>
                                        </Card.Body>
                                        <hr></hr>
                                    </Card>
                                    </Col>
                                   </Row>
                                   */