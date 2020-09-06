import React, { useState } from "react";
import MaterialTable from "material-table";
import { useHistory, useRouteMatch } from "react-router-dom";

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

  const [listData, setListData] = useState(data);

  onEdit = onEdit ? onEdit : (data) => history.push(`${url}/${data.id}`);

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
        onRowDelete: (oldData) => {
          const data = [...listData];
          data.splice(data.indexOf(oldData), 1);
          console.log(data);
          setListData(data);
          return onDeleteMethod(oldData.id);
        }
      }}
    />
  );
}
