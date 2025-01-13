import Select from "react-select";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./ManagerQuiz.scss";
import {
  createNewQuiz,
  getAllQuizForAdmin,
} from "../../../../services/apiServices";
import TableQuiz from "./TableQuiz";

const ManagerQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [listQuiz, setListQuiz] = useState([]);

  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const fetchAllQuiz = async () => {
    const res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleChangeFile = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!name || !description || !type || !image) {
      toast.error("Please enter all information");
      return;
    }
    let res = await createNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setImage(null);
      await fetchAllQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manager quiz</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add new quiz:
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="quiz name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder="Quiz type"
                  />
                </div>
                <div className="more-actions form-group">
                  <label className="mb-1">Upload file</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleChangeFile(e)}
                  />
                </div>
                <div className="my-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="list-detail">
        <TableQuiz listQuiz={listQuiz} setListQuiz={setListQuiz} />
      </div>
    </div>
  );
};

export default ManagerQuiz;
