import AddPhotoModal from "./add-photo-modal";
import withMonumentService from "../../../../components/hoc-helpers/with-monument-service";
import withData from "../../../../components/hoc-helpers/with-data";

const EditPhotoModal = withMonumentService(withData(AddPhotoModal))(
  (monumentService) => ({
    getData: monumentService.getMonumentMonumentPhotoEditable,
  })
);

export default EditPhotoModal;
