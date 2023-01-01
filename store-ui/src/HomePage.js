
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductComponent from "./Product/Product";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import Stack from 'react-bootstrap/esm/Stack';


function HomePage() {
  const [cookies] = useCookies(['user', 'email']);
  const [inventory, setInventory] = useState(null);
  console.log(cookies.email);
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
