import withData from "../../hoc-helpers/with-data";
import withMonumentService from "../../hoc-helpers/with-monument-service";
import AddPhotoModal from "./add-photo-modal";

const EditPhotoModal = withMonumentService(withData(AddPhotoModal))(
  (monumentService) => ({
    getData: monumentService.getMonumentMonumentPhotoEditable,
  })
);

export default EditPhotoModal;
