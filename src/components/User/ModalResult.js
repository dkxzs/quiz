import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  console.log(dataModalResult);
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Total question: {dataModalResult.totalQuestion}</div>
          <div>Total correct answers: {dataModalResult.totalCorrect}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
