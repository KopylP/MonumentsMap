import React, { useContext } from "react";
import ParticipantRoleComponent from "../common/ui/participant-role-component/participant-role-component";
import SimpleList from "../common/simple-list";
import AdminContext from "../../context/admin-context";
import withMonumentService from "../hoc-helpers/with-monument-service";
import withData from "../hoc-helpers/with-data";

function ParticipantsList({ data }) {
  const {
    monumentService: { deleteParticipant },
  } = useContext(AdminContext);

  const [columns] = React.useState([
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
