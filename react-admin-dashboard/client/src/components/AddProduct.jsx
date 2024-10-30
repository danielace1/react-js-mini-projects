import { Create, SimpleForm, TextInput, DateInput } from "react-admin";

const AddProduct = (props) => {
  return (
    <Create title="Add Product" {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" multiline />
        <TextInput source="price" />
        <TextInput source="inStock" />
        <TextInput source="category" />
        <DateInput source="publishedAt" />
      </SimpleForm>
    </Create>
  );
};

export default AddProduct;
