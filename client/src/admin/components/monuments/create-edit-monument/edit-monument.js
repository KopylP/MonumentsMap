import withMonumentService from "../../../../components/hoc-helpers/with-monument-service";
import withData from "../../../../components/hoc-helpers/with-data";
import CreateEditMonument from "./create-edit-monument";

const EditMonument = withMonumentService(
  withData(CreateEditMonument, ["itemId"])
)((monumentService) => ({
  getData: monumentService.getEditableMonument,
}));
export default EditMonument;
