import { useEffect, useState } from "react";
import Select from "react-select";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { RiImageAddFill } from "react-icons/ri";
import "./QuizQA.scss";
import _ from "lodash";
import { toast } from "react-toastify";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  upsertQA,
} from "../../../../services/apiServices";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const QuizQA = () => {
  const initQuestion = [
    {
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
    },
  ];
  const [questions, setQuestions] = useState(initQuestion);
  const [isPreviewImage, setPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  const urltofile = (url, filename, miniType) => {
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: miniType }));
  };

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}`;
          q.imageFile = await urltofile(
            `data:image/jpeg;base64,${q.imageFile}`,
            `Question-${q.id}`,
            "image/jpeg"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

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

  const handleOnChange = (type, questionId, value) => {
    if (type === "question") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].description = value;
      setQuestions(questionsClone);
    }
  };

  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index !== -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
      setQuestions(questionClone);
    }
  };

  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index !== -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "checkbox") {
              answer.isCorrect = value;
            }
            if (type === "input") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionClone);
    }
  };

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index !== -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setPreviewImage(true);
    }
  };

  const handleSubmitQuestion = async () => {
    // console.log("check data", questions, selectedQuiz);
    // validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please select quiz!");
      return;
    }

    // validate answer
    let isValidAnswer = true;
    let indexQ = 0;
    let indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) {
        break;
      }
    }

    if (isValidAnswer === false) {
      toast.error(
        `Please enter information for question ${indexQ + 1} at answer ${
          indexA + 1
        }`
      );
      return;
    }

    // validate question
    let isValidQuestion = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQuestion === false) {
      toast.error("Please enter information for question " + (indexQ1 + 1));
      return;
    }

    // for (const question of questions) {
    //   const res = await createNewQuestionForQuiz(
    //     +selectedQuiz.value,
    //     question.description,
    //     question.imageFile
    //   );
    //   // submit answer
    //   for (const answer of question.answers) {
    //     await createNewAnswerForQuestion(
    //       answer.description,
    //       answer.isCorrect,
    //       res.DT.id
    //     );
    //   }
    // }

    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(
          questionsClone[i].imageFile
        );
      }
    }
    let res = await upsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone,
    });

    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }

    // toast.success("Create new question successfully!");
    // setQuestions(initQuestion);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
            className="select-quiz"
          />
        </div>
        <div className="mt-3 mb-2">Add question:</div>
        {questions &&
          questions.length > 0 &&
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
                      onChange={(e) =>
                        handleOnChange("question", item.id, e.target.value)
                      }
                    />
                    <label className="q-label">
                      Question {index + 1} description
                    </label>
                  </div>
                  <div className="upload">
                    <label htmlFor={`${item.id}`}>
                      <RiImageAddFill className="label-upload" />
                    </label>
                    <input
                      id={`${item.id}`}
                      type="file"
                      hidden
                      onChange={(e) => handleOnChangeFileQuestion(item.id, e)}
                    />
                    <span>
                      {item.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(item.id)}
                        >
                          {item.imageName}
                        </span>
                      ) : (
                        "No image"
                      )}
                    </span>
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
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            handleAnswerQuestion(
                              "checkbox",
                              item.id,
                              answer.id,
                              e.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="description"
                            value={answer.description}
                            onChange={(e) =>
                              handleAnswerQuestion(
                                "input",
                                item.id,
                                answer.id,
                                e.target.value
                              )
                            }
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
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => handleSubmitQuestion()}
            >
              Save questions
            </button>
          </div>
        )}

        {isPreviewImage && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setPreviewImage(false)}
          />
        )}
      </div>
    </div>
  );
};

export default QuizQA;
