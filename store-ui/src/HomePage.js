
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductComponent from "./Product/Product";
import { useState, useEffect } from "react";
import MyNavbar from "./MyNavbar";


function HomePage() {
  const [inventory, setInventory] = useState(null);
  
  useEffect(()=>{
      fetch('http://127.0.0.1:5000/home')
      .then(res => {
        return res.json()
      })
      .then((data) => {
        setInventory(data)
      });
  }, []);
  return (
    <div >
      <MyNavbar cookie={null}/>
        {inventory && <Container>
          <Row lg={4} md={3} sm={2} xs={1} className='mt-5'>
            {
              inventory.map((product) => (
                  <Col><ProductComponent details={product}/></Col>
              ))
            }
            
          
          </Row>
        </Container>}
     
    </div>
  );
}

export default HomePage;
