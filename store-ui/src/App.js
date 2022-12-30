import HomePage from "./HomePage";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MyNavbar from "./MyNavbar";
import MyAccount from './UserAccount/MyAccount';
import Cart from './Cart';

function App(){
    return(
        // <div>
        // <MyNavbar />
        // <MyAccount />
        // </div>
      
        <BrowserRouter>
            <MyNavbar />
            <Routes>
                <Route path='/' element={<HomePage/>}></Route> 
                <Route path='/MyAccount' element={<MyAccount/>}></Route> 
                <Route path='/Cart' element={<Cart/>}></Route>
            </Routes>
        </BrowserRouter>
       
    );
}
export default App;