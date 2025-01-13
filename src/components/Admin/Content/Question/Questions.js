import { useState } from "react";
import Select from "react-select";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { RiImageAddFill } from "react-icons/ri";
import "./Questions.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const Questions = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "Question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "add") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }

    if (type === "remove") {
      const newQuestions = questions.filter((item) => item.id !== id);
      setQuestions(newQuestions);
    }
  };

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "add") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };

      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }

    if (type === "remove") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };

  return (
    <div className="questions-container">
      <div className="title">Manage questions</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
            className="select-quiz"
          />
        </div>
        <div className="mt-3 mb-2">Add question:</div>
        {questions &&
          questions.map((item, index) => {
            return (
              <div key={item.id} className="questions-main mb-4">
                <div className="questions-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="description"
                      value={item.description}
                    />
                    <label className="q-label">
                      Question {index + 1} description
                    </label>
                  </div>
                  <div className="upload">
                    <label>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input type="file" hidden />
                    <span>0 file upload</span>
                  </div>
                  <div className="btn-add">
                    <span
                      className="icon-add"
                      onClick={() => handleAddRemoveQuestion("add", "")}
                    >
                      <CiCirclePlus />
                    </span>
                    {questions.length > 1 && (
                      <span
                        className="icon-remove"
                        onClick={() =>
                          handleAddRemoveQuestion("remove", item.id)
                        }
                      >
                        <CiCircleMinus />
                      </span>
                    )}
                  </div>
                </div>
                {item.answers &&
                  item.answers.length > 0 &&
                  item.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input isCorrect"
                          type="checkbox"
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="description"
                            value={answer.description}
                            // onChange={(e) => setDescription(e.target.value)}
                          />
                          <label>answer {index + 1}</label>
                        </div>
                        <div className="btn-answers">
                          <span
                            className="icon-add"
                            onClick={() =>
                              handleAddRemoveAnswer("add", item.id)
                            }
                          >
                            <CiCirclePlus />
                          </span>
                          {item.answers.length > 1 && (
                            <span
                              className="icon-remove"
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "remove",
                                  item.id,
                                  answer.id
                                )
                              }
                            >
                              <CiCircleMinus />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
