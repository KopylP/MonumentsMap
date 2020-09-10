import React from "react";
import SimpleResource from "../common/simple-resource";
import UsersList from "./users-list";
import AddUser from "./add-user";


export default function UsersResource() {
  return (
    <SimpleResource
      ItemList={UsersList}
      CreateItem={AddUser}
    //   UpdateItem={}
    />
  );
}
