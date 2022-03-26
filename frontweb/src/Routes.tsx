import Auth from 'pages/Admin/Auth';
import ProductDetails from 'pages/ProductDetails';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import history from 'util/history';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import Home from './pages/Home';


const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/products" exact>
        <Catalog />
      </Route>
      <Route path="/products/:productId">
        <ProductDetails />
      </Route>
      <Redirect from="/admin/auth" to="/admin/auth/login" exact />
      <Route path="/admin/auth">
        <Auth />
      </Route>
      <Redirect from="/admin" to="/admin/products" exact />
      <Route path="/Admin">
        <Admin />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
