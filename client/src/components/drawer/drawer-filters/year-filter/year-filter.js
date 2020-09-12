import React, { useContext, useState } from "react";
import { Grid, Slider, makeStyles } from "@material-ui/core";
import YearLabel from "./year-label";
import { yearsRange } from "../../../../config";
import AppContext from "../../../../context/app-context";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  sliderContainer: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  yearContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function YearFilter() {
  const classes = useStyles();
  const { setSelectedYearRange, selectedYearRange } = useContext(AppContext);
  const [value, setValue] = useState(yearsRange);
  const [valueCanChanged, setValueCanChanged] = useState(true);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  }

  const handleChangeCommitted = (_, newValue) => {
    if(valueCanChanged) {
      setValueCanChanged(false);
      setValue(newValue);
      setSelectedYearRange(newValue);
      setTimeout(() => setValueCanChanged(true), 50);
    }
  }

  return (
    <Grid item xs={12}>
      <div className={classes.root}>
        <div className={classes.sliderContainer}>
          <Slider
            value={value}
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={yearsRange[0]}
            max={yearsRange[1]}
            // getAriaValueText={valuetext}
          />
        </div>
        <div className={classes.yearContainer}>
          <YearLabel year={selectedYearRange[0]} />
          <YearLabel year={selectedYearRange[1]} />
        </div>
      </div>
    </Grid>
  );
}
