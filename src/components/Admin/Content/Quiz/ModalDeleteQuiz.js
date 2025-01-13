import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete, fetchAllQuiz } = props;

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    let res = await deleteQuiz(dataDelete);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await fetchAllQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comfirm delete quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this quiz. id = {dataDelete}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
