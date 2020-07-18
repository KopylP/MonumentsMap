import React, { useState } from "react";
import {
    Grid, Button
  } from "@material-ui/core";
import WithLoadingData from "../../hoc-helpers/with-loading-data";
import ContentLoader from "react-content-loader";
import AddPhotoModal from "./add-photo-modal/add-photo-modal";

/**
 * 
 * @param {*} data - monumentId 
 */
function MonumentAdminPanel({ data, ...props }) {
    console.log(data);

    const [openAddPhoto, setOpenAddPhoto] = useState(false);

    return (
        <Grid container justify="flex-end" spacing={2}>
            <Button color="primary">Фотографії</Button>
            <Button color="secondary" onClick={() => setOpenAddPhoto(true)}>Додати фотографію</Button>
            <AddPhotoModal monumentId={data} open={openAddPhoto} setOpen={setOpenAddPhoto}/>
        </Grid>
    )
}

export default WithLoadingData(MonumentAdminPanel)(() => (
    <ContentLoader height="18">
      <rect x="0" y="0" rx="5" ry="5" width="200" height="10" />
    </ContentLoader>
  ));
