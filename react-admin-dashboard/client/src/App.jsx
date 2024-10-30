import { Admin, Resource } from "react-admin";
import Products from "./components/Products";
import Users from "./components/Users";
import ProductEdit from "./components/ProductEdit";
import UserEdit from "./components/UserEdit";
import AddProduct from "./components/AddProduct";
import dataProvider from "./config/dataProvider";

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="products"
      list={Products}
      edit={ProductEdit}
      create={AddProduct}
    />
    <Resource name="users" list={Users} edit={UserEdit} />
  </Admin>
);

export default App;
