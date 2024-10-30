import { Edit, SimpleForm, TextInput } from "react-admin";

const UserEdit = (props) => {
  return (
    <Edit title="Edit Product" {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="role" />
        <TextInput source="isActive" />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
