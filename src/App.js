/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';

export const userContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Router>
                <Header />
                <Switch>
                    <Route path="/shop">
                        <Shop />
                    </Route>
                    <Route path="/review">
                        <Review />
                    </Route>
                    <PrivateRoute path="/inventory">
                        <Inventory />
                    </PrivateRoute>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <PrivateRoute path="/shipment">
                        <Shipment />
                    </PrivateRoute>
                    <Route exact path="/">
                        <Shop />
                    </Route>
                    <Route path="/product/:productKey">
                        <ProductDetail />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </userContext.Provider>
    );
}

export default App;
