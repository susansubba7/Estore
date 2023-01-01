import HomePage from "./HomePage";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MyNavbar from "./MyNavbar";
import MyAccount from './UserAccount/MyAccount';
import Cart from './Cart';
import Settings from './UserAccount/AccountSetting';

function App(){
    return(
        <BrowserRouter>
            <MyNavbar />
            <Routes>
                <Route path='/' element={<HomePage/>}></Route> 
                <Route path='/MyAccount' element={<MyAccount/>}></Route> 
                <Route path='/Cart' element={<Cart/>}></Route>
                <Route path='/Settings' element={<Settings/>}></Route>
            </Routes>
        </BrowserRouter>
       
    );
}
export default App;