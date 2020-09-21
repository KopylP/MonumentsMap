import React, { memo, useContext } from "react";
import MaterialTable from "material-table";
import withData from "../../../components/hoc-helpers/with-data";
import withMonumentService from "../../../components/hoc-helpers/with-monument-service";
import ParticipantRoleComponent from "../../../components/common/participant-role-component/participant-role-component";
import SimpleList from "../common/simple-list";
import AdminContext from "../../context/admin-context";
import TableUserRoles from "./table-user-roles";

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
