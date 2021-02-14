import withData from "../../hoc-helpers/with-data";
import withMonumentService from "../../hoc-helpers/with-monument-service";
import AddPhotoForm from "./add-photo-form";

const EditPhotoForm = withMonumentService(withData(AddPhotoForm))(
  (monumentService) => ({
    getData: monumentService.getMonumentMonumentPhotoEditable,
  })
);

export default EditPhotoForm;
