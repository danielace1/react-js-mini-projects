import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";

const ProductEdit = (props) => {
  return (
    <Edit title="Edit Product" {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name" />
        <TextInput source="description" multiline />
        <TextInput source="price" />
        <TextInput source="inStock" />
        <TextInput source="category" />
        <DateInput source="publishedAt" />
      </SimpleForm>
    </Edit>
  );
};

export default ProductEdit;
