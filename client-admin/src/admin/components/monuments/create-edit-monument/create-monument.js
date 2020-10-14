import CreateEditMonument from "./create-edit-monument";
import withSimpleAcceptForm from "../../hoc-helpers/withSimpleAcceptForm";
import withMonumentService from "../../hoc-helpers/with-monument-service";

const CreateMonument = withMonumentService(
  withSimpleAcceptForm(CreateEditMonument)
)((monumentService) => ({
  acceptFormMethod: monumentService.createMonument,
}));
export default CreateMonument;
