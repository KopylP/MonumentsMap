import React, { useContext, useState } from "react";
import AdminContext from "../../context/admin-context";
import SimpleList from "../common/simple-list";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import PhotoListModal from "../photos/photo-list-modal/photo-list-modal";
import AddPhotoModal from "../photos/add-photo-modal/add-photo-modal";
import AcceptMonumentTable from "./accept-monument-table";
import { useHistory } from "react-router-dom";
import PeopleIcon from "@material-ui/icons/People";
import withMonumentService from "../hoc-helpers/with-monument-service";
import withData from "../hoc-helpers/with-data";
import LabelIcon from '@material-ui/icons/Label';

function MonumentsList({ data }) {
  const {
    monumentService: { deleteMonument },
  } = useContext(AdminContext);

  const history = useHistory();

  const [columns] = useState([
    { title: "Ім'я", field: "name" },
    { title: "Рік", field: "year" },
    { title: "Період", field: "period" },
    { title: "Захисний номер", field: "protectionNumber" },
    { title: "Додано", field: "createdAt" },
    {
      title: "Активна пам'ятка",
      render: (rowData) => <AcceptMonumentTable monument={rowData} />,
    },
  ]);

  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [openAddPhotoDialog, setOpenAddPhotoDialog] = useState(false);
  const [selectedMonumentId, setSelectedMonumentId] = useState(null);

  return (
    <React.Fragment>
      <SimpleList
        title="Пам'ятки архітектури"
        columns={columns}
        data={data}
        onDeleteMethod={deleteMonument}
        extraActions={[
          {
            icon: () => <PeopleIcon />,
            tooltip: "Учасники будівництва",
            onClick: (e, rowData) => {
              history.push(
                `monuments/${rowData.id}/participants?name=${rowData.name}`
              );
            },
          },
          {
            icon: "image",
            tooltip: "Додати фото",
            onClick: (e, rowData) => {
              setSelectedMonumentId(rowData.id);
              setOpenAddPhotoDialog(true);
            },
          },
          {
            icon: () => <PhotoLibraryIcon />,
            tooltip: "Всі фото",
            onClick: (e, rowData) => {
              setSelectedMonumentId(rowData.id);
              setOpenPhotoDialog(true);
            },
          },
          {
            icon: () => <LabelIcon />,
            tooltip: "Теги",
            onClick: (e, rowData) => {
              history.push(
                `monuments/${rowData.id}/tags?name=${rowData.name}`
              );
            },
          }
        ]}
      />
      <PhotoListModal
        open={openPhotoDialog}
        setOpen={setOpenPhotoDialog}
        monumentId={selectedMonumentId}
      />
      <AddPhotoModal
        monumentId={selectedMonumentId}
        open={openAddPhotoDialog}
        setOpen={setOpenAddPhotoDialog}
      />
    </React.Fragment>
  );
}

export default withMonumentService(withData(MonumentsList))(
  (monumentService) => ({
    getData: monumentService.getAllMonuments,
  })
);
