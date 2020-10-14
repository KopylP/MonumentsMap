import React, { useState } from "react";
import MaterialTable from "material-table";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSnackbar } from "notistack";
import errorNetworkSnackbar from "../../helpers/error-network-snackbar";

export default function SimpleList({
  data,
  columns,
  title,
  onEdit = null,
  onDeleteMethod,
  extraActions = [],
}) {
  const { url } = useRouteMatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [listData, setListData] = useState(data);

  onEdit = onEdit ? onEdit : (data) => history.push(`${url}/${data.id}`);

  const handleDeleteData = async (oldData) => {
    try {
      await onDeleteMethod(oldData.id);
      const data = [...listData];
      data.splice(data.indexOf(oldData), 1);
      setListData(data);
    } catch(e) {
      errorNetworkSnackbar(enqueueSnackbar, e.response);
      throw new Error(e);
    }
  };
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={listData}
      style={{ width: "100%", marginTop: 15 }}
      actions={[
        ...extraActions,
        {
          icon: "edit",
          tooltip: "Редагувати",
          onClick: (event, rowData) => {
            onEdit(rowData);
          },
        },
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
      editable={{
        onRowDelete: handleDeleteData,
      }}
    />
  );
}
