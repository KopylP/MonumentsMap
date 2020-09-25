import withMonumentService from "../../../../components/hoc-helpers/with-monument-service";
import withData from "../../../../components/hoc-helpers/with-data";
import CreateEditMonument from "./create-edit-monument";
import withSimpleAcceptForm from "../../hoc-helpers/withSimpleAcceptForm";

const EditMonument = withMonumentService(
  withData(withSimpleAcceptForm(CreateEditMonument), ["itemId"])
)((monumentService) => ({
  getData: monumentService.getEditableMonument,
  acceptFormMethod: monumentService.editMonument,
}));

export default EditMonument;
