import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";

const Products = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="price" />
        <TextField source="inStock" />
        <TextField source="category" />
        <DateField source="createdAt" />

        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default Products;
