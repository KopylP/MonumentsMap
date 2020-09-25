import withMonumentService from "../../../../components/hoc-helpers/with-monument-service";
import withData from "../../../../components/hoc-helpers/with-data";
import CreateEditMonument from "./create-edit-monument";
import withSimpleAcceptForm from "../../hoc-helpers/withSimpleAcceptForm";

const CreateMonument = withMonumentService(
  withSimpleAcceptForm(CreateEditMonument)
)((monumentService) => ({
  acceptFormMethod: monumentService.createMonument,
}));
export default CreateMonument;
