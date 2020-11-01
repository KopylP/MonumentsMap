import React, { useState } from "react";
import { isMobileOnly } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { defineClientCulture } from "../components/helpers/lang";
import {
  defaultCity,
  defaultClientCulture,
  supportedCultures,
  yearsRange,
} from "../config";

export default function withStore(Wrapper) {
  return (props) => {

    const { i18n } = useTranslation();

    const [mainDrawerOpen, setMainDrawerOpen] = useState(!isMobileOnly);
    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(
      defineClientCulture(supportedCultures, defaultClientCulture)
    );
    const [selectedMonument, setSelectedMonument] = useState();
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedYearRange, setSelectedYearRange] = useState(yearsRange);
    const [monuments, setMonuments] = useState([]);
    const [center, setCenter] = useState(defaultCity);
    const [loadingMonuments, setLoadingMonuments] = useState(false);

    const _openDetailDrawer = () => {
      if (!detailDrawerOpen) {
        setDetailDrawerOpen(true);
      }
    };

    //functions
    const handleMonumentSelected = (monument, centerize = true) => {
      if (monument) {
        setSelectedMonument({ ...monument });
        if (centerize) {
          setCenter({
            lat: monument.latitude,
            lng: monument.longitude,
          });
          setTimeout(() => {
            _openDetailDrawer();
          }, 300); //Wait, until map animation ends
        } else {
          _openDetailDrawer();
        }
      }
    };

    const handleLanguageSelected = (language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language.code.split("-")[0]);
      }
    };

    return (
      <Wrapper
        contextStore={{
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
          handleMonumentSelected,
          handleLanguageSelected
        }}
        {...props}
      />
    );
  };
}
