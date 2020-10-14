import CreateEditMonument from "./create-edit-monument";
import withSimpleAcceptForm from "../../hoc-helpers/withSimpleAcceptForm";
import withData from "../../hoc-helpers/with-data";
import withMonumentService from "../../hoc-helpers/with-monument-service";

const EditMonument = withMonumentService(
  withData(withSimpleAcceptForm(CreateEditMonument), ["itemId"])
)((monumentService) => ({
  getData: monumentService.getEditableMonument,
  acceptFormMethod: monumentService.editMonument,
}));

export default EditMonument;
