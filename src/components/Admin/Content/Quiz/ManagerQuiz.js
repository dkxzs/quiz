import Select from "react-select";
import "./ManagerQuiz.scss";
import { useState } from "react";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ManagerQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  const handleChangeFile = (e) => {
    if (!e.target.files[0]) return;
    setImage(e.target.files[0]);
  };

  return (
    <div className="quiz-container">
      <div className="title">Manager quiz</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new quiz:</legend>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="quiz name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name</label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="my-3">
            <Select value={type} options={options} placeholder="Quiz type" />
          </div>
          <div className="more-actions form-group">
            <label className="mb-1">Upload file</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
        </fieldset>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};

export default ManagerQuiz;
