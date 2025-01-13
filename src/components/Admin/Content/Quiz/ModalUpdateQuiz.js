import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { toast } from "react-toastify";
import { updateQuiz } from "../../../../services/apiServices";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, resetData, fetchAllQuiz } = props;

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewImage("");
    resetData();
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setType(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/png;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleUploadImage = (e) => {
    if (!e.target.files[0]) return;
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sử dụng giá trị cũ nếu trường không được chỉnh sửa
    const updatedName = name || dataUpdate.name;
    const updatedDescription = description || dataUpdate.description;
    const updatedType = type || dataUpdate.difficulty;

    // Kiểm tra điều kiện bắt buộc
    if (!updatedName || !updatedDescription || !updatedType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Gửi ảnh mới nếu có, giữ nguyên ảnh cũ nếu không có ảnh mới
    const updatedImage = image || null;

    let data = await updateQuiz(
      dataUpdate.id,
      updatedDescription,
      updatedName,
      updatedType,
      updatedImage
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchAllQuiz();
    } else {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Độ khó</label>
              <select
                value={type}
                className="form-select"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload file image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="col-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="" />
              ) : (
                <span>Preview image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
