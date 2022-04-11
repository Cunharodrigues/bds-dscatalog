import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import List from "./List";


const Products = () => {
  return (
    <Switch>
      <Route path="/admin/products" exact>
        <List />        
      </Route>

      <Route path="/admin/products/:productiId" >
        <Form />
      </Route>
    </Switch>
  );
};
export default Products;
