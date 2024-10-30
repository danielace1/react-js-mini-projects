import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const Users = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="email" />
        <TextField source="role" />
        <TextField source="isActive" />

        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default Users;
