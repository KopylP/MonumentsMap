import React, { useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {
  Paper,
  Fade,
  Backdrop,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  AppBar,
  Tabs,
  Tab,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 800,
    maxHeight: "90%",
    overflow: "auto",
    outline: "none",
    boxShadow: theme.shadows[5],
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
  },
  root: {
    flexGrow: 1,
    width: "100%",
  },
}));

const defaultProps = {
  options: [{ title: "Полтава" }, { title: "Гадяч" }],
  getOptionLabel: (option) => option.title,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function AddModal({ openAddModal, setOpenAddModal }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const handleClose = () => {
    setOpenAddModal(false);
  };
  return (
    <Modal
      open={openAddModal}
      onClose={handleClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openAddModal}>
        <Paper className={classes.paper}>
          <h2>Нова пам'ятка</h2>
          <div className={classes.root}>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField id="standard-basic" label="Ваше ім'я *" />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      id="standard-basic"
                      label="Ваш e-mail *"
                      type="email"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      id="standard-basic"
                      label="Рік побудови"
                      type="number"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel>Період</InputLabel>
                    <Select labelId="period">
                      <MenuItem value="2">Рік</MenuItem>
                      <MenuItem value="1">Століття</MenuItem>
                      <MenuItem value="3">Десятиліття</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    {...defaultProps}
                    id="clear-on-escape"
                    clearOnEscape
                    style={{
                      marginTop: -16,
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Місто" margin="normal" />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel>Статус пам'ятки</InputLabel>
                    <Select labelId="period">
                      <MenuItem value="2">Рік</MenuItem>
                      <MenuItem value="1">Століття</MenuItem>
                      <MenuItem value="3">Декада</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel>Стан пам'ятки</InputLabel>
                    <Select labelId="period">
                      <MenuItem value="2">Рік</MenuItem>
                      <MenuItem value="1">Століття</MenuItem>
                      <MenuItem value="3">Декада</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField id="standard-basic" label="Адреса пам'ятки *" />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <AppBar position="relative">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                    >
                      <Tab label="Українська" />
                      <Tab label="English" />
                      <Tab label="Polski" />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <Grid container spacing={3}>
                      <Grid item xs="12">
                        <TextField
                          style={{ width: "100%" }}
                          id="standard-basic"
                          label="Назва"
                        />
                      </Grid>
                      <Grid item xs="12">
                        <TextField
                          style={{ width: "100%" }}
                          id="standard-basic"
                          multiline
                          label="Опис"
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Grid container spacing={3}>
                      <Grid item xs="12">
                        <TextField
                          style={{ width: "100%" }}
                          id="standard-basic"
                          label="Назва"
                        />
                      </Grid>
                      <Grid item xs="12">
                        <TextField
                          style={{ width: "100%" }}
                          id="standard-basic"
                          multiline
                          label="Опис"
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Grid container spacing={3}>
                      <Grid item xs="12">
                        <TextField
                          style={{ width: "100%" }}
                          id="standard-basic"
                          label="Назва"
                        />
                      </Grid>
                      <Grid item xs="12">
                        <TextField
                          style={{ width: "100%" }}
                          id="standard-basic"
                          multiline
                          label="Опис"
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                </Grid>
                <Grid item xs={12}>
                  <Button style={{float: "right"}} color="secondary">
                    Додати
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </Fade>
    </Modal>
  );
}
