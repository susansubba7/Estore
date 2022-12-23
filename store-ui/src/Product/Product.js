import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



function ProductComponent(props){
    const title = props.details[1];
    const price = props.details[2];
    const image = props.details[4];
    const description = props.details[5];
    return(
        <div>
            <Card style={{height:520, width:"100%"}} className='mt-4'>
                <Card.Img style={{height:"60%", width:"90%"}} variant='top' src={image}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text style={{fontWeight:'bold'}}>${price}</Card.Text>
                </Card.Body>
                
                <Button variant='primary'>Add to Cart</Button>
            </Card>
        </div>
    );
}

export default ProductComponent;