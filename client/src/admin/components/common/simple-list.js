import React from "react";
import MaterialTable from "material-table";

export default function SimpleList({ data, columns, title, onEdit = p => p, onDelete = p => p, extraActions = [] }) {
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      style={{ width: "100%", marginTop: 15 }}
      actions={[
        ...extraActions,
        {
          icon: 'edit',
          tooltip: 'Редагувати',
          onClick: (event, rowData) => {
            onEdit(rowData);
          }
        },
        {
          icon: 'delete',
          tooltip: 'Видалити',
          onClick: (event, rowData) => {
            onDelete(rowData);
          }
        }
      ]}
      options={{
        actionsColumnIndex: -1,
      }}
    />
  );
}

