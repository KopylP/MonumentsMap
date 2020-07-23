import React, { useContext, useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import {
  Paper,
  Fade,
  Backdrop,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { supportedCultures } from "../../../../config";
import Source from "../../../add-modal/source/source";
import ScrollBar from "../../../common/scroll-bar/scroll-bar";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppContext from "../../../../context/app-context";
import DetailDrawerContext from "../../../detail-drawer/context/detail-drawer-context";
import * as cx from "classnames";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollBar: {
    position: "absolute",
  },
  paper: {
    width: 800,
    maxHeight: "90%",
    outline: "none",
    boxShadow: theme.shadows[5],
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingTop: 10,
  },
}));

export default function AddPhotoModal({ monumentId, open, setOpen, ...props }) {
  const classes = useStyles(props);
  const { monumentService } = useContext(AppContext);
  const { onPhotoSave } = useContext(DetailDrawerContext);

  const handleClose = () => {
    setOpen(false);
  };

  const defaultSources = [
    {
      title: "",
      sourceLink: "",
    },
  ];
  const [sources, setSources] = useState(defaultSources);

  const [file, setFile] = useState(null);

  const getMonumentPhotoFromForm = (values, photoId) => {
    console.log(values);
    delete values.file;
    const description = [
      ...supportedCultures.map((culture) => ({
        culture: culture.code,
        value: values[culture.code],
      })),
    ];
    supportedCultures.forEach((culture) => {
      delete values[culture.code];
    });
    values.description = description;
    values.sources = sources;
    values.monumentId = monumentId;
    values.photoId = photoId;
    console.log("values", values);
    return values;
  };

  const submitPhotoForm = (values, { resetForm }) => {
    monumentService
      .savePhoto(file)
      .then((photo) => {
        const monumentPhotoValues = JSON.parse(JSON.stringify(values));
        const monumentPhoto = getMonumentPhotoFromForm(
          monumentPhotoValues,
          photo.id
        );
        monumentService
          .createPhotoMonument(monumentPhoto)
          .then((mp) => {
            onPhotoSave(mp);
            setSources(defaultSources);
            resetForm({ values: "" });
            setOpen(false);
          })
          .catch(); //TODO handle error
      })
      .catch(); //TODO handle error
  };

  const initialValues = {
    year: "",
    period: "",
    file: "",
  };

  supportedCultures.forEach((culture) => {
    initialValues[culture.code] = "";
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      year: Yup.number().required("Це поле є обов'язковим"),
      period: Yup.number().required("Це поле є обов'язковим"),
      file: Yup.string().required("Додайте фотографію пам'ятки"),
    }),
    onSubmit: submitPhotoForm,
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ScrollBar className={classes.scrollBar}>
          <Paper className={classes.paper}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <h3>Додати фотографію</h3>
                <DropzoneArea
                  onChange={(file) => {
                    formik.setFieldValue(
                      "file",
                      file.length > 0 ? file[0].path : ""
                    );
                    setFile(file[0]);
                  }}
                  acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                  showPreviews={false}
                  filesLimit={1}
                  name="file"
                  showFileNames={true}
                  showFileNamesInPreview={true}
                  dropzoneText={"Перетягни фотографію"}
                />
                <Grid item xs={12}>
                  <div style={{ color: "red", fontSize: 14 }}>
                    {formik.errors.file}
                  </div>
                </Grid>
                <Grid item xs={5}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      id="standard-basic"
                      label="Рік фотографії"
                      type="number"
                      name="year"
                      type="number"
                      name="year"
                      required
                      value={formik.values.year}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.year && formik.errors.year}
                      helperText={
                        formik.touched.year &&
                        formik.errors.year &&
                        formik.errors.year
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <FormControl style={{ width: "100%" }} required>
                    <InputLabel>Період</InputLabel>
                    <Select
                      labelId="period"
                      name="period"
                      value={formik.values.period}
                      error={formik.touched.period && formik.errors.period}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value={1}>Рік</MenuItem>
                      <MenuItem value={0}>Століття</MenuItem>
                      <MenuItem value={2}>Десятиліття</MenuItem>
                    </Select>
                    <FormHelperText>
                      {formik.touched.period &&
                        formik.errors.period &&
                        formik.errors.period}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {supportedCultures.map((culture, i) => (
                  <Grid item xs={12} key={i}>
                    <TextField
                      style={{ width: "100%", margin: 0 }}
                      name={culture.code}
                      label={`Опис (${culture.name})`}
                      margin="normal"
                      value={formik.values[culture.code]}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Source sources={sources} setSources={setSources} />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    type="submit"
                    style={{ float: "right" }}
                    color="secondary"
                  >
                    Додати
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </ScrollBar>
      </Fade>
    </Modal>
  );
}
