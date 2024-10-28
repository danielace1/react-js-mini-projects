import { Admin, Resource, ListGuesser } from "react-admin";
import {}
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("http://localhost:3000/products");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="products" list={ListGuesser} />
  </Admin>
);

export default App;
