import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import SourceType from "../../../../../models/source-type";

export default function SourceTypeSelect({ value, handleChange }) {
  return (
    <Select
      value={value}
      onChange={handleChange}
      style={{
          width: "100%"
      }}
    >
      <MenuItem value={SourceType.LINK}>Посилання</MenuItem>
      <MenuItem value={SourceType.PODCASTS_APPLE}>Apple подкасти</MenuItem>
      <MenuItem value={SourceType.PODCASTS_CASTBOX}>CASTBOX</MenuItem>
      <MenuItem value={SourceType.PODCASTS_GOOGLE}>Google подкасти</MenuItem>
      <MenuItem value={SourceType.PODCASTS_POCKETCASTS}>Pocket casts</MenuItem>
      <MenuItem value={SourceType.VIDEO}>Відео</MenuItem>
      <MenuItem value={SourceType.BOOK}>Книга</MenuItem>
      <MenuItem value={SourceType.PODCASTS_PODLINK}>Podlink</MenuItem>
    </Select>
  );
}
