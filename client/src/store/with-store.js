import React, { useState } from "react";
import { defaultCity, supportedCultures, yearsRange } from "../config";

export default function withStore(Wrapper) {
  return (props) => {
    const [mainDrawerOpen, setMainDrawerOpen] = useState(true);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(
      supportedCultures[0]
    );
    const [selectedMonument, setSelectedMonument] = useState({ id: 0 });
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedYearRange, setSelectedYearRange] = useState(yearsRange);
    const [monuments, setMonuments] = useState([]);
    const [center, setCenter] = useState(defaultCity);
    const [loadingMonuments, setLoadingMonuments] = useState(false);
    return (
      <Wrapper
        store={{
          mainDrawerOpen,
          setMainDrawerOpen,
          selectedLanguage,
          setSelectedLanguage,
          selectedMonument,
          setSelectedMonument,
          detailDrawerOpen,
          setDetailDrawerOpen,
          selectedConditions,
          setSelectedConditions,
          selectedCities,
          setSelectedCities,
          selectedStatuses,
          setSelectedStatuses,
          monuments,
          center,
          setCenter,
          selectedYearRange,
          setSelectedYearRange,
          loadingMonuments,
          setLoadingMonuments,
          setMonuments,
        }}
      />
    );
  };
}
