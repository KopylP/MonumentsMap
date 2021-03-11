import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "../../../../hooks/hooks";
import SimpleSubmitForm from "../../common/simple-submit-form";
import SimpleTitle from "../../common/ui/simple-title";
import withData from "../../hoc-helpers/with-data";
import withMonumentService from "../../hoc-helpers/with-monument-service";
import withSimpleAcceptForm from "../../hoc-helpers/withSimpleAcceptForm";
import TagChip from "./tag-chip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  tagsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function EditMonumentTags({ data, getOptionsMethod, loading, acceptForm }) {
  const classes = useStyles();
  const query = useQuery();
  const { itemId } = useParams();
  const [tags, setTags] = useState(
    data.map((p) => ({ name: p, checked: false }))
  );
  const [tagsLoading, setTagsLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    acceptForm([itemId, tags.filter((p) => p.checked).map((p) => p.name)]);
  };

  const updateSelectedTags = (tagNames) => {
    const newTags = [...tags];
    for (let tagName of tagNames) {
      const i = newTags.findIndex((p) => p.name == tagName);
      newTags[i].checked = true;
    }
    setTags(newTags);
    setTagsLoading(false);
  };

  const onTagClick = (tagIndex) => {
    const newTags = [...tags];
    newTags[tagIndex].checked = !newTags[tagIndex].checked;
    setTags(newTags);
  };

  const getSelectedTags = () => {
    getOptionsMethod(itemId).then(updateSelectedTags).catch();
  };

  useEffect(getSelectedTags, []);

  const tagViews = tags.map((tag, i) => (
    <TagChip
      key={i}
      checked={tag.checked}
      tag={tag.name}
      onClick={() => onTagClick(i)}
    />
  ));

  if (tagsLoading)
    return <CircularProgress color="secondary" />

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container spacing={3} style={{ width: "50%" }}>
        <SimpleTitle text={`Теги для пам'ятки "${query.get("name")}"`} />
        <div className={classes.tagsContainer}>{tagViews}</div>
        <Grid item xs={12}>
          <SimpleSubmitForm loading={loading} />
        </Grid>
      </Grid>
    </form>
  );
}

export default withMonumentService(
  withData(withSimpleAcceptForm(EditMonumentTags), ["itemId"])
)((monumentService) => ({
  getData: monumentService.getTags,
  acceptFormMethod: monumentService.editMonumentTags,
  getOptionsMethod: monumentService.getMonumentTags,
}));
