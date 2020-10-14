import React, { memo, useContext } from "react";
import SimpleList from "../common/simple-list";
import AdminContext from "../../context/admin-context";
import TableUserRoles from "./table-user-roles";
import withMonumentService from "../hoc-helpers/with-monument-service";
import withData from "../hoc-helpers/with-data";

function UsersList({ data }) {
  const {
    monumentService: { deleteUser },
  } = useContext(AdminContext);

  const [columns, setColumns] = React.useState([
    { title: "Ім'я", field: "displayName" },
    { title: "Email", field: "email" },
    {
      title: "Ролі",
      render: (rowData) => (
        <TableUserRoles user={rowData} />
      ),
    },
  ]);
  return (
    <SimpleList
      title="Користувачі"
      columns={columns}
      data={data}
      onDeleteMethod={deleteUser}
    />
  );
}

export default memo(withMonumentService(withData(UsersList))(
  (monumentService) => ({
    getData: monumentService.getUsers,
  })
));
