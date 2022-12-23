import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from 'react-bootstrap/Card';


function MyAccount(){
return(
    <div>
        <Container className="mt-5">
            <Row lg={3} sm={2} xs={1}>
                <Col>
                    <Card className="mt-5" style={{height:'70%'}}>
                        <Card.Body>
                            <Card.Title> Account Setting <Card.Img style={{height:80, width:90}} src={'userSetting.png'}></Card.Img></Card.Title>
                            <Card.Body>Edit login, name, and mobile number</Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mt-5" style={{height:'70%'}}>
                        <Card.Body>
                            <Card.Title> Your Orders <Card.Img style={{height:80, width:90}} src={'checkList.png'}></Card.Img></Card.Title>
                            <Card.Body>Track, return, or buy again</Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mt-5" style={{height:'70%'}}>
                        <Card.Body>
                            <Card.Title> Your Payments <Card.Img style={{height:60, width:80}} src={'bankcard.png'}></Card.Img></Card.Title>
                            <Card.Body>View all transactions, manage payment methods and settings</Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row lg={3} sm={2} xs={1}>
                <Col>
                <Col>
                    <Card className="mt-5" style={{height:'70%'}}>
                        <Card.Body>
                            <Card.Title> Customer Service <Card.Img style={{height:80, width:90}} src={'customerService.png'}></Card.Img></Card.Title>
                            <Card.Body>Contact us </Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
                </Col>
            </Row>
        </Container>
    </div>
);
}
export default MyAccount;