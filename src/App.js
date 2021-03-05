import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop';

function App() {
    return (
        <div>
            <Header />
            <Router>
                <Switch>
                    <Route path="/shop">
                        <Shop />
                    </Route>
                    <Route path="/review">
                        <Review />
                    </Route>
                    <Route path="/inventory">
                        <Inventory />
                    </Route>
                    <Route exact path="/">
                        <Shop />
                    </Route>
                    <Route path="/ema-john-simple">
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
        </div>
    );
}

export default App;
