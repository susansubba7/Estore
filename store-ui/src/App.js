import HomePage from "./HomePage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyNavbar from "./MyNavbar";

function App(){
    return(
        <Router>
                <MyNavbar />
                <Switch>
                    <Route exact path='/'> <HomePage/></Route> 
                </Switch>
        </Router>
       
    );
}
export default App;