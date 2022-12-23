import HomePage from "./HomePage";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MyNavbar from "./MyNavbar";
import MyAccount from './UserAccount/MyAccount'

function App(){
    return(
        // <div>
        // <MyNavbar />
        // <MyAccount />
        // </div>
      
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route> 
                    <Route path='/MyAccount' element={<MyAccount/>}></Route> 
                </Routes>
        </BrowserRouter>
       
    );
}
export default App;