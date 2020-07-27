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
import Period from "../../../../models/period";

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
  image: {
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

export default function AddPhotoModal({
  monumentId,
  open,
  setOpen,
  data = null,
  onCloseAnimationEnded = p => p,
  ...props
}) {
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
  const [sources, setSources] = useState(data ? data.sources : defaultSources);

  const [file, setFile] = useState(null);

  const getMonumentPhotoFromForm = (values, photoId) => {
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
    if (data) {
      values.monumentId = data.monumentId;
    } else {
      values.monumentId = monumentId;
    }
    values.photoId = photoId;
    return values;
  };

  const onCreateMonumentPhoto = (mp, resetForm) => {
    onPhotoSave(mp);
    setSources(defaultSources);
    resetForm({ values: "" });
    setOpen(false);
  };

  const onEditMonumentPhoto = (mp) => {
    console.log(mp);
    setOpen(false);
  };

  const submitPhotoForm = (values, { resetForm }) => {
    const getMonumentPhoto = (photoId, id = null) => {
      const monumentPhotoValues = JSON.parse(JSON.stringify(values));
      const monumentPhoto = getMonumentPhotoFromForm(
        monumentPhotoValues,
        photoId
      );
      if (id) {
        monumentPhoto["id"] = id;
      }
      return monumentPhoto;
    };

    if (data == null) {
      console.log("Save photo kurva");
      monumentService
        .savePhoto(file)
        .then((photo) => {
          const monumentPhoto = getMonumentPhoto(photo.id);
          console.log(monumentPhoto);
          monumentService
            .createPhotoMonument(monumentPhoto)
            .then((mp) => onCreateMonumentPhoto(mp, resetForm))
            .catch(e => console.error(e)); //TODO handle error
        })
        .catch(); //TODO handle error
    } else {
      const monumentPhoto = getMonumentPhoto(data.photoId, data.id);
      monumentService
        .editPhotoMonument(monumentPhoto)
        .then(onEditMonumentPhoto)
        .catch(); //TODO handle error
    }
  };

  const initialValues = {
    year: data ? data.year : "",
    period: data ? data.period : "",
    file: "",
  };

  if (data) {
    data.description.forEach((cultureValuePair) => {
      initialValues[cultureValuePair.culture] = cultureValuePair.value;
    });
  } else {
    supportedCultures.forEach((culture) => {
      initialValues[culture.code] = "";
    });
  }

  const validationSchemafileds = {
    year: Yup.number().required("Це поле є обов'язковим"),
    period: Yup.number().required("Це поле є обов'язковим"),
  };

  if (data == null) {
    validationSchemafileds["file"] = Yup.string().required(
      "Додайте фотографію пам'ятки"
    );
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemafileds),
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
      <Fade in={open} onExited={onCloseAnimationEnded}>
        <ScrollBar className={classes.scrollBar}>
          <Paper className={classes.paper}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <h3 style={{width: "100%"}}>{ data ? "Редагувати" : "Додати"} фотографію</h3>
                {data ? 
                <img className={classes.image} src={monumentService.getPhotoLink(data.photoId)}/> : (
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
                )}
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
                      <MenuItem value={Period.Year}>Рік</MenuItem>
                      <MenuItem value={Period.StartOfCentury}>
                        Початок століття
                      </MenuItem>
                      <MenuItem value={Period.MiddleOfCentury}>
                        Середина століття
                      </MenuItem>
                      <MenuItem value={Period.EndOfCentury}>
                        Кінець століття
                      </MenuItem>
                      <MenuItem value={Period.Decades}>Десятиліття</MenuItem>
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
                    { data ? "Редагувати" : "Додати"}
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
