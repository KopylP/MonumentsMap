import React, { useContext } from "react";
import AppContext from "../../../context/app-context";
import DefaultFilter from "./default-filter";
import { useTranslation } from "react-i18next";
import { changeStatuses } from "../../../actions/filter-actions";
import { connect } from "react-redux";

function StatusFilter({ statuses, changeStatuses }) {
  const {
    monumentService: { getAllStatuses },
  } = useContext(AppContext);

  const { t } = useTranslation();

  return (
    <DefaultFilter
      title={t("Monument status")}
      selectedValues={statuses}
      setSelectedValues={changeStatuses}
      multiple
      getDataMethod={getAllStatuses}
    />
  );
}

const mapStateToProps = ({ filter: { statuses } }) => ({ statuses });
const mapDispatchToProps = { changeStatuses };

export default connect(mapStateToProps, mapDispatchToProps)(StatusFilter);
