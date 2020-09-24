import React from "react";
import SimpleResource from "../common/simple-resource";
import UsersList from "./users-list";
import AddUser from "./add-user";
import EditUserRoles from "./edit-user-roles";


export default function UsersResource() {
  return (
    <SimpleResource
      ItemList={UsersList}
      CreateItem={AddUser}
      UpdateItem={EditUserRoles}
    />
  );
}
