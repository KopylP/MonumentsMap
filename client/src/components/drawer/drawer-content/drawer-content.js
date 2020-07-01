import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core";

import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TranslateIcon from "@material-ui/icons/Translate";

const useStyles = makeStyles((theme) => ({
  marginTop13: {
    marginTop: 13,
  },
  marginTop20: {
    marginTop: 20,
  },
  colorWhite: {
    color: "white",
  },
  width100per: {
    width: "100%",
  },
  fabAdd: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 999,
  },
}));

export default function DrawerContent(props) {
  const classes = useStyles(props);

  const defaultProps = {
    options: [{ title: "Полтава" }, { title: "Гадяч" }],
    getOptionLabel: (option) => option.title,
  };

  return (
    <div style={{ flexGrow: 1, padding: 15 }}>
      <Grid xs="12" vertical>
        <Button
          style={{ float: "right" }}
          color="secondary"
          startIcon={<TranslateIcon />}
        >
          Українська
        </Button>
        <Grid item xs="12">
          <Autocomplete
            {...defaultProps}
            id="clear-on-escape"
            clearOnEscape
            renderInput={(params) => (
              <TextField {...params} label="Місто" margin="normal" />
            )}
          />
        </Grid>
        <Grid item xs="12" className={classes.marginTop13}>
          <FormControl className={classes.width100per}>
            <InputLabel>Статус пам'ятки</InputLabel>
            <Select>
              <MenuItem value="">Всі</MenuItem>
              <MenuItem value={10}>Пам'ятка національного значення</MenuItem>
              <MenuItem value={20}>Пам'ятка місцевого значення</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs="12" className={classes.marginTop20}>
          <FormControl className={classes.width100per}>
            <InputLabel>Стан пам'ятки архітектури</InputLabel>
            <Select>
              <MenuItem value="">Всі</MenuItem>
              <MenuItem value={10}>Задовільний</MenuItem>
              <MenuItem value={20}>Потребує відновлення</MenuItem>
              <MenuItem value={30}>На межі зникнення</MenuItem>
              <MenuItem value={50}>Втрачено</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs="12" className={classes.marginTop20}>
          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            justify="space-between"
          >
            <Grid item xs="1">
              <SearchIcon />
            </Grid>
            <Grid item xs="11">
              <TextField
                className={classes.width100per}
                id="input-with-icon-grid"
                label="Пошук за адресою"
              />
            </Grid>
          </Grid>
        </Grid>
        <Fab color="primary" aria-label="add" className={classes.fabAdd}>
          <AddIcon className={classes.colorWhite} />
        </Fab>
      </Grid>
    </div>
  );
}
