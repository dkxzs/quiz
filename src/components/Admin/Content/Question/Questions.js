import { useState } from "react";
import Select from "react-select";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import "./Questions.scss";

const Questions = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});

  return (
    <div className="questions-container">
      <div className="title">Manage questions</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add question:</div>
        <div>
          <div className="questions-content">
            <div className="form-floating description">
              <input
                type="text"
                className="form-control"
                placeholder="description"
                // value={description}
                // onChange={(e) => setDescription(e.target.value)}
              />
              <label>Description</label>
            </div>
            <div className="upload">
              <label className="label-upload">Upload image</label>
              <input type="file" hidden />
              <span>0 file upload</span>
            </div>
            <div className="btn-add">
              <span className="icon-add">
                <CiCirclePlus />
              </span>
              <span className="icon-remove">
                <CiCircleMinus />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <input className="form-check-input isCorrect" type="checkbox" />
            <div className="form-floating answer-name">
              <input
                type="text"
                className="form-control"
                placeholder="description"
                // value={description}
                // onChange={(e) => setDescription(e.target.value)}
              />
              <label>answer 1</label>
            </div>
            <div className="btn-answers">
              <span className="icon-add">
                <CiCirclePlus />
              </span>
              <span className="icon-remove">
                <CiCircleMinus />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
