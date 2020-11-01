import React, { useState } from "react";
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

    const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(
      defineClientCulture(supportedCultures, defaultClientCulture)
    );
    const [selectedMonument, setSelectedMonument] = useState();
    const [selectedYearRange, setSelectedYearRange] = useState(yearsRange);
    const [center, setCenter] = useState(defaultCity);

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
          selectedLanguage,
          setSelectedLanguage,
          selectedMonument,
          setSelectedMonument,
          detailDrawerOpen,
          setDetailDrawerOpen,
          center,
          setCenter,
          selectedYearRange,
          setSelectedYearRange,
          handleMonumentSelected,
          handleLanguageSelected
        }}
        {...props}
      />
    );
  };
}
