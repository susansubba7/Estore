import MyNavbar from "./MyNavbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductComponent from "./Product/Product";
import { useState } from "react";
import RealMadrid from './Product/Real_Madrid_Home.png'
import Barcelona from './Product/Barcelona.PNG'
import PSG from './Product/PSG.PNG'
import ManCity from './Product/ManCity.PNG'
import Juventus from './Product/Juventus.PNG'
import Spurs from './Product/Spurs.PNG'
import ManU from './Product/ManU.PNG'
import Athletico from './Product/AthleticoMadrid.PNG'
import Chlesea from './Product/Chlesea.PNG'
import Filter from "./Filter";

function HomePage() {
  const [inventory, setInventory] = useState([
    {title:"Real Madrid 22/23 Home Jersey", image: RealMadrid, desc:"Official Adidas Men's Real Madrid home soccer jersey for the 2022-2023 season", id:1},
    {title:"FC Barcelona 22/23 Home Jersey", image: Barcelona, desc:"Official Nike Men's Fc Barcelona home soccer jersey for the 2022-2023 season", id:2},
    {title:"PSG 22/23 Home Jersey", image: PSG, desc:"Official Nike Men's Paris Saint-Germain F.C. home soccer jersey for the 2022-2023 season", id:3},
    {title:"Manchester City 22/23 Home Jersey", image: ManCity, desc:"Official Puma Men's Manchester City. home soccer jersey for the 2022-2023 season", id:4},
    {title:"Juventus 22/23 Home Jersey", image: Juventus, desc:"Official Adidas Men's Juventus. home soccer jersey for the 2022-2023 season", id:4},
    {title:"Spurs 22/23 Home Jersey", image: Spurs, desc:"Official Nike Men's Spurs. home soccer jersey for the 2022-2023 season", id:4},
    {title:"Athletico Madrid 22/23 Home Jersey", image: Athletico, desc:"Official Nike Men's Athletico Madrid. home soccer jersey for the 2022-2023 season", id:4},
    {title:"Manchester United 22/23 Home Jersey", image: ManU, desc:"Official Adidas Men's Manchester City. home soccer jersey for the 2022-2023 season", id:4},
    {title:"Chlesea 22/23 Home Jersey", image: Chlesea, desc:"Official Nike Men's Chlesea. home soccer jersey for the 2022-2023 season", id:4},
    
  ])
  return (
    <div >
        <Container>
          <Row lg={4} md={3} sm={2} xs={1} className='mt-5'>
            {
              inventory.map((product) => (
                  <Col><ProductComponent details={product}/></Col>
              ))
            }
            
          
          </Row>
        </Container>
     
    </div>
  );
}

export default HomePage;
