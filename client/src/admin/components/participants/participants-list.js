import React, { useContext } from "react";
import MaterialTable from "material-table";
import withData from "../../../components/hoc-helpers/with-data";
import withMonumentService from "../../../components/hoc-helpers/with-monument-service";
import ParticipantRoleComponent from "../../../components/common/participant-role-component/participant-role-component";
import SimpleList from "../common/simple-list";
import AdminContext from "../../context/admin-context";

function ParticipantsList({ data }) {
  const {
    monumentService: { deleteParticipant },
  } = useContext(AdminContext);

  const [columns, setColumns] = React.useState([
    { title: "Дефолтне ім'я", field: "defaultName" },
    { title: "Локалізоване ім'я", field: "name" },
    {
      title: "Роль",
      field: "participantRole",
      render: (rowData) => (
        <ParticipantRoleComponent participantRole={rowData.participantRole} />
      ),
    },
  ]);
  return (
    <SimpleList
      title="Учасники будівництва"
      columns={columns}
      data={data}
      onDeleteMethod={deleteParticipant}
    />
  );
}

export default withMonumentService(withData(ParticipantsList))(
  (monumentService) => ({
    getData: monumentService.getParticipants,
  })
);
