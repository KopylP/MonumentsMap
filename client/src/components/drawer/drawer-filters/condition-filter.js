import React, { useContext } from "react";
import AppContext from "../../../context/app-context";
import DefaultFilter from "./default-filter";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { changeConditions } from "../../../actions/filter-actions";

function ConditionFilter({ conditions, changeConditions }) {
  const {
    monumentService: { getAllConditions },
  } = useContext(AppContext);

  const { t } = useTranslation();

  return (
    <DefaultFilter
      title={t('Monument condition')}
      selectedValues={conditions}
      setSelectedValues={changeConditions}
      multiple
      getDataMethod={getAllConditions}
    />
  );
}

const mapStateToProps = ({ filter: { conditions } }) => ({ conditions });
const mapDispatchToProps = { changeConditions };

export default connect(mapStateToProps, mapDispatchToProps)(ConditionFilter);