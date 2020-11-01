import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import YearLabel from "./year-label";
import { yearsRange as yearsRangeDefault } from "../../../../config";
import { changeYearsRange } from "../../../../actions/filter-actions";
import { connect } from "react-redux";

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

function YearFilter({ yearsRange, changeYearsRange }) {
  const classes = useStyles();
  const [value, setValue] = useState(yearsRange);
  const [valueCanChanged, setValueCanChanged] = useState(true);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (_, newValue) => {
    if (valueCanChanged) {
      setValueCanChanged(false);
      setValue(newValue);
      changeYearsRange(newValue);
      setTimeout(() => setValueCanChanged(true), 50);
    }
  };

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
            min={yearsRangeDefault[0]}
            max={yearsRangeDefault[1]}
            // getAriaValueText={valuetext}
          />
        </div>
        <div className={classes.yearContainer}>
          <YearLabel year={yearsRange[0]} />
          <YearLabel year={yearsRange[1]} />
        </div>
      </div>
    </Grid>
  );
}

const mapStateToProps = ({ filter: { yearsRange } }) => ({
  yearsRange,
});

const mapDispatchToProps = { changeYearsRange };

export default connect(mapStateToProps, mapDispatchToProps)(YearFilter);
